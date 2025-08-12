import type {Metadata} from "next";
import "./globals.css";
import React from "react";
import {ThemeProvider} from "@/providers/theme-provider";
import {ConvexClientProvider} from "@/providers/convex-client-provider";

export const metadata: Metadata = {
    title: "PandemicNet",
    description: "Mapping the Spread & Saving Lives",
};

export default function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body>
        <ConvexClientProvider>
            <ThemeProvider
                attribute={"class"}
                defaultTheme={"system"}
                enableSystem
                disableTransitionOnChange
            >
                    {children}
            </ThemeProvider>
        </ConvexClientProvider>
        </body>
        </html>
    );
}
