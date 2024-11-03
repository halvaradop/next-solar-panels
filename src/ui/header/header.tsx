"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"
import { HeaderMenu } from "./header-menu"
import { usePathname } from "next/navigation"
import { merge } from "@/lib/merge"

export const Header = () => {
    const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const isHome = pathname === "/"

    const handleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    useEffect(() => {
        const matchMedia = window.matchMedia("(min-width: 900px)")

        const handleMatchMedia = () => {
            setIsMenuOpen(matchMedia.matches)
        }

        handleMatchMedia()
        matchMedia.addEventListener("change", handleMatchMedia)
        return () => matchMedia.removeEventListener("change", handleMatchMedia)
    }, [])

    useEffect(() => {
        setIsMenuOpen(false)
    }, [pathname])

    return (
        <header data-open={isMenuOpen}>
            <nav
                className={merge(
                    "w-11/12 h-20 mx-auto flex items-center justify-between text-white lg:w-10/12 xl:max-w-screen-xl",
                    { "text-black": !isHome && !isMenuOpen }
                )}
            >
                <Link className={merge("font-medium", { "text-black": !isHome })} href="/">
                    Ache Engineering
                </Link>
                <div
                    className={merge("space-y-1.5 z-20 hover:cursor-pointer base:hidden span:bg-white", {
                        "span:bg-black": !isHome && !isMenuOpen,
                    })}
                    onClick={handleMenu}
                >
                    <span className="w-8 h-0.5 block rounded"></span>
                    <span className="w-8 h-0.5 block rounded"></span>
                    <span className="w-8 h-0.5 block rounded"></span>
                </div>
                <AnimatePresence>{isMenuOpen && <HeaderMenu />}</AnimatePresence>
            </nav>
        </header>
    )
}
