import { CardDashboard } from "./card"
import { getStakeholder } from "@/lib/services"
import stakeHolderIcon from "@/public/stakeholders.png"

export const Stakeholders = async () => {
    const stakeholders = await getStakeholder()
    return <CardDashboard src={stakeHolderIcon} alt="stakeholders" title="StakeHolders" count={stakeholders.length} />
}
