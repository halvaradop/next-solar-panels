import Link from "next/link"
import Image from "next/image"
import samples from "@/public/samples.svg"
import zones from "@/public/zone.svg"
import filter from "@/public/filter.svg"
import arrowIcon from "@/public/arrow.svg"

const mocks = [
    {
        id: 1,
        material: "Steel",
        corrosion: "20",
        temperature: "25",
        humidity: "60",
        zone: "1",
        date: "03-11-2024",
    },
    {
        id: 2,
        material: "Steel",
        corrosion: "50",
        temperature: "30",
        humidity: "55",
        zone: "1",
        date: "03-11-2024",
    },
]

const Dashboard = () => {
    return (
        <section className="w-11/12 mx-auto min-h-main pt-10 space-y-4 lg:w-10/12 xl:max-w-screen-xl">
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
                <p className="h-full px-3 flex items-center justify-center hover:cursor-pointer">Zone</p>
            </div>
            <table className="w-full text-neutral-600 table-fixed border border-gray-1000 border-separate border-spacing-0 rounded-lg bg-white">
                <thead>
                    <tr>
                        <th className="w-[10%] p-3 text-start font-medium sm:w-[10%]">Id</th>
                        <th className="w-[30%] p-3 text-start font-medium sm:w-[30%] md:w-[20%]">Material</th>
                        <th className="hidden w-[20%] p-3 text-start font-medium sm:table-cell base:w-[15%]">Corrosion</th>
                        <th className="hidden w-[20%] p-3 text-start font-medium md:table-cell base:w-[15%]">Temperature</th>
                        <th className="hidden w-[15%] p-3 text-start font-medium base:table-cell">Humidity</th>
                        <th className="w-[15%] p-3 text-start font-medium sm:w-[15%] md:w-[10%]">Zone</th>
                        <th className="w-[25%] p-3 text-start font-medium sm:w-[25%] md:w-[20%] base:w-[15]">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {mocks.map(({ id, material, corrosion, temperature, humidity, zone, date }) => (
                        <tr className="text-sm td:text-start td:font-normal" key={id}>
                            <td className="w-[15%] p-3 whitespace-nowrap text-ellipsis border-t overflow-hidden sm:w-[10%]">
                                {id}
                            </td>
                            <td className="w-[40%] p-3 whitespace-nowrap text-ellipsis border-t overflow-hidden sm:w-[30%]">
                                {material}
                            </td>
                            <td className="hidden w-[20%] p-3 whitespace-nowrap text-ellipsis border-t sm:table-cell">
                                {corrosion}%
                            </td>
                            <td className="hidden w-[20%] p-3 whitespace-nowrap text-ellipsis border-t md:table-cell">
                                {temperature}°C
                            </td>
                            <td className="hidden w-[10%] p-3 whitespace-nowrap text-ellipsis border-t base:table-cell">
                                {humidity}%
                            </td>
                            <td className="w-[15%] p-3 whitespace-nowrap text-ellipsis border-t overflow-hidden sm:w-[15%]">
                                {zone}
                            </td>
                            <td className="w-[30%] p-3 whitespace-nowrap text-ellipsis border-t overflow-hidden sm:w-[25%]">
                                {date}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
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
