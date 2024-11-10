"use client"
import { MouseEvent, useState } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { merge } from "@/lib/utils"
import { FilterByProps } from "@/lib/@types/props"

export const FilterBy = ({ className, title, options }: FilterByProps) => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = () => {
        setIsOpen(!isOpen)
    }

    const handleOption = (event: MouseEvent<HTMLLIElement>): void => {
        const { value } = event.currentTarget.dataset
        const searchs = new URLSearchParams(searchParams.toString())
        searchs.set(title.toLowerCase(), value!)
        router.push(`${pathname}?${searchs.toString()}`)
        setIsOpen(false)
    }

    return (
        options.length > 0 && (
            <div className={merge("h-full px-3 flex items-center justify-center relative hover:cursor-pointer", className)}>
                <p onClick={handleOpen}>{title}</p>
                {isOpen && (
                    <ul className="w-max mt-2 px-3 flex-col absolute top-full left-0 text-center divide-y border border-gray-1000 rounded-lg bg-white">
                        {options.map(({ key, value }, index) => (
                            <li key={index} className="w-full py-3" data-value={value} onClick={handleOption}>
                                {key}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        )
    )
}
