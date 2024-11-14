"use client"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { FilterPlantsProps } from "@/lib/@types/props"
import { Entry } from "@/lib/@types/types"
import { FilterBy } from "../filter-by"
import resetIcon from "@/public/reset.svg"
import filterIcon from "@/public/filter.svg"

export const Filter = ({ plants }: FilterPlantsProps) => {
    const router = useRouter()
    const patname = usePathname()
    const mapPlants = plants.map<Entry>(({ plantId, plantName }) => ({ key: plantId.toString(), value: plantName }))

    const handleResetFilter = () => {
        router.push(patname)
    }

    return (
        <div className="max-w-full w-fit h-14 flex items-center border border-gray-1000 rounded-lg bg-white divide-x">
            <figure className="h-full px-3 flex items-center justify-center">
                <Image src={filterIcon} alt="Filter icon" />
            </figure>
            <p className="h-full px-3 flex items-center justify-center">Filter By</p>
            <FilterBy title="Plants" options={mapPlants} />
            <figure
                className="h-full px-3 flex items-center justify-center gap-x-2 hover:cursor-pointer"
                onClick={handleResetFilter}
            >
                <Image src={resetIcon} alt="reset icon" />
                <figcaption className="text-red-400">Reset Filter</figcaption>
            </figure>
        </div>
    )
}