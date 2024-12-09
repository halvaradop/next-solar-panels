import { TableContactPeopleProps } from "@/lib/@types/props"

export const TableContactPeople = async ({ contactPeople }: TableContactPeopleProps) => {
    return (
        <table className="w-full text-neutral-600 table-fixed border border-gray-1000 border-separate border-spacing-0 rounded-lg bg-white">
            <thead>
                <tr>
                    <th>Name</th>
                    <th className="sm:table-cell">Email</th>
                    <th className="hidden base:table-cell">Phone</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
                {contactPeople.map(({ idContactPerson, lastName, firstName, email, role, phones = [] }) => (
                    <tr className="text-sm" key={idContactPerson}>
                        <td>
                            {firstName} {lastName}
                        </td>
                        <td className=" sm:table-cell">{email}</td>
                        <td className="hidden base:table-cell">
                            {phones.length > 0
                                ? phones.map(({ number }, index) => <div key={index}>{number}</div>)
                                : "No phone number"}
                        </td>
                        <td>{role?.roleName}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
