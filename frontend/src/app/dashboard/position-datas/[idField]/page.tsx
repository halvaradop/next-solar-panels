import { Metadata } from "next"
import { Suspense } from "react"
import { getPositionDatasFieldById, getProjectsById } from "@/lib/services"
import { Params } from "@/lib/@types/types"
import { TablePositionDatas } from "@/ui/dashboard/postion-datas/table-position-datas"
import { AddNewPositionData } from "@/ui/dashboard/postion-datas/add-new-position-datas"

export const metadata: Metadata = {
    title: "Position Datas",
    description: "List of Position Datas",
}

const getInformation = async (idField: string) => {
    const [positionDatas, projects] = await Promise.all([getPositionDatasFieldById(idField), getProjectsById(idField)])
    return { positionDatas, projects }
}

const DashboardPositionDatasPage = async ({ params }: Params<"idField">) => {
    const idField = (await params).idField
    const { positionDatas } = await getInformation(idField)

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
