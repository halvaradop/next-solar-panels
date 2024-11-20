import { TableCompaniesProps } from "@/lib/@types/props"

export const TableCompanies = async ({ companies }: TableCompaniesProps) => {
    return (
        <table className="w-full text-neutral-600 table-fixed border border-gray-1000 border-separate border-spacing-0 rounded-lg bg-white">
            <thead>
                <tr>
                    <th className="p-3 text-start font-medium">Id</th>
                    <th className="p-3 text-start font-medium">Name</th>
                    <th className="hidden p-3 text-start font-medium sm:table-cell">Email</th>
                    <th className="p-3 text-start font-medium">Phone</th>
                </tr>
            </thead>
            <tbody>
                {companies.map(({ clientId, name, email, phoneCompanies = [] }) => (
                    <tr className="text-sm td:text-start td:font-normal" key={clientId}>
                        <td className=" p-3 truncate border-t overflow-hidden">{clientId}</td>
                        <td className=" p-3 truncate border-t overflow-hidden">{name}</td>
                        <td className="hidden p-3 truncate border-t sm:table-cell">{email}</td>
                        <td className="hidden p-3 truncate border-t md:table-cell">
                            {phoneCompanies.length > 0 ? phoneCompanies.map((phone, index) => <div key={index}>{0}</div>) : ""}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
