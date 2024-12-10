import { TableProjectsProps } from "@/lib/@types/props"
import Link from "next/link"

export const TableProjects = async ({ projects }: TableProjectsProps) => {
    return (
        <table className="w-full text-neutral-600 table-fixed border border-gray-1000 border-separate border-spacing-0 rounded-lg bg-white">
            <thead>
                <tr>
                    <th>Project Name</th>
                    <th>Coordinates </th>
                    <th>Country</th>
                    <th>City</th>
                    <th> Contact Person</th>
                </tr>
            </thead>
            <tbody>
                {/*todo fix*/}
                {projects.map(({ idProject, designation, contactPerson, address }) => (
                    <tr className="text-sm" key={idProject}>
                        <td>
                            {" "}
                            <Link href="/dashboard/fields" className="text-blue-600 hover:underline">
                                {designation}
                            </Link>{" "}
                        </td>
                        <td>
                            {address?.latitude} <br /> {address?.longitude}
                        </td>
                        <td>{address?.country}</td>
                        <td>{address?.city}</td>
                        <td>
                            {contactPerson?.firstName} {contactPerson?.firstName}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
