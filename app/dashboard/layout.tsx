import React from 'react'
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {Separator} from "@/components/ui/separator";
import ThemeToggle from "@/components/shared/theme-toggle";
import {AppSidebar} from "@/components/shared/app-sidebar";
import {cookies} from "next/headers";
import NavBreadCrumb from "@/components/shared/nav-bread-crumb";
import {Toaster} from "@/components/ui/sonner";

const DashboardLayout = async ({children}: { children: React.ReactNode }) => {
    const cookieStore = await cookies();
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

    return (
        <main
            className={"min-h-screen justify-center"}>
            <SidebarProvider defaultOpen={defaultOpen}>
                <AppSidebar/>
                <div className={"flex-1 p-4"}>
                    <header className="flex flex-1 h-16 shrink-0 items-center gap-2 px-4 justify-between border-b">
                        <div className={"flex items-center gap-2"}>
                            <SidebarTrigger className="-ml-1"/>
                            <Separator
                                orientation="vertical"
                                className="mr-2 data-[orientation=vertical]:h-4"
                            />
                            <NavBreadCrumb homeElement={"Dashboard"} homeHref="/dashboard" basePath="/dashboard" />
                        </div>
                        <ThemeToggle/>
                    </header>
                    <div className={"container mx-auto"}>
                        <Toaster />
                        {children}
                    </div>
                </div>
            </SidebarProvider>
        </main>
    )
}
export default DashboardLayout
