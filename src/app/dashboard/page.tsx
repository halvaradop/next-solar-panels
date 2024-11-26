import Image from "next/image"
import Link from "next/link"
import { Metadata } from "next"
import { auth } from "@/lib/auth"
import { getClients, getSamplesByUser, getUserById, getZonesByClientId } from "@/lib/services"
import samplesIcon from "@/public/samples.svg"
import zonesIcon from "@/public/zone.svg"
import clientsIcon from "@/public/clients.svg"
import github from "@/public/github.svg"
import web from "@/public/web.svg"

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dashboard page",
}

const getPanels = async () => {
    const session = await auth()
    const userId = session?.user?.id ? session.user.id : Number.MAX_SAFE_INTEGER.toString()
    const {
        clients: [{ clientId } = { clientId: "" }],
    } = await getUserById(userId)
    const [zones, samples, clients] = await Promise.all([getZonesByClientId(clientId), getSamplesByUser(userId), getClients()])
    return [
        {
            icon: clientsIcon,
            title: "Companies",
            count: clients.length,
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
            <h1 className="text-2xl font-bold text-center">Dashboard</h1>
            <div className="mt-4 mb-6 grid grid-cols-2 gap-4">
                <figure className="p-3 flex items-center justify-center flex-col gap-y-2 border border-gray-200 rounded-lg bg-white hover:shadow-lg transition-shadow duration-300">
                    <Link href="https://github.com/halvaradop/next-solar-panels" target="_blank">
                        <Image width={48} src={github} alt="GitHub icon" />
                    </Link>
                    <figcaption className="text-center text-sm font-medium">GitHub Repository</figcaption>
                </figure>
                <figure className="p-3 flex items-center justify-center flex-col gap-y-2 border border-gray-200 rounded-lg bg-white hover:shadow-lg transition-shadow duration-300">
                    <Link href="http://87.106.32.7/" target="_blank">
                        <Image width={48} src={web} alt="Website icon" />
                    </Link>
                    <figcaption className="text-center text-sm font-medium">Website</figcaption>
                </figure>
            </div>
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
