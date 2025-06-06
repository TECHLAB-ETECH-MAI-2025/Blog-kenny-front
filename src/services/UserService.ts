import api from '@/lib/api';

interface LoginCredentials {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
    user: {
        email: string;
        roles: string[];
    };
}

export class UserService {
    static async login(credentials: LoginCredentials): Promise<LoginResponse> {
        try {
            const response = await api.post(`/login`, credentials);

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }

            return response.data;
        } catch (error) {
            throw new Error('Échec de la connexion. Veuillez vérifier vos identifiants.');
        }
    }

    static logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    static isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    }
}