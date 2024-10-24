import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { LayoutProps } from "@/lib/@types/types"
import "@/ui/globals.css"

const inter = Inter({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
    variable: "--font-inter",
})

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
}

export default function RootLayout({ children }: LayoutProps) {
    return (
        <html lang="en">
            <body className={`${inter.variable} antialiased`}>{children}</body>
        </html>
    )
}
