import Image from "next/image"
import { Metadata } from "next"
import { Suspense } from "react"
import { auth } from "@/lib/auth"

import { getPlantsByUser, getZonesPlantsByUser } from "@/lib/services/dashboard"
import arrowIcon from "@/public/arrow.svg"
import { Table } from "@/ui/dashboard/zones/table"
import { Filter } from "@/ui/dashboard/zones/filter"

const DashboardZonesPage = async () => {
    const session = await auth()
    const userId = Number(session?.user?.id) || Number.MAX_SAFE_INTEGER
    const zones = await getZonesPlantsByUser(userId)
    const plants = await getPlantsByUser(userId)

    return (
        <section className="min-h-main py-4 space-y-4">
            <Filter plants={plants} />
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
