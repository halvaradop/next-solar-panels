import Image from "next/image"
import Link from "next/link"
import { Metadata } from "next"
import { auth } from "@/lib/auth"
import {
    getStakeHolder,
    getPositionSoilDataByContactPerson,
    getContactPersonById,
    getFieldsByStakeHolderId,
    getContactaPeople,
    getProjects,
    getContactPersonOnProjects,
} from "@/lib/services"
import { roleBasedAccessControl } from "@/middleware"
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
        projects: [{ idStakeholder }],
    } = await getContactPersonById(userId)
    const [field, positionSoilDatas, stakeHolders, contactPeople, projects, usersOnProjects] = await Promise.all([
        getFieldsByStakeHolderId(idStakeholder),
        getPositionSoilDataByContactPerson(userId),
        getStakeHolder(),
        getContactaPeople(),
        getProjects(),
        getContactPersonOnProjects(),
    ])
    return {
        session,
        panels: [
            {
                icon: clientsIcon,
                title: "Clients",
                count: stakeHolders.length,
            },
            {
                icon: samplesIcon,
                title: "Projects",
                count: projects.length,
            },
            {
                icon: clientsIcon,
                title: "Users",
                count: contactPeople.length,
            },
            {
                icon: clientsIcon,
                title: "Users On Projects",
                count: usersOnProjects.length,
            },
            {
                icon: samplesIcon,
                title: "Samples",
                count: positionSoilDatas.length,
            },
            {
                icon: zonesIcon,
                title: "Zones",
                count: field.length,
            },
        ],
    }
}

const DashboardPage = async () => {
    const { session, panels } = await getPanels()
    if (!session) return null

    return (
        <section className="mt-4 self-start">
            <h1 className="text-2xl font-bold text-center">Dashboard</h1>
            {session?.user.role == "client-admin" && (
                <div className="mt-4 mb-2 grid grid-cols-2 gap-4">
                    <figure className="p-3 border border-gray-200 rounded-lg bg-white hover:shadow-md transition-shadow duration-300">
                        <Link
                            className="flex items-center justify-center flex-col gap-y-2"
                            href="https://github.com/halvaradop/next-solar-panels"
                            target="_blank"
                        >
                            <Image width={48} src={github} alt="GitHub icon" />
                            <figcaption className="text-center text-sm font-medium">GitHub Repository</figcaption>
                        </Link>
                    </figure>
                    <figure className="p-3 border border-gray-200 rounded-lg bg-white hover:shadow-md transition-shadow duration-300">
                        <Link
                            className="flex items-center justify-center flex-col gap-y-2"
                            href="http://87.106.32.7/"
                            target="_blank"
                        >
                            <Image width={48} src={web} alt="Website icon" />
                            <figcaption className="text-center text-sm font-medium">Website</figcaption>
                        </Link>
                    </figure>
                </div>
            )}
            <div className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(100px,200px))] gap-4">
                {panels.map(({ icon, title, count }) => {
                    const rbca = roleBasedAccessControl["client-admin"]
                    if (!rbca.includes(title.toLowerCase())) return null
                    return (
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
                    )
                })}
            </div>
        </section>
    )
}

export default DashboardPage
