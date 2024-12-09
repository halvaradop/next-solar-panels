"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { HeaderMenu } from "./header-menu"
import logoIcon from "@/public/logoAche.png"

/**
 * TODO: re-implement animations from frame-motion
 */
export const Header = () => {
    const pathname = usePathname()
    const [menuState, setMenuState] = useState({
        isOpenMenu: false,
        isMatchMedia: false,
    })
    const isOpenMenu = menuState.isOpenMenu || menuState.isMatchMedia

    const handleMenu = () => {
        setMenuState((previous) => ({ ...previous, isOpenMenu: !previous.isOpenMenu }))
    }

    const handleCloseMenu = () => {
        setMenuState((previous) => ({ ...previous, isOpenMenu: false }))
    }

    useEffect(() => {
        handleCloseMenu()
    }, [pathname])

    useEffect(() => {
        const matchMedia = window.matchMedia("(min-width: 900px)")
        const handleMatchMedia = () => setMenuState((previous) => ({ ...previous, isMatchMedia: matchMedia.matches }))
        handleMatchMedia()
        matchMedia.addEventListener("change", handleMatchMedia)
        return () => matchMedia.removeEventListener("change", handleMatchMedia)
    }, [])

    return (
        <header data-open={isOpenMenu} data-pathname={pathname}>
            <nav className="w-11/12 h-20 mx-auto flex items-center justify-between text-white lg:w-10/12 xl:max-w-screen-xl">
                <Link href="/">
                    <Image width={110} src={logoIcon} alt="logo icon" />
                </Link>
                <div className="space-y-1.5 z-20 hover:cursor-pointer base:hidden" id="menu-icon" onClick={handleMenu}>
                    <span className="w-8 h-0.5 block rounded bg-white" />
                    <span className="w-8 h-0.5 block rounded bg-white" />
                    <span className="w-8 h-0.5 block rounded bg-white" />
                </div>
                {isOpenMenu && <HeaderMenu onCloseMenu={handleCloseMenu} />}
            </nav>
        </header>
    )
}
