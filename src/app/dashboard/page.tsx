import Image from "next/image"
import { Suspense } from "react"
import { prisma } from "@/prisma"
import { auth } from "@/lib/auth"
import { Table } from "@/ui/dashboard/table"
import { Filter } from "@/ui/dashboard/filter"
import samplesIcon from "@/public/samples.svg"
import zonesIcon from "@/public/zone.svg"
import arrowIcon from "@/public/arrow.svg"

const Dashboard = async () => {
    const session = await auth()
    const zones = await prisma.zone.findMany()
    const samples = await prisma.sample.findMany({
        where: {
            Zone: {
                Plant: {
                    Employee: {
                        id: Number(session?.user?.id) || Number.MAX_SAFE_INTEGER,
                    },
                },
            },
        },
        include: {
            Zone: true,
        },
    })
    const samplesFiltered = samples.filter(({ Zone: { id } }) => true)

    return (
        <Suspense>
            <section className="w-11/12 mx-auto min-h-main py-4 space-y-4 base:w-full">
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
                <Filter zones={zones} />
                <Table samples={samplesFiltered} />
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
        </Suspense>
    )
}

export default Dashboard
