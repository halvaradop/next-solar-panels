import { Metadata } from "next"
import { Suspense } from "react"
import { auth } from "@/lib/auth"
import { PositionSoilDatasList } from "@/ui/dashboard/position-soil-datas/sample-list"
import { Filter } from "@/ui/common/filter"
import { getPositionSoilDataByContactPerson, getContactPersonById, getFieldsByStakeHolderId } from "@/lib/services"
import { SessionProvider } from "next-auth/react"
import { AddNewPositionSoilData } from "@/ui/dashboard/position-soil-datas/add-new-position-soil-datas"

export const metadata: Metadata = {
    title: "List of samples",
    description: "List of samples in the dashboard",
}

const getInformation = async () => {
    const session = await auth()
    const userId = session?.user?.id ? session.user.id : Number.MAX_SAFE_INTEGER.toString()

    const {
        stakeHolder: [{ idStakeHolder } = { idStakeHolder: "" }],
    } = await getContactPersonById(userId)
    const [fields, positionSoilDatas] = await Promise.all([
        getFieldsByStakeHolderId(idStakeHolder),
        getPositionSoilDataByContactPerson(userId.toString()),
    ])
    return { fields, positionSoilDatas }
}

const DashboardSamplesPage = async () => {
    const { fields, positionSoilDatas } = await getInformation()
    return (
        <section className="min-h-main py-4 space-y-4">
            <Filter
                filters={[
                    {
                        title: "Zone",
                        options: fields.map(({ idField, state }) => ({ key: state, value: idField.toString() })),
                    },
                ]}
            />
            <SessionProvider>
                <AddNewPositionSoilData />
            </SessionProvider>
            <Suspense fallback={<p>Table...</p>}>
                <PositionSoilDatasList positionSoilDatas={positionSoilDatas} />
            </Suspense>
        </section>
    )
}

export default DashboardSamplesPage
