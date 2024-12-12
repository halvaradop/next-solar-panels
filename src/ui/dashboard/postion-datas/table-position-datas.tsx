"use client"
import { useSearchParams } from "next/navigation"
import { TablePositionDatasProps } from "@/lib/@types/props"
import Link from "next/link"

export const TablePositionDatas = ({ postionDatas }: TablePositionDatasProps) => {
    const params = useSearchParams()

    const filteredFields = postionDatas.filter(({ idPositionData }) => {
        const field = params.get("field")
        return field ? field === idPositionData.toString() : true
    })

    return (
        <table className="w-full text-neutral-600 table-fixed border border-gray-1000 border-separate border-spacing-0 rounded-lg bg-white">
            <thead>
                <tr>
                    <th>Field Name</th>
                    <th className="max-w-0">Coordinates</th>
                    <th className="max-w-0">Point Type</th>
                    <th className="hidden sm:table-cell">Pile Designation</th>
                    <th className="hidden sm:table-cell">Ponit Designation</th>
                </tr>
            </thead>
            <tbody>
                {filteredFields.map(
                    ({ latitude, longitude, pileDesignation, pointType, pointDesignation, field, idPositionData }) => (
                        <tr className="text-sm" key={idPositionData}>
                            <td className="xs:table-cell">
                                {" "}
                                <Link href={`/dashboard/position-soil-datas/`} className="text-blue-600 hover:underline">
                                    {field?.designation}
                                </Link>
                            </td>
                            <td>
                                {latitude} <br /> {longitude}
                            </td>
                            <td>{pointType}</td>
                            <td className="hidden sm:table-cell">{pointDesignation}</td>
                            <td className="hidden sm:table-cell">{pileDesignation}</td>
                        </tr>
                    )
                )}
            </tbody>
        </table>
    )
}
