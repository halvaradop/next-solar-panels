import { Metadata } from "next"
import { Suspense } from "react"
import { auth } from "@/lib/auth"
import { TableFields } from "@/ui/dashboard/fields/table"
import { getContactPersonById, getPositionDatasFieldById, getProjectsById } from "@/lib/services"
import { Params } from "@/lib/@types/types"
import { TablePositionDatas } from "@/ui/dashboard/postion-datas/table-position-datas"
import { SessionProvider } from "next-auth/react"
import { AddNewPositionData } from "@/ui/dashboard/postion-datas/add-new-position-datas"

export const metadata: Metadata = {
    title: "Position Datas",
    description: "List of Position Datas",
}

const getInformation = async (idField: string) => {
    const session = await auth()
    const userId = session?.user?.id ? session.user.id : Number.MAX_SAFE_INTEGER.toString()
    console.log("idField")
    console.log(idField)
    const {
        stakeHolder: [{ idStakeHolder } = { idStakeHolder: "" }],
    } = await getContactPersonById(userId)
    const [positionDatas, projects] = await Promise.all([getPositionDatasFieldById(idField), getProjectsById(idField)])
    return { positionDatas, projects }
}

const DashboardPostionDatasPage = async ({ params }: Params<"idField">) => {
    const idField = (await params).idField
    const { positionDatas, projects } = await getInformation(idField)

    return (
        <section className="min-h-main py-4 space-y-4">
            {/* <Filter
                filters={[
                    {
                        title: "Projects",
                        options: projects.map(({ idProject, designation }) => ({
                            key: designation,
                            value: idProject.toString(),
                        })),
                    },
                ]}
            /> */}
            <SessionProvider>
                <AddNewPositionData />
            </SessionProvider>
            <Suspense fallback={<p>Table...</p>}>
                <TablePositionDatas postionDatas={positionDatas} />
            </Suspense>
        </section>
    )
}

export default DashboardPostionDatasPage
