"use client"
import { useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"
import { HeaderMenu } from "./header-menu"

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

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

    return (
        <header data-open={isMenuOpen}>
            <nav className="w-11/12 h-20 mx-auto flex items-center justify-between lg:w-10/12 xl:max-w-screen-xl">
                <p className="text-white font-medium">Ache Engineering</p>
                <div className="space-y-1.5 z-10 hover:cursor-pointer base:hidden" onClick={handleMenu}>
                    <span className="w-8 h-0.5 block rounded bg-white"></span>
                    <span className="w-8 h-0.5 block rounded bg-white"></span>
                    <span className="w-8 h-0.5 block rounded bg-white"></span>
                </div>
                <AnimatePresence>{isMenuOpen && <HeaderMenu />}</AnimatePresence>
            </nav>
        </header>
    )
}
