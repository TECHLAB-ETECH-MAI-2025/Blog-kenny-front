// store/auth.js
import api from '@/lib/api';
import { ApiResponse } from '@/src/types';
import { User } from '@/src/types/User';
import { create } from 'zustand';

export interface AuthStore {
    user: User | null;
    error: string | null;
    login: (email: string, password: string) => Promise<User>;
    fetchMe: () => Promise<string>;
    logout: () => Promise<string>;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    error: null,
    login: async (email: string, password: string) => {
        const response = await api.post<ApiResponse<User>>('/login', {
            email: email,
            password: password
        });
        if (response.status !== 200) {
            const err = response.data.errors;
            throw new Error(err + 'Erreur de connexion');
        }

        const data = response.data.data;
        set({ user: data, error: null });
        return response.data.data;
    },
    fetchMe: async () => {
        const response = await api.get<ApiResponse<User>>(`/me`);
        if (response.status !== 200) {
            throw new Error(`Vous n'etes pas connecté `
                + `error: ${response.data.message}`);
        }
        const data = response.data.data;
        set({ user: data, error: null });
        return response.data.message;
    },
    logout: async () => {
        const response = await api.post<ApiResponse<null>>('/logout');
        set({ user: null });

        return response.data.message;
    },
}));
