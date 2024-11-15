import Image from "next/image"
import { Metadata } from "next"
import { Suspense } from "react"
import { auth } from "@/lib/auth"
import { SampleList } from "@/ui/dashboard/samples/sample-list"
import { Filter } from "@/ui/common/filter"
import { getSamplesByUser, getZonesByUser } from "@/lib/services"
import arrowIcon from "@/public/arrow.svg"

export const metadata: Metadata = {
    title: "List of samples",
    description: "List of samples in the dashboard",
}

const getInformation = async () => {
    const session = await auth()
    const userId = session?.user?.id ? Number(session.user.id) : Number.MAX_SAFE_INTEGER
    const [zones, samples] = await Promise.all([getZonesByUser(userId), getSamplesByUser(userId)])
    return { zones, samples }
}

const DashboardSamplesPage = async () => {
    const { zones, samples } = await getInformation()

    return (
        <section className="min-h-main py-4 space-y-4">
            <Filter
                filters={[
                    {
                        title: "Zone",
                        options: zones.map(({ zoneId, name }) => ({ key: name, value: zoneId.toString() })),
                    },
                ]}
            />
            <Suspense fallback={<p>Table...</p>}>
                <SampleList samples={samples} />
            </Suspense>
            <div className="w-full flex items-center justify-between">
                <p className="text-sm">showing</p>
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
