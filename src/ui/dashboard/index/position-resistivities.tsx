import { getPositionResistiviesByContactPerson } from "@/lib/services"
import { CardDashboard } from "./card"
import positionMeasurementIcon from "@/public/samples.svg"

export const PositionResistivities = async ({ contactPersonId }: { contactPersonId: string }) => {
    const positions = await getPositionResistiviesByContactPerson(contactPersonId)
    return (
        <CardDashboard
            src={positionMeasurementIcon}
            alt="position resistivity"
            title="Position Resistivities"
            count={positions.length}
        />
    )
}
