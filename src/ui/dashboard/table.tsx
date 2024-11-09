import { TableProps } from "@/lib/@types/props"

/**
 * TODO: fix error in Date type
 */
export const Table = async ({ samples }: TableProps) => {
    return (
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
            {/* <tbody>
               
                {samples.map(({ id, material, corrosion, temperature, humidity, date, Zone: { name } }) => (
                    <tr className="text-sm td:text-start td:font-normal" key={id}>
                        <td className="w-[15%] p-3 whitespace-nowrap text-ellipsis border-t overflow-hidden sm:w-[10%]">{id}</td>
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
                            {name}
                        </td>
                        <td className="w-[30%] p-3 whitespace-nowrap text-ellipsis border-t overflow-hidden sm:w-[25%]">
                            {JSON.stringify(date, null, 2)}
                        </td>
                    </tr>
                ))}
            </tbody> */}
        </table>
    )
}
