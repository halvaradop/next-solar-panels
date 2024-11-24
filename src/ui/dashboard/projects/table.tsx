import { TablePlantsProps } from "@/lib/@types/props"

export const TablePlants = async ({ plants }: TablePlantsProps) => {
    return (
        <table className="w-full text-neutral-600 table-fixed border border-gray-1000 border-separate border-spacing-0 rounded-lg bg-white">
            <thead>
                <tr>
                    <th className="p-3 text-start font-medium">Id</th>
                    <th className="p-3 text-start font-medium">Plant Name</th>
                    <th className="hidden w-[20%] p-3 text-start font-medium sm:table-cell">Latitude</th>
                    <th className="p-3 text-start font-medium">Longitude</th>
                </tr>
            </thead>
            <tbody>
                {plants.map(({ projectId, name, latitude, longitude }) => (
                    <tr className="text-sm td:text-start td:font-normal" key={projectId}>
                        <td className="p-3 truncate border-t overflow-hidden">{projectId}</td>
                        <td className="p-3 truncate border-t overflow-hidden">{name}</td>
                        <td className="hidden p-3 truncate border-t sm:table-cell">{latitude.toString()}</td>
                        <td className="hidden p-3 truncate border-t sm:table-cell">{longitude.toString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
