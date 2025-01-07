"use client"
import Image from "next/image"
import { useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { FilterBy } from "./filter-by"
import { FilterProps } from "@/lib/@types/props"
import resetIcon from "@/public/reset.svg"
import filterIcon from "@/public/filter.svg"

export const Filter = ({ filters }: FilterProps) => {
    const router = useRouter()
    const patname = usePathname()
    const searchParams = useSearchParams()
    const [indexOpen, setIndexOpen] = useState<number>(-1)

    const handleResetFilter = () => {
        router.push(patname)
    }

    const handleUpdateIndexOpen = (index: number) => {
        setIndexOpen((previous) => (previous === index ? -1 : index))
    }

    const handleOption = (title: string, value: string): void => {
        const searchs = new URLSearchParams(searchParams.toString())
        searchs.set(title.toLowerCase(), value)
        router.push(`${patname}?${searchs.toString()}`)
    }

    return (
        <div className="max-w-full w-fit h-14 flex items-center shadow rounded-lg bg-white divide-x">
            <figure className="h-full px-3 flex items-center justify-center">
                <Image src={filterIcon} alt="Filter icon" priority />
            </figure>
            <p className="h-full px-3 flex items-center justify-center">Filter By</p>
            {filters.map(({ className, title, options }, index) => (
                <FilterBy
                    key={index}
                    className={className}
                    title={title}
                    options={options}
                    index={index}
                    indexOpen={indexOpen}
                    onUpdateIndex={handleUpdateIndexOpen}
                    onOption={handleOption}
                />
            ))}
            <figure
                className="h-full px-3 flex items-center justify-center gap-x-2 hover:cursor-pointer"
                onClick={handleResetFilter}
            >
                <Image src={resetIcon} alt="reset icon" priority />
                <figcaption className="text-red-400">Reset Filter</figcaption>
            </figure>
        </div>
    )
}
