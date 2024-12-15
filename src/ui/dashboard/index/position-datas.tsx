import { CardDashboard } from "./card"
import { getPositionDataByStakeholderId, getPositionDatas } from "@/lib/services"
import positionDataIcon from "@/public/fields.svg"

export const PositionData = async ({ id }: { id?: string }) => {
    const positions = id ? await getPositionDataByStakeholderId(id) : await getPositionDatas()
    return <CardDashboard src={positionDataIcon} alt="position data" title="Position data" count={positions.length} />
}
