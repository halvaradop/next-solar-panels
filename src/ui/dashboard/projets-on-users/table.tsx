import { TableProjectOnContactPersonProps } from "@/lib/@types/props"

/**
 * TODO: fix
 */
export const TableProjectsOnUsers = ({ projectsOnUsers }: TableProjectOnContactPersonProps) => {
    return (
        <table className="w-full text-neutral-600 table-fixed border border-gray-1000 border-separate border-spacing-0 rounded-lg bg-white">
            <thead>
                <tr>
                    <th>Project</th>
                    <th className="hidden xs:table-cell">User</th>
                </tr>
            </thead>
            <tbody>
                {projectsOnUsers.map(({ idProject, idContactPerson, designation }) => (
                    <tr className="text-sm" key={`${idContactPerson}-${idProject}`}>
                        <td className="pr-0">{idProject}</td>
                        <td className="hidden xs:table-cell">{idContactPerson}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
