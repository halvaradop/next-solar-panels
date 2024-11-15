import { FilterComapaniesProps } from "@/lib/@types/props"

export const Table = async ({ companies }: FilterComapaniesProps) => {
    return (
        <table className="w-full text-neutral-600 table-fixed border border-gray-1000 border-separate border-spacing-0 rounded-lg bg-white">
            <thead>
                <tr>
                    <th className=" p-3 text-start font-medium sm:w-[10%]">Id</th>
                    <th className=" p-3 text-start font-medium sm:w-[30%] md:w-[20%]">Name</th>
                    <th className="hidden  p-3 text-start font-medium sm:table-cell base:w-[15%]">Email</th>
                    <th className=" p-3 text-start font-medium sm:w-[15%] md:w-[10%]">Phone</th>
                </tr>
            </thead>
            <tbody>
                {companies.map(({ companyId, companyName, email, phoneCompanies = [] }) => (
                    <tr className="text-sm td:text-start td:font-normal" key={companyId}>
                        <td className=" p-3 whitespace-nowrap text-ellipsis border-t overflow-hidden sm:w-[10%]">{companyId}</td>
                        <td className=" p-3 whitespace-nowrap text-ellipsis border-t overflow-hidden sm:w-[30%]">
                            {companyName}
                        </td>
                        <td className="hidden  p-3 whitespace-nowrap text-ellipsis border-t sm:table-cell">{email}</td>
                        <td className="hidden  p-3 whitespace-nowrap text-ellipsis border-t md:table-cell">
                            {phoneCompanies.length > 0
                                ? phoneCompanies.map((phone, index) => <div key={index}>{phone.phoneNumber}</div>)
                                : ""}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
