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
                    <th className="p-3">Name</th>
                    <th className="max-w-0 p-3">Longitude</th>
                    <th className="max-w-0 p-3">Latitude</th>
                    <th className="hidden p-3 sm:table-cell">Project</th>
                </tr>
            </thead>
            <tbody>
                {filteredZones.map(({ zoneId, name, latitude, longitude, project }) => (
                    <tr className="text-sm td:text-start td:font-normal" key={zoneId}>
                        <td className="p-3 border-t xs:table-cell">{name}</td>
                        <td className="p-3 border-t">{longitude.toString()}</td>
                        <td className="p-3 border-t">{latitude.toString()}</td>
                        <td className="hidden p-3 border-t sm:table-cell">{project?.name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
