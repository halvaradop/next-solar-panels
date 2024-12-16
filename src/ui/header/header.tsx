"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { HeaderMenu } from "./header-menu"
import { AnimatePresence } from "framer-motion"
import logoIcon from "@/public/logoAche.png"

export const Header = () => {
    const pathname = usePathname()
    const [isOpenMenu, setIsOpen] = useState(false)

    const handleToggleMenu = () => setIsOpen((previous) => !previous)

    useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    useEffect(() => {
        const matchMedia = window.matchMedia("(max-width: 900px)")
        const handleMatchMedia = () => setIsOpen(false)

        matchMedia.addEventListener("change", handleMatchMedia)
        return () => matchMedia.removeEventListener("change", handleMatchMedia)
    }, [])

    return (
        <header data-open={isOpenMenu} data-pathname={pathname}>
            <nav className="w-11/12 h-20 mx-auto flex items-center justify-between text-white lg:w-10/12 xl:max-w-screen-xl">
                <Link href="/">
                    <Image width={110} src={logoIcon} alt="logo icon" priority />
                </Link>
                <div className="space-y-1.5 z-20 hover:cursor-pointer base:hidden" id="menu-icon" onClick={handleToggleMenu}>
                    <span className="w-8 h-0.5 block rounded bg-white" />
                    <span className="w-8 h-0.5 block rounded bg-white" />
                    <span className="w-8 h-0.5 block rounded bg-white" />
                </div>
                <AnimatePresence mode="wait">
                    {isOpenMenu && <HeaderMenu className="base:hidden" onCloseMenu={handleToggleMenu} />}
                </AnimatePresence>
                <HeaderMenu className="hidden base:block" onCloseMenu={handleToggleMenu} />
            </nav>
        </header>
    )
}
