import { TableUsersProps } from "@/lib/@types/props"

export const TableUsers = async ({ users }: TableUsersProps) => {
    return (
        <table className="w-full text-neutral-600 table-fixed border border-gray-1000 border-separate border-spacing-0 rounded-lg bg-white">
            <thead>
                <tr>
                    <th className="p-3 text-start font-medium">Name</th>
                    <th className="p-3 text-start font-medium sm:table-cell">Email</th>
                    <th className="hidden p-3 text-start font-medium base:table-cell">Phone</th>
                    <th className="p-3 text-start font-medium">Role</th>
                </tr>
            </thead>
            <tbody>
                {users.map(({ userId, lastName, firstName, email, role, phoneUsers = [] }) => (
                    <tr className="text-sm td:text-start td:font-normal" key={userId}>
                        <td className="p-3 truncate border-t overflow-hidden">
                            {firstName} {lastName}
                        </td>
                        <td className="p-3 truncate border-t sm:table-cell">{email}</td>
                        <td className="hidden p-3 truncate border-t base:table-cell">
                            {phoneUsers.length > 0
                                ? phoneUsers.map(({ number }, index) => <div key={index}>{number}</div>)
                                : "No phone number"}
                        </td>
                        <td className="p-3 truncate border-t">{role?.roleName}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
