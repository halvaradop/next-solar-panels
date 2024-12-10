import { getPositionMeasurementsByContactPerson } from "@/lib/services"
import { CardDashboard } from "./card"
import positionMeasurementIcon from "@/public/samples.svg"

export const PositionMeasurements = async ({ contactPersonId }: { contactPersonId: string }) => {
    const positions = await getPositionMeasurementsByContactPerson(contactPersonId)
    return (
        <CardDashboard src={positionMeasurementIcon} alt="position measurement" title="Measurements" count={positions.length} />
    )
}
