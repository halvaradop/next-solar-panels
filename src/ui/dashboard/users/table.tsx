import { FilterUserProps } from "@/lib/@types/props"

export const Table = async ({ users }: FilterUserProps) => {
    return (
        <table className="w-full text-neutral-600 table-fixed border border-gray-1000 border-separate border-spacing-0 rounded-lg bg-white">
            <thead>
                <tr>
                    <th className="p-3 text-start font-medium">Id</th>
                    <th className="p-3 text-start font-medium">Name</th>
                    <th className="hidden p-3 text-start font-medium sm:table-cell">Email</th>
                    <th className="p-3 text-start font-medium">Phone</th>
                    <th className="p-3 text-start font-medium">Rol</th>
                </tr>
            </thead>
            <tbody>
                {users.map(({ userId, lastName, firstName, email, roleId }) => (
                    <tr className="text-sm td:text-start td:font-normal" key={userId}>
                        <td className="p-3 truncate border-t overflow-hidden">{userId}</td>
                        <td className="p-3 truncate border-t overflow-hidden">
                            {firstName} {lastName}
                        </td>
                        <td className="hidden p-3 truncate border-t sm:table-cell">{email}</td>
                        <td className="hidden p-3 truncate border-t md:table-cell">321</td>
                        <td className="hidden p-3 truncate border-t md:table-cell">{roleId}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
