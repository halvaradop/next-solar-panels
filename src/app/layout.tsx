import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { LayoutProps } from "@/lib/@types/types"
import "@/ui/globals.css"
import { Header } from "@/ui/header/header"
import { Footer } from "@/ui/footer"

const poppins = Poppins({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
    variable: "--font-poppins",
})

const title = "Ache Engineering"
const description =
    "Specialists in photovoltaic systems and corrosion protection for efficient and safe long-term installations to contributing to a greener planet"

export const metadata: Metadata = {
    title: {
        default: title,
        template: "%s | Ache Engineering",
    },
    authors: [{ name: "Hernan Alvarado" }, { name: "Jorge Yate" }, { name: "Ache Engineering" }],
    description,
    applicationName: title,
    category: "Engineering, Solar Energy, Corrosion Protection",
    classification: "Engineering, Solar Energy, Corrosion Protection",
    keywords: ["Engineering", "Solar Energy", "Corrosion Protection", "Photovoltaic"],
    robots: "index, follow",
    openGraph: {
        title,
        description,
        type: "website",
        siteName: title,
        locale: "de_DE",
        url: "https://www.ache-engineering.de/",
    },
}

export default function RootLayout({ children }: LayoutProps) {
    return (
        <html lang="en">
            <body
                className={`${poppins.className} relative antialiased overflow-x-hidden scroll:w-1.5 track:my-1 thumb:rounded thumb:bg-black`}
            >
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    )
}
