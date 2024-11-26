import { TableProjectOnUserProps } from "@/lib/@types/props"

/**
 * TODO: fix
 */
export const TableProjectsOnUsers = ({ projectsOnUsers }: TableProjectOnUserProps) => {
    return (
        <table className="w-full text-neutral-600 table-fixed border border-gray-1000 border-separate border-spacing-0 rounded-lg bg-white">
            <thead>
                <tr>
                    <th className="py-3 pl-3">Project</th>
                    <th className="hidden p-3 xs:table-cell">User</th>
                </tr>
            </thead>
            <tbody>
                {projectsOnUsers.map(({ userId, projectId, name }) => (
                    <tr className="text-sm td:text-start td:font-normal" key={`${userId}-${projectId}`}>
                        <td className="p-3 pr-0 border-t">{projectId}</td>
                        <td className="hidden p-3 border-t xs:table-cell">{name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
