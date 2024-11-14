import { FilterPlantsProps } from "@/lib/@types/props"

export const Table = async ({ plants }: FilterPlantsProps) => {
    return (
        <table className="w-full text-neutral-600 table-fixed border border-gray-1000 border-separate border-spacing-0 rounded-lg bg-white">
            <thead>
                <tr>
                    <th className="w-[10%] p-3 text-start font-medium sm:w-[10%]">Id</th>
                    <th className="w-[30%] p-3 text-start font-medium sm:w-[30%] md:w-[20%]">Plant Name</th>
                    <th className="hidden w-[20%] p-3 text-start font-medium sm:table-cell base:w-[15%]">Latitude</th>
                    <th className="w-[15%] p-3 text-start font-medium sm:w-[15%] md:w-[10%]">Longitude</th>
                </tr>
            </thead>
            <tbody>
                {plants.map(({ plantId, plantName, latitude, longitude, companyId }) => (
                    <tr className="text-sm td:text-start td:font-normal" key={plantId}>
                        <td className="w-[15%] p-3 whitespace-nowrap text-ellipsis border-t overflow-hidden sm:w-[10%]">
                            {plantId}
                        </td>
                        <td className="w-[20%] p-3 whitespace-nowrap text-ellipsis border-t overflow-hidden sm:w-[30%]">
                            {plantName}
                        </td>
                        <td className="hidden w-[20%] p-3 whitespace-nowrap text-ellipsis border-t sm:table-cell">
                            {latitude.toString()}
                        </td>
                        <td className="hidden w-[20%] p-3 whitespace-nowrap text-ellipsis border-t sm:table-cell">
                            {longitude.toString()}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
