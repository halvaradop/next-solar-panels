import Image from "next/image"
import { Metadata } from "next"
import { auth } from "@/lib/auth"
import { getCompanies, getSamplesByUser, getZonesByUser } from "@/lib/services"
import samplesIcon from "@/public/samples.svg"
import zonesIcon from "@/public/zone.svg"
import clientsIcon from "@/public/clients.svg"

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dashboard page",
}

const getPanels = async () => {
    const session = await auth()
    const userId = session?.user?.id ? Number(session.user.id) : Number.MAX_SAFE_INTEGER
    const [zones, samples, companies] = await Promise.all([getZonesByUser(userId), getSamplesByUser(userId), getCompanies()])
    return [
        {
            icon: clientsIcon,
            title: "Companies",
            count: companies.length,
        },
        {
            icon: samplesIcon,
            title: "Samples",
            count: samples.length,
        },
        {
            icon: zonesIcon,
            title: "Zones",
            count: zones.length,
        },
    ]
}

const DashboardPage = async () => {
    const panels = await getPanels()
    return (
        <section className="mt-4 self-start">
            <div className="flex items-center gap-x-4">
                {panels.map(({ icon, title, count }) => (
                    <figure
                        className="p-3 flex items-center justify-evenly gap-x-4 border border-gray-1000 rounded-lg bg-white hover:cursor-pointer"
                        key={title}
                    >
                        <Image src={icon} alt="Samples icon" />
                        <figcaption className="flex flex-col">
                            <h2>{title}</h2>
                            <p>{count}</p>
                        </figcaption>
                    </figure>
                ))}
            </div>
        </section>
    )
}

export default DashboardPage
