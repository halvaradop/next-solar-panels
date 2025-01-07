"use client"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { TableFieldsProps } from "@/lib/@types/props"

export const TableFields = ({ fields }: TableFieldsProps) => {
    const params = useSearchParams()

    const filteredFields = fields.filter(({ project, address }) => {
        const projectParam = params.get("project")
        const cityParam = params.get("city")
        const countryParam = params.get("country")

        const matchesProject = projectParam ? project?.designation === projectParam : true
        const matchesCity = cityParam ? address?.city === cityParam : true
        const matchesCountry = countryParam ? address?.country === countryParam : true

        return matchesProject && matchesCity && matchesCountry
    })

    return (
        <table className="w-full text-neutral-600 table-fixed shadow border-separate border-spacing-0 rounded-lg bg-white">
            <thead>
                <tr>
                    <th>Name</th>
                    <th className="max-w-0">Coordinates</th>
                    <th className="max-w-0">City</th>
                    <th className="max-w-0">Country</th>
                    <th className="hidden sm:table-cell">Project</th>
                </tr>
            </thead>
            <tbody>
                {filteredFields.map(({ idField, designation, project, address }) => (
                    <tr className="text-sm" key={idField}>
                        <td className="xs:table-cell">
                            <Link href={`/dashboard/position-datas/${idField}`} className="text-blue-600 hover:underline">
                                {designation}
                            </Link>
                        </td>
                        <td>
                            {address?.latitude} <br /> {address?.longitude}
                        </td>
                        <td>{address?.city}</td>
                        <td>{address?.country}</td>
                        <td className="hidden sm:table-cell">{project?.designation}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
