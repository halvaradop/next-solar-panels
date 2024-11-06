import Image from "next/image"
import { Metadata } from "next"
import { auth } from "@/lib/auth"
import { getSamplesByUser, getZonesByUser } from "@/lib/services/dashboard"
import samplesIcon from "@/public/samples.svg"
import zonesIcon from "@/public/zone.svg"

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dashboard page",
}

const DashboardPage = async () => {
    const session = await auth()
    const userId = Number(session?.user?.id) || Number.MAX_SAFE_INTEGER
    const zones = await getZonesByUser(userId)
    const samples = await getSamplesByUser(userId)

    return (
        <section className="mt-4 self-start">
            <div className="flex items-center gap-x-4">
                <figure className="p-3 flex items-center justify-evenly gap-x-4 border border-gray-1000 rounded-lg bg-white hover:cursor-pointer">
                    <Image src={samplesIcon} alt="Samples icon" />
                    <figcaption className="flex flex-col">
                        <h2>Samples</h2>
                        <p>{samples.length}</p>
                    </figcaption>
                </figure>
                <figure className="p-3 flex items-center justify-evenly gap-x-4 border border-gray-1000 rounded-lg bg-white hover:cursor-pointer">
                    <Image src={zonesIcon} alt="Zones icon" />
                    <figcaption className="flex flex-col">
                        <h2>Zones</h2>
                        <p>{zones.length}</p>
                    </figcaption>
                </figure>
            </div>
        </section>
    )
}

export default DashboardPage
