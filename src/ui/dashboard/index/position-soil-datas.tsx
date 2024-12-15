import { CardDashboard } from "./card"
import { Roles } from "@/lib/@types/types"
import { getPositionSoilDatasByContactPerson, getPositionSoilDatas, getPositionSoilDatasByStakeholderId } from "@/lib/services"
import { isFalsy } from "@halvaradop/ts-utility-types/validate"
import soilData from "@/public/soil-data.png"

export const PositionSoilDatas = async ({ role, id }: { role?: Roles; id?: string }) => {
    const soilDatas =
        role === "admin" || isFalsy(role)
            ? await getPositionSoilDatas()
            : role === "client-admin"
              ? await getPositionSoilDatasByStakeholderId(id!)
              : await getPositionSoilDatasByContactPerson(id!)

    return <CardDashboard src={soilData} alt="position soil data" title="Position soil datas" count={soilDatas.length} />
}
