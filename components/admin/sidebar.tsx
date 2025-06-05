"use client"

import { Home, LayoutDashboard, ListOrdered, Settings, User } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

const menuItems = [
    {
        title: "Tableau de bord",
        icon: LayoutDashboard,
        url: "/admin",
    },
    {
        title: "Catégories",
        icon: ListOrdered,
        url: "/admin/category",
    },
    {
        title: "Utilisateurs",
        icon: User,
        url: "/admin/users",
    },
    {
        title: "Paramètres",
        icon: Settings,
        url: "/admin/settings",
    },
]

export function AdminSidebar() {
    return (
        <Sidebar>
            <SidebarHeader className="border-b border-border p-4">
                <div className="flex items-center gap-2">
                    <Home className="h-6 w-6" />
                    <span className="font-bold">Admin Panel</span>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url} className="flex items-center gap-2">
                                            <item.icon className="h-4 w-4" />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
