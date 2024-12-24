import { TableStakeHoldersProps } from "@/lib/@types/props"

export const TableStakeHolder = async ({ stakeHolders }: TableStakeHoldersProps) => {
    return (
        <table className="w-full text-neutral-600 table-fixed shadow border-separate border-spacing-0 rounded-lg bg-white">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Web Site</th>
                    <th className="hidden md:table-cell">Phone</th>
                    <th>Contact Person</th>
                </tr>
            </thead>
            <tbody>
                {stakeHolders.map(({ name, email, www, contactPerson,  idStakeHolder, phoneStakeHolder = [] }) => (
                    <tr className="text-sm" key={idStakeHolder}>
                        <td>{name}</td>
                        <td>{email}</td>
                        <td>{www}</td>
                        <td className="hidden md:table-cell">
                            {phoneStakeHolder.length > 0
                                ? phoneStakeHolder.map(({ number }, index) => <div key={index}>{number}</div>)
                                : "No phone number"}
                        </td>
                        <td className="p-3 border-t">
                            {contactPerson?.firstName} {contactPerson?.lastName}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
