"use client"
import Link from "next/link"
import { Suspense, useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { AnimatePresence } from "framer-motion"
import { SessionProvider } from "next-auth/react"
import { merge } from "@/lib/utils"
import { HeaderMenu } from "./header-menu"
import { MenuState } from "@/lib/@types/types"

export const Header = () => {
    const pathname = usePathname()
    const [menuState, setMenuState] = useState<MenuState>({
        hash: "",
        isMenuOpen: false,
        isMatchMedia: false,
    })
    const isHomePage = pathname === "/"
    const isMenuVisible = menuState.isMenuOpen || menuState.isMatchMedia

    const handleMenu = () => {
        setMenuState((previous) => ({
            ...previous,
            isMenuOpen: !menuState.isMenuOpen,
        }))
    }

    useEffect(() => {
        setMenuState((previous) => ({
            ...previous,
            isMenuOpen: false,
        }))
    }, [pathname])

    useEffect(() => {
        const matchMedia = window.matchMedia("(min-width: 900px)")

        const handleMatchMedia = () => {
            setMenuState((previous) => ({
                ...previous,
                isMatchMedia: matchMedia.matches,
            }))
        }

        handleMatchMedia()
        matchMedia.addEventListener("change", handleMatchMedia)
        return () => matchMedia.removeEventListener("change", handleMatchMedia)
    }, [])

    return (
        <Suspense>
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
                        <AnimatePresence>
                            {isMenuVisible && (
                                <HeaderMenu pathname={pathname} menuState={menuState} setMenuState={setMenuState} />
                            )}
                        </AnimatePresence>
                    </nav>
                </header>
            </SessionProvider>
        </Suspense>
    )
}
