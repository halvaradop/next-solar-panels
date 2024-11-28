import { TableProjectOnUserProps } from "@/lib/@types/props"

/**
 * TODO: fix
 */
export const TableProjectsOnUsers = ({ projectsOnUsers }: TableProjectOnUserProps) => {
    return (
        <table className="w-full text-neutral-600 table-fixed border border-gray-1000 border-separate border-spacing-0 rounded-lg bg-white">
            <thead>
                <tr>
                    <th>Project</th>
                    <th className="hidden xs:table-cell">User</th>
                </tr>
            </thead>
            <tbody>
                {projectsOnUsers.map(({ userId, projectId, name }) => (
                    <tr className="text-sm" key={`${userId}-${projectId}`}>
                        <td className="pr-0">{projectId}</td>
                        <td className="hidden xs:table-cell">{name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
