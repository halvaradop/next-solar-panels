import Image from "next/image"
import samples from "@/public/samples.svg"
import zones from "@/public/zone.svg"
import filter from "@/public/filter.svg"
import arrowIcon from "@/public/arrow.svg"
import { Table } from "@/ui/dashboard/table"
import { FilterBy } from "@/ui/dashboard/filter-by"

const zoneOptions = [
    { key: "Zone 1", value: "1" },
    { key: "Zone 2", value: "2" },
]

const Dashboard = () => {
    return (
        <section className="w-full min-h-main py-4 space-y-4">
            <div className="flex items-center gap-x-4">
                <figure className="p-3 flex items-center justify-evenly gap-x-4 border border-gray-1000 rounded-lg bg-white hover:cursor-pointer">
                    <Image src={samples} alt="Samples icon" />
                    <figcaption className="flex flex-col">
                        <h2>Samples</h2>
                        <p>20</p>
                    </figcaption>
                </figure>
                <figure className="p-3 flex items-center justify-evenly gap-x-4 border border-gray-1000 rounded-lg bg-white hover:cursor-pointer">
                    <Image src={zones} alt="Zones icon" />
                    <figcaption className="flex flex-col">
                        <h2>Zones</h2>
                        <p>1</p>
                    </figcaption>
                </figure>
            </div>
            <div className="max-w-full w-fit h-14 flex items-center border border-gray-1000 rounded-lg bg-white">
                <figure className="h-full px-3 flex items-center justify-center border-r">
                    <Image src={filter} alt="Filter icon" />
                </figure>
                <p className="h-full px-3 flex items-center justify-center border-r">Filter By</p>
                <FilterBy title="Zone" options={zoneOptions} />
            </div>
            <Table />
            <div className="w-full flex items-center justify-between">
                <p className="text-sm">showing 0-2 of 2</p>
                <figure className="h-8 flex items-center border border-gray-1000 rounded-md divide-x">
                    <figure className="px-1 hover:cursor-pointer">
                        <Image className="rotate-90" src={arrowIcon} alt="arrow icon" />
                    </figure>
                    <figure className="px-1 hover:cursor-pointer">
                        <Image className="-rotate-90" src={arrowIcon} alt="arrow icon" />
                    </figure>
                </figure>
            </div>
        </section>
    )
}

export default Dashboard
