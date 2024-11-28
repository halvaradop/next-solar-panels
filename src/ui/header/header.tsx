"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"
import { merge } from "@/lib/utils"
import { HeaderMenu } from "./header-menu"

export const Header = () => {
    const pathname = usePathname()
    const [isOpenMenu, setMenuState] = useState(false)

    const handleMenu = () => {
        setMenuState(!isOpenMenu)
    }

    useEffect(() => {
        const matchMedia = window.matchMedia("(min-width: 900px)")
        const handleMatchMedia = () => setMenuState(matchMedia.matches)
        handleMatchMedia()
        matchMedia.addEventListener("change", handleMatchMedia)
        return () => matchMedia.removeEventListener("change", handleMatchMedia)
    }, [])

    return (
        <header data-open={isOpenMenu} data-pathname={pathname}>
            <nav className="w-11/12 h-20 mx-auto flex items-center justify-between text-white lg:w-10/12 xl:max-w-screen-xl">
                <Link className="font-medium" href="/">
                    Ache Engineering GmbH
                </Link>
                <div className="space-y-1.5 z-20 hover:cursor-pointer base:hidden" id="menu-icon" onClick={handleMenu}>
                    <span className="w-8 h-0.5 block rounded bg-white" />
                    <span className="w-8 h-0.5 block rounded bg-white" />
                    <span className="w-8 h-0.5 block rounded bg-white" />
                </div>
                <AnimatePresence>{isOpenMenu && <HeaderMenu />}</AnimatePresence>
            </nav>
        </header>
    )
}
