"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"
import { HeaderMenu } from "./header-menu"
import { usePathname } from "next/navigation"
import { merge } from "@/lib/merge"
import { MenuState } from "@/lib/@types/types"
import { SessionProvider } from "next-auth/react"

export const Header = () => {
    const pathname = usePathname()
    const [menuState, setMenuState] = useState<MenuState>({
        isMenuOpen: false,
        isMatchMedia: false,
    })
    const isHomePage = pathname === "/"
    const isMenuVisible = menuState.isMenuOpen || menuState.isMatchMedia

    const handleMenu = () => {
        setMenuState({
            ...menuState,
            isMenuOpen: !menuState.isMenuOpen,
        })
    }

    useEffect(() => {
        setMenuState({
            ...menuState,
            isMenuOpen: false,
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname])

    useEffect(() => {
        const matchMedia = window.matchMedia("(min-width: 900px)")

        const handleMatchMedia = () => {
            setMenuState({
                isMenuOpen: false,
                isMatchMedia: matchMedia.matches,
            })
        }

        handleMatchMedia()
        matchMedia.addEventListener("change", handleMatchMedia)
        return () => matchMedia.removeEventListener("change", handleMatchMedia)
    }, [])

    return (
        <SessionProvider>
            <header
                className="data-[home='false']:border-b data-[home='false']:border-gray-1000"
                data-open={isMenuVisible}
                data-home={isHomePage}
            >
                <nav
                    className={merge(
                        "w-11/12 h-20 mx-auto flex items-center justify-between text-white lg:w-10/12 xl:max-w-screen-xl",
                        { "text-black": !isHomePage && !menuState.isMenuOpen }
                    )}
                >
                    <Link className={merge("font-medium", { "text-black": !isHomePage })} href="/">
                        Ache Engineering
                    </Link>
                    <div
                        className={merge("space-y-1.5 z-20 hover:cursor-pointer base:hidden span:bg-white", {
                            "span:bg-black": !isHomePage && !menuState.isMenuOpen,
                        })}
                        onClick={handleMenu}
                    >
                        <span className="w-8 h-0.5 block rounded"></span>
                        <span className="w-8 h-0.5 block rounded"></span>
                        <span className="w-8 h-0.5 block rounded"></span>
                    </div>
                    <AnimatePresence>{isMenuVisible && <HeaderMenu isMatchMedia={menuState.isMatchMedia} />}</AnimatePresence>
                </nav>
            </header>
        </SessionProvider>
    )
}
