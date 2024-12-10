"use client"
import { useSearchParams } from "next/navigation"
import { TableFieldsProps } from "@/lib/@types/props"

export const TableFields = ({ fields }: TableFieldsProps) => {
    const params = useSearchParams()

    const filteredFields = fields.filter(({ idField }) => {
        const project = params.get("plant")
        return project ? project === idField.toString() : true
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
                {filteredFields.map(({ idField, designation, idAddress, project }) => (
                    <tr className="text-sm" key={idField}>
                        <td className="xs:table-cell">{designation}</td>
                        <td>{idAddress}</td>
                        <td>{idAddress}</td>
                        <td className="hidden sm:table-cell">{project?.designation}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
