import { FilterProps } from "@/lib/@types/props"

export const Table = async ({ zones }: FilterProps) => {
    return (
        <table className="w-full text-neutral-600 table-fixed border border-gray-1000 border-separate border-spacing-0 rounded-lg bg-white">
            <thead>
                <tr>
                    <th className="w-[10%] p-3 text-start font-medium sm:w-[10%]">Id</th>
                    <th className="w-[30%] p-3 text-start font-medium sm:w-[30%] md:w-[20%]">Name</th>
                    <th className="hidden w-[20%] p-3 text-start font-medium sm:table-cell base:w-[15%]">Longitude</th>
                    <th className="hidden w-[20%] p-3 text-start font-medium md:table-cell base:w-[15%]">Latitude</th>
                    <th className="w-[15%] p-3 text-start font-medium sm:w-[15%] md:w-[10%]">Plant</th>
                </tr>
            </thead>
            <tbody>
                {zones.map(({ zoneId, name, latitude, longitude, plantId }) => (
                    <tr className="text-sm td:text-start td:font-normal" key={zoneId}>
                        <td className="w-[15%] p-3 whitespace-nowrap text-ellipsis border-t overflow-hidden sm:w-[10%]">
                            {zoneId}
                        </td>
                        <td className="w-[40%] p-3 whitespace-nowrap text-ellipsis border-t overflow-hidden sm:w-[30%]">
                            {name}
                        </td>
                        <td className="hidden w-[20%] p-3 whitespace-nowrap text-ellipsis border-t sm:table-cell">
                            {longitude.toString()}
                        </td>
                        <td className="hidden w-[20%] p-3 whitespace-nowrap text-ellipsis border-t md:table-cell">
                            {latitude.toString()}
                        </td>
                        <td className="w-[15%] p-3 whitespace-nowrap text-ellipsis border-t overflow-hidden sm:w-[15%]">
                            {plantId}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
