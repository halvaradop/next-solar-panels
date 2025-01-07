import { CardDashboard } from "./card"
import { getPositionDataByStakeholderId, getPositionDatas } from "@/lib/services"

export const PositionData = async ({ id }: { id?: string }) => {
    const positions = id ? await getPositionDataByStakeholderId(id) : await getPositionDatas()
    return <CardDashboard href="/dashboard/position-datas" title="Position datas" count={positions.length} />
}
