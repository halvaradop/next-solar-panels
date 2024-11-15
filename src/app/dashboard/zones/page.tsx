import Image from "next/image"
import { Suspense } from "react"
import { auth } from "@/lib/auth"
import { Table } from "@/ui/dashboard/zones/table"
import { getPlantsByUser, getZonesPlantsByUser } from "@/lib/services"
import { Filter } from "@/ui/common/filter"
import arrowIcon from "@/public/arrow.svg"

const getInformation = async () => {
    const session = await auth()
    const userId = session?.user?.id ? Number(session.user.id) : Number.MAX_SAFE_INTEGER
    const [zones, plants] = await Promise.all([getZonesPlantsByUser(userId), getPlantsByUser(userId)])
    return { zones, plants }
}

const DashboardZonesPage = async () => {
    const { zones, plants } = await getInformation()

    return (
        <section className="min-h-main py-4 space-y-4">
            <Filter
                filters={[
                    {
                        title: "Plants",
                        options: plants.map(({ plantId, plantName }) => ({ key: plantName, value: plantId.toString() })),
                    },
                ]}
            />
            <Suspense fallback={<p>Table...</p>}>
                <Table zones={zones} />
            </Suspense>
            <div className="w-full flex items-center justify-between">
                <p className="text-sm">showing </p>
                <figure className="h-8 flex items-center border border-gray-1000 rounded-md divide-x">
                    <figure className="px-1 hover:cursor-pointer">
                        <Image className="rotate-90" src={arrowIcon} alt="arrow icon" />
                    </figure>
                    <figure className="px-1 hover:cursor-pointer">
                        <Image className="-rotate-90" src={arrowIcon} alt="arrow icon" />
                    </figure>
                </figure>
            </div>
        </section>
    )
}

export default DashboardZonesPage
