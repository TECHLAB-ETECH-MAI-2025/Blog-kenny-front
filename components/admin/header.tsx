"use client"

import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useAuthStore } from "@/store/authStore"
import { LogOut, Menu } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserAvatar } from "@/components/ui/user-avatar"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function AdminHeader() {
    const { user, logout } = useAuthStore();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logout();
            toast.success('Déconnexion réussie');
            router.push('/login');
        } catch {
            toast.error('Erreur lors de la déconnexion');
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 flex md:hidden">
                    <SidebarTrigger>
                        <Button variant="ghost" size="icon">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle Sidebar</span>
                        </Button>
                    </SidebarTrigger>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none" />
                    <nav className="flex items-center space-x-4">
                        <ThemeToggle />
                        {user && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-accent/50 transition-colors">
                                        <UserAvatar
                                            user={user}
                                            className="h-10 w-10"
                                        />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-auto p-2">
                                    <DropdownMenuLabel className="font-normal p-4">
                                        <div className="flex flex-row space-x-3 items-center">
                                            <UserAvatar
                                                user={user}
                                                className="h-12 w-12"
                                            />
                                            <div className="flex flex-col space-y-2">
                                                <p className="text-sm font-medium leading-none">{user.email}</p>
                                                <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                                                    {user.roles.includes('ROLE_ADMIN') ? 'Administrateur' : 'Utilisateur'}
                                                </span>
                                            </div>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator className="my-2" />
                                    <DropdownMenuItem
                                        className="flex items-center  bg-primary/10 p-3 cursor-pointer hover:bg-destructive/10 rounded-md text-destructive hover:text-destructive"
                                        onClick={handleLogout}
                                    >
                                        <LogOut className="mr-3 h-4 w-4" />
                                        <div className="flex flex-col">
                                            <span className="text-sm">Se déconnecter</span>
                                            <span className="text-xs">Quitter votre session</span>
                                        </div>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
}
