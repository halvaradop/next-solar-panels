import { TablePlantsProps } from "@/lib/@types/props"

export const TablePlants = async ({ plants }: TablePlantsProps) => {
    return (
        <table className="w-full text-neutral-600 table-fixed border border-gray-1000 border-separate border-spacing-0 rounded-lg bg-white">
            <thead>
                <tr>
                    <th>Plant Name</th>
                    <th className="hidden xs:table-cell">Latitude</th>
                    <th>Longitude</th>
                </tr>
            </thead>
            <tbody>
                {plants.map(({ projectId, name, latitude, longitude }) => (
                    <tr className="text-sm" key={projectId}>
                        <td>{name}</td>
                        <td>{latitude.toString()}</td>
                        <td className="hidden xs:table-cell">{longitude.toString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
