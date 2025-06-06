'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import FormField from '@/components/form/form-field';
import { UserService } from '@/src/services/UserService';
import { loginSchema } from '@/src/types/User';


type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: LoginForm) => {
        try {
            setIsLoading(true);
            await UserService.login(data);
            toast.success('Connexion réussie');
            router.push('/admin');
        } catch (error) {
            toast.error('Échec de la connexion. Veuillez vérifier vos identifiants.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background dark:bg-background px-4 py-8">
            <Card className="w-full max-w-md border border-border bg-card shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center text-card-foreground">
                        Connexion Blog kenny
                    </CardTitle>
                    <CardDescription className="text-center text-muted-foreground">
                        Entrez vos identifiants pour accéder à votre compte
                    </CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                label="Email"
                                type="email"
                                placeholder="votreEmail@email.com"
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                label="Mot de passe"
                                type="password"
                                placeholder="Votre mot de passe"
                            />
                        </CardContent>
                        <CardFooter>
                            <Button
                                type="submit"
                                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Connexion...' : 'Se connecter'}
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    );
}
