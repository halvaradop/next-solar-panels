"use client"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { FilterBy } from "./filter-by"
import { FilterProps } from "@/lib/@types/props"
import resetIcon from "@/public/reset.svg"
import filterIcon from "@/public/filter.svg"

export const Filter = ({ filters }: FilterProps) => {
    const router = useRouter()
    const patname = usePathname()

    const handleResetFilter = () => {
        router.push(patname)
    }

    return (
        <div className="max-w-full w-fit h-14 flex items-center border border-gray-1000 rounded-lg bg-white divide-x">
            <figure className="h-full px-3 flex items-center justify-center">
                <Image src={filterIcon} alt="Filter icon" priority />
            </figure>
            <p className="h-full px-3 flex items-center justify-center">Filter By</p>
            {filters.map(({ className, title, options }, index) => (
                <FilterBy key={index} className={className} title={title} options={options} />
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
