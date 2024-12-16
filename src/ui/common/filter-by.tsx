"use client"
import { MouseEvent } from "react"
import { merge } from "@/lib/utils"
import { FilterByProps } from "@/lib/@types/props"

export const FilterBy = ({ className, title, options, index, indexOpen, onUpdateIndex, onOption }: FilterByProps) => {
    const handleOpen = () => {
        onUpdateIndex(index)
    }

    const handleOption = (event: MouseEvent<HTMLLIElement>): void => {
        const { value } = event.currentTarget.dataset
        onOption(title, value!)
        handleOpen()
    }

    return (
        options.length > 0 && (
            <div className={merge("h-full px-3 flex items-center justify-center relative hover:cursor-pointer", className)}>
                <p className="capitalize" onClick={handleOpen}>
                    {title}
                </p>
                {index === indexOpen && (
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
