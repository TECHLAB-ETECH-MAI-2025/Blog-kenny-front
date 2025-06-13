"use client"

import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/store/authStore"
import Link from "next/link"
import { UserNav } from "./user-nav"

export function BlogHeader() {
    const { user } = useAuthStore()

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="mx-8 flex h-16 items-center justify-between">
                <div className="flex items-center gap-6">
                    <Link href="/blog" className="text-xl font-bold tracking-tighter">
                        Blog kenny
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    {user ? (
                        <UserNav user={user} />
                    ) : (
                        <Button asChild variant="ghost" size="sm">
                            <Link href="/login">
                                Se connecter
                            </Link>
                        </Button>
                    )}
                </div>
            </div>
        </header>
    )
}
