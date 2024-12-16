import {
    getPositionResistivities,
    getPositionResistivitiesByStakeholderId,
    getPositionResistivitiesByContactPerson,
} from "@/lib/services"
import { CardDashboard } from "./card"
import { Roles } from "@/lib/@types/types"
import { isFalsy } from "@halvaradop/ts-utility-types/validate"

export const PositionResistivities = async ({ role, id }: { role?: Roles; id?: string }) => {
    const positions =
        role === "admin" || isFalsy(role)
            ? await getPositionResistivities()
            : role === "client-admin"
              ? await getPositionResistivitiesByStakeholderId(id!)
              : await getPositionResistivitiesByContactPerson(id!)
    return <CardDashboard href="/dashboard/position-resistivities" title="Position Resistivities" count={positions.length} />
}
