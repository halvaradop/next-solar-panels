import { TableCompaniesProps } from "@/lib/@types/props"

export const TableCompanies = async ({ companies }: TableCompaniesProps) => {
    return (
        <table className="w-full text-neutral-600 table-fixed border border-gray-1000 border-separate border-spacing-0 rounded-lg bg-white">
            <thead>
                <tr>
                    <th className="p-3 text-start font-medium">Name</th>
                    <th className="p-3 text-start font-medium">Email</th>
                    <th className="hidden p-3 text-start font-medium md:table-cell">Phone</th>
                </tr>
            </thead>
            <tbody>
                {companies.map(({ clientId, name, email, phoneCompanies = [] }) => (
                    <tr className="text-sm td:text-start td:font-normal" key={clientId}>
                        <td className="p-3 truncate border-t">{name}</td>
                        <td className="p-3 truncate border-t">{email}</td>
                        <td className="hidden p-3 truncate border-t md:table-cell">
                            {phoneCompanies.length > 0
                                ? phoneCompanies.map(({ number }, index) => <div key={index}>{number}</div>)
                                : "No phone number"}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
