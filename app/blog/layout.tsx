"use client"

import { BlogHeader } from "@/components/blog/header"
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import { toast } from "sonner";


export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const fetchMe = useAuthStore((state) => state.fetchMe);
    useEffect(() => {
        fetchMe().catch(() => {
            toast.error("Échec de la récupération des informations utilisateur. Veuillez vous reconnecter.");
        });
    }, [fetchMe]);

    return (

        <>
            <BlogHeader />
            {children}
        </>
    )
}