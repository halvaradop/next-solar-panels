import { CardDashboard } from "./card"
import { Roles } from "@/lib/@types/types"
import { getPositionSoilDataByContactPerson, getPositionSoilDatas } from "@/lib/services"
import soilData from "@/public/soil-data.png"

export const PositionSoilDatas = async ({ role, contactPersonId }: { role?: Roles; contactPersonId?: string }) => {
    const soilDatas =
        role === "admin"
            ? await getPositionSoilDatas()
            : role === "client-user"
              ? []
              : await getPositionSoilDataByContactPerson(contactPersonId!)

    return <CardDashboard src={soilData} alt="position soil data" title="Soil datas" count={soilDatas.length} />
}
