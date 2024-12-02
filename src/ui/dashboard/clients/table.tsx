import { TableClientsProps } from "@/lib/@types/props"

export const TableClients = async ({ clients }: TableClientsProps) => {
    return (
        <table className="w-full text-neutral-600 table-fixed border border-gray-1000 border-separate border-spacing-0 rounded-lg bg-white">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Web Site</th>
                    <th className="hidden md:table-cell">Phone</th>
                    <th>User</th>
                </tr>
            </thead>
            <tbody>
                {clients.map(({ clientId, name, email, website, phone = [], user }) => (
                    <tr className="text-sm" key={clientId}>
                        <td>{name}</td>
                        <td>{email}</td>
                        <td>{website}</td>
                        <td className="hidden md:table-cell">
                            {phone.length > 0
                                ? phone.map(({ number }, index) => <div key={index}>{number}</div>)
                                : "No phone number"}
                        </td>
                        <td className="p-3 border-t">
                            {user?.firstName} {user?.lastName}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
