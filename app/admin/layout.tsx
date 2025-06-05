"use client"

import { AdminHeader } from "@/components/admin/header"
import { AdminSidebar } from "@/components/admin/sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider
            defaultOpen={true}
        >
            <div className="relative flex min-h-screen w-full ">
                <AdminSidebar />
                <div className="flex flex-1 flex-col ">
                    <AdminHeader />
                    <main className="flex-1 p-6">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    )
}