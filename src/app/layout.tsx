import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { LayoutProps } from "@/lib/@types/types"
import { Footer } from "@/ui/footer"
import { HeaderWrapper } from "@/ui/header/header-wrapper"
import "@/ui/globals.css"

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
    authors: [{ name: "Hernan Alvarado <hernanvid123@gmail.com>" }, { name: "Jorge Yate" }, { name: "Ache Engineering" }],
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

export default async function RootLayout({ children }: LayoutProps) {
    return (
        <html className="relative scroll-smooth" lang="en">
            <body
                className={`${poppins.className} antialiased overflow-x-hidden scroll:w-1.5 track:my-1 thumb:rounded thumb:bg-black`}
            >
                <HeaderWrapper />
                {children}
                <Footer />
            </body>
        </html>
    )
}
