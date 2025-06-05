"use client"

import { Home, ListOrdered, MessageSquareText, Newspaper, User } from "lucide-react"
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
import { usePathname } from "next/navigation"

const menuItems = [
    {
        title: "Article",
        icon: Newspaper,
        url: "/admin/article",
    },
    {
        title: "Catégories",
        icon: ListOrdered,
        url: "/admin/category",
    },
    {
        title: "Comment",
        icon: MessageSquareText,
        url: "/admin/comment",
    },
]

export function AdminSidebar() {
    const pathname = usePathname();
    if (!pathname) {
        return null;
    }
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
                                    <SidebarMenuButton asChild isActive={pathname.startsWith(item.url)}>
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
