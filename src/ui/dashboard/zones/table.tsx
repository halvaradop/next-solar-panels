"use client"
import { useSearchParams } from "next/navigation"
import { TableZonesProps } from "@/lib/@types/props"

export const TableZones = ({ zones }: TableZonesProps) => {
    const params = useSearchParams()

    const filteredZones = zones.filter(({ projectId }) => {
        const plant = params.get("plant")
        return plant ? plant === projectId.toString() : true
    })

    return (
        <table className="w-full text-neutral-600 table-fixed border border-gray-1000 border-separate border-spacing-0 rounded-lg bg-white">
            <thead>
                <tr>
                    <th>Name</th>
                    <th className="max-w-0">Coordinates</th>
                    <th className="hidden sm:table-cell">Project</th>
                    <th className="max-w-0"># Samples</th>
                </tr>
            </thead>
            <tbody>
                {filteredZones.map(({ zoneId, name, latitude, longitude, project, samples }) => (
                    <tr className="text-sm" key={zoneId}>
                        <td className="xs:table-cell">{name}</td>
                        <td>
                            {longitude.toString()} <br /> {latitude.toString()}
                        </td>
                        <td className="hidden sm:table-cell">{project?.name}</td>
                        <td>{samples?.length}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
