import { Metadata } from "next"
import { Suspense } from "react"
import { getPositionDatasByProjectId } from "@/lib/services"
import { TablePositionDatas } from "@/ui/dashboard/postion-datas/table-position-datas"
import { AddNewPositionData } from "@/ui/dashboard/postion-datas/add-new-position-datas"
import { getCookieToken } from "@/lib/services/cookies"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
    title: "Position Datas",
    description: "List of Position Datas",
}

const getInformation = async () => {
    const { ok, data } = await getCookieToken()
    if (!ok) return redirect("/dashboard")
    return await getPositionDatasByProjectId(data.idProject)
}

const DashboardPositionDatasPage = async () => {
    const positionDatas = await getInformation()
    return (
        <section className="min-h-main py-4 space-y-4">
            <AddNewPositionData />
            <Suspense fallback={<p>Table...</p>}>
                <TablePositionDatas positionDatas={positionDatas} />
            </Suspense>
        </section>
    )
}

export default DashboardPositionDatasPage
