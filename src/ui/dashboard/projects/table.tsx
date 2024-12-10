import { TableProjectsProps } from "@/lib/@types/props"

export const TableProjects = async ({ projects }: TableProjectsProps) => {
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
                {projects.map(({ idProject, designation, idContactPerson, idStakeholder }) => (
                    <tr className="text-sm" key={idProject}>
                        <td>{designation}</td>
                        <td>{idContactPerson}</td>
                        <td className="hidden xs:table-cell">{idStakeholder}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
