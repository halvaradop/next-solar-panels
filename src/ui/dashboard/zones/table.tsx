"use client"
import { useSearchParams } from "next/navigation"
import { TableZonesProps } from "@/lib/@types/props"

export const Table = async ({ zones }: TableZonesProps) => {
    const params = useSearchParams()

    const filteredZones = zones.filter(({ plantId }) => {
        const plant = params.get("plant")
        return plant ? plant === plantId.toString() : true
    })

    return (
        <table className="w-full text-neutral-600 table-fixed border border-gray-1000 border-separate border-spacing-0 rounded-lg bg-white">
            <thead>
                <tr>
                    <th className="py-3 pl-3">Id</th>
                    <th className="hidden p-3 xs:table-cell">Name</th>
                    <th className="max-w-0 p-3">Longitude</th>
                    <th className="max-w-0 p-3">Latitude</th>
                    <th className="hidden p-3 sm:table-cell">Plant</th>
                </tr>
            </thead>
            <tbody>
                {filteredZones.map(({ zoneId, name, latitude, longitude, plantId }) => (
                    <tr className="text-sm td:text-start td:font-normal" key={zoneId}>
                        <td className="p-3 pr-0 border-t">{zoneId}</td>
                        <td className="hidden p-3 border-t xs:table-cell">{name}</td>
                        <td className="p-3 border-t">{longitude.toString()}</td>
                        <td className="p-3 border-t">{latitude.toString()}</td>
                        <td className="hidden p-3 border-t sm:table-cell">{plantId}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
