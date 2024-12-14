import {
    getPositionMeasurements,
    getPositionMeasurementsByStakeholderId,
    getPositionMeasurementsByContactPerson,
} from "@/lib/services"
import { CardDashboard } from "./card"
import { Roles } from "@/lib/@types/types"
import { isFalsy } from "@halvaradop/ts-utility-types/validate"
import positionMeasurementIcon from "@/public/samples.svg"

export const PositionMeasurements = async ({ role, id }: { role?: Roles; id?: string }) => {
    const measurements =
        role === "admin" || isFalsy(role)
            ? await getPositionMeasurements()
            : role === "client-admin"
              ? await getPositionMeasurementsByStakeholderId(id!)
              : await getPositionMeasurementsByContactPerson(id!)
    return (
        <CardDashboard
            src={positionMeasurementIcon}
            alt="position measurements"
            title="Position measurements."
            count={measurements.length}
        />
    )
}
