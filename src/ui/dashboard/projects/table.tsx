import { TableProjectsProps } from "@/lib/@types/props"

export const TableProjects = async ({ project }: TableProjectsProps) => {
    return (
        <table className="w-full text-neutral-600 table-fixed border border-gray-1000 border-separate border-spacing-0 rounded-lg bg-white">
            <thead>
                <tr>
                    <th className="p-3 text-start font-medium">Project Name</th>
                    <th className="hidden w-[20%] p-3 text-start font-medium xs:table-cell">Latitude</th>
                    <th className="p-3 text-start font-medium">Longitude</th>
                </tr>
            </thead>
            <tbody>
                {project.map(({ projectId, name, latitude, longitude }) => (
                    <tr className="text-sm td:text-start td:font-normal" key={projectId}>
                        <td className="p-3 truncate border-t">{name}</td>
                        <td className="p-3 truncate border-t">{latitude.toString()}</td>
                        <td className="hidden p-3 truncate border-t xs:table-cell">{longitude.toString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
