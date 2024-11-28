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
                    <th className="max-w-0">Longitude</th>
                    <th className="max-w-0">Latitude</th>
                    <th className="hidden sm:table-cell">Project</th>
                </tr>
            </thead>
            <tbody>
                {filteredZones.map(({ zoneId, name, latitude, longitude, project }) => (
                    <tr className="text-sm" key={zoneId}>
                        <td className="xs:table-cell">{name}</td>
                        <td>{longitude.toString()}</td>
                        <td>{latitude.toString()}</td>
                        <td className="hidden sm:table-cell">{project?.name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
