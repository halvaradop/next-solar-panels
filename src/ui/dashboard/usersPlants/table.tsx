import { TableUserPlantsProps } from "@/lib/@types/props"

export const TableUserPlants = ({ userPlants }: TableUserPlantsProps) => {
    return (
        <table className="w-full text-neutral-600 table-fixed border border-gray-1000 border-separate border-spacing-0 rounded-lg bg-white">
            <thead>
                <tr>
                    <th className="py-3 pl-3">Plant</th>
                    <th className="hidden p-3 xs:table-cell">User</th>
                </tr>
            </thead>
            <tbody>
                {userPlants.map(({ userId, plantId, plant, user }) => (
                    <tr className="text-sm td:text-start td:font-normal" key={`${userId}-${plantId}`}>
                        <td className="p-3 pr-0 border-t">{plant?.name}</td>
                        <td className="hidden p-3 border-t xs:table-cell">
                            {user?.firstName} {user?.lastName}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
