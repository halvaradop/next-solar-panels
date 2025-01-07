import {
    getPositionMeasurements,
    getPositionMeasurementsByStakeholderId,
    getPositionMeasurementsByContactPerson,
} from "@/lib/services"
import { CardDashboard } from "./card"
import { Roles } from "@/lib/@types/types"
import { isFalsy } from "@halvaradop/ts-utility-types/validate"

export const PositionMeasurements = async ({ role, id }: { role?: Roles; id?: string }) => {
    const measurements =
        role === "admin" || isFalsy(role)
            ? await getPositionMeasurements()
            : role === "client-admin"
              ? await getPositionMeasurementsByStakeholderId(id!)
              : await getPositionMeasurementsByContactPerson(id!)
    return <CardDashboard href="/dashboard/position-measurements" title="Position measurements." count={measurements.length} />
}
