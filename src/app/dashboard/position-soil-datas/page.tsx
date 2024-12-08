import { Metadata } from "next"
import { Suspense } from "react"
import { auth } from "@/lib/auth"
import { PositionSoilDatasList } from "@/ui/dashboard/position-soil-datas/sample-list"
import { Filter } from "@/ui/common/filter"
import { getPositionSoilDataByContactPerson, getContactPersonById, getFieldsByStakeHolderId } from "@/lib/services"

export const metadata: Metadata = {
    title: "List of samples",
    description: "List of samples in the dashboard",
}

const getInformation = async () => {
    const session = await auth()
    const userId = session?.user?.id ? session.user.id : Number.MAX_SAFE_INTEGER.toString()
    /*TODO : fix stakeholderid
    const {
        stakeHolderId: [{ stakeHolderId } = { stakeHolderId: "" }],
    } = await getContactPersonById(userId)*/
    const [fields, positionSoilDatas] = await Promise.all([
        getFieldsByStakeHolderId("stakeHolderId"),
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
                        options: fields.map(({ fieldId, state }) => ({ key: state, value: fieldId.toString() })),
                    },
                ]}
            />
            <Suspense fallback={<p>Table...</p>}>
                <PositionSoilDatasList positionSoilDatas={positionSoilDatas} />
            </Suspense>
        </section>
    )
}

export default DashboardSamplesPage
