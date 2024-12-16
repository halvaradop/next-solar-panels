import { CardDashboard } from "./card"
import { Roles } from "@/lib/@types/types"
import { getPositionSoilDatasByContactPerson, getPositionSoilDatas, getPositionSoilDatasByStakeholderId } from "@/lib/services"
import { isFalsy } from "@halvaradop/ts-utility-types/validate"

export const PositionSoilDatas = async ({ role, id }: { role?: Roles; id?: string }) => {
    const soilDatas =
        role === "admin" || isFalsy(role)
            ? await getPositionSoilDatas()
            : role === "client-admin"
              ? await getPositionSoilDatasByStakeholderId(id!)
              : await getPositionSoilDatasByContactPerson(id!)

    return <CardDashboard href="/dashboard/position-soil-datas" title="Position soil datas" count={soilDatas.length} />
}
