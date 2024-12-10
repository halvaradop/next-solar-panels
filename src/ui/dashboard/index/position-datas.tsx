import positionDataIcon from "@/public/fields.svg"
import { CardDashboard } from "./card"
import { getPositionDataByStakeholderId } from "@/lib/services"

export const PositionData = async ({ stakeholderId }: { stakeholderId: string }) => {
    const positions = await getPositionDataByStakeholderId(stakeholderId)
    return <CardDashboard src={positionDataIcon} alt="position data" title="Position data" count={positions.length} />
}
