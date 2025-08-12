"use client";

import {Building, Calendar, Home, Scan, UsersIcon} from "lucide-react"
import Link from "next/link"
import {usePathname} from "next/navigation"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
    {
        title: "Home",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "Scan",
        url: "/dashboard/scan",
        icon: Scan,
    },
    {
        title: "User Management",
        url: "/dashboard/users",
        icon: UsersIcon
    },
    {
        title: "Venues",
        url: "/dashboard/venues",
        icon: Building,
    },
    {
        title: "Check-Ins",
        url: "/dashboard/checkins",
        icon: Calendar,
    },
]

export function AppSidebar() {
    const pathname = usePathname()

    return (
        <Sidebar
            variant={"floating"}
            collapsible={"icon"}>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={
                                            item.url === "/dashboard"
                                                ? pathname === item.url
                                                : pathname === item.url || pathname.startsWith(item.url + "/")
                                        }
                                    >
                                        <Link href={item.url}>
                                            <item.icon/>
                                            <span>{item.title}</span>
                                        </Link>
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