import { CardDashboard } from "./card"
import { getStakeholder } from "@/lib/services"

export const Stakeholders = async () => {
    const stakeholders = await getStakeholder()
    return <CardDashboard href="/dashboard/stake-holders" title="StakeHolders" count={stakeholders.length} />
}
