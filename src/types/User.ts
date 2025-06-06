import z from "zod";

export type User = {
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    roles: JSON,
    createdAt: string
};

export const loginSchema = z.object({
    email: z.string().email('Email invalide'),
    password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
});