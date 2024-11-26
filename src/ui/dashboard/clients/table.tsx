import { TableClientsProps } from "@/lib/@types/props"

export const TableClients = async ({ clients }: TableClientsProps) => {
    return (
        <table className="w-full text-neutral-600 table-fixed border border-gray-1000 border-separate border-spacing-0 rounded-lg bg-white">
            <thead>
                <tr>
                    <th className="p-3 text-start font-medium">Name</th>
                    <th className="p-3 text-start font-medium">Email</th>
                    <th className="p-3 text-start font-medium">Web Site</th>
                    <th className="hidden p-3 text-start font-medium md:table-cell">Phone</th>
                    <th className="p-3 text-start font-medium">User</th>
                </tr>
            </thead>
            <tbody>
                {clients.map(({ clientId, name, email, website, phone = [], user }) => (
                    <tr className="text-sm td:text-start td:font-normal" key={clientId}>
                        <td className="p-3 truncate border-t">{name}</td>
                        <td className="p-3 truncate border-t">{email}</td>
                        <td className="p-3 truncate border-t">{website}</td>
                        <td className="hidden p-3 truncate border-t md:table-cell">
                            {phone.length > 0
                                ? phone.map(({ number }, index) => <div key={index}>{number}</div>)
                                : "No phone number"}
                        </td>
                        <td className="p-3 truncate border-t">
                            {user?.firstName} {user?.lastName}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
