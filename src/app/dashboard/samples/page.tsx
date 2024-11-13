import Image from "next/image"
import { Metadata } from "next"
import { Suspense } from "react"
import { auth } from "@/lib/auth"
import { SampleList } from "@/ui/dashboard/samples/sample-list"
import { Filter } from "@/ui/dashboard/filter"
import { getSamplesByUser, getZonesByUser } from "@/lib/services"
import arrowIcon from "@/public/arrow.svg"

export const metadata: Metadata = {
    title: "List of samples",
    description: "List of samples in the dashboard",
}

const DashboardSamplesPage = async () => {
    const session = await auth()
    const userId = Number(session?.user?.id) || Number.MAX_SAFE_INTEGER
    const zones = await getZonesByUser(userId)
    const samples = await getSamplesByUser(userId)

    return (
        <section className="min-h-main py-4 space-y-4">
            <Filter zones={zones} />
            <Suspense fallback={<p>Table...</p>}>
                <SampleList samples={samples} />
            </Suspense>
            <div className="w-full flex items-center justify-between">
                <p className="text-sm">showing {samples.length}</p>
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

export default DashboardSamplesPage
