import Image from "next/image"
import Link from "next/link"
import { Metadata } from "next"
import { auth } from "@/lib/auth"
import {
    ContactPerson,
    Fields,
    PositionData,
    Projects,
    PositionSoilDatas,
    RenderByRole,
    Stakeholders,
    PositionMeasurements,
    PositionResistivities,
} from "@/ui/dashboard/index"
import screenshotWeb from "@/public/screenshot-web.png"
import screenshotRepo from "@/public/screenshot-repo.png"
import { Button } from "@halvaradop/ui-button"

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dashboard page",
}

const DashboardPage = async () => {
    const session = await auth()
    if (!session) return null

    return (
        <section className="mt-4 self-start">
            <h1 className="text-2xl font-bold text-center uppercase">Dashboard</h1>
            {session?.user.role == "admin" && (
                <div className="mt-4 mb-2 grid grid-cols-2 gap-4">
                    <figure className="group relative rounded-md overflow-hidden">
                        <Link
                            className="flex items-center justify-center flex-col gap-y-2 bg-black"
                            href="https://github.com/halvaradop/next-solar-panels"
                            target="_blank"
                        >
                            <Image
                                className="w-full h-full aspect-video opacity-70 transition-transform group-hover:scale-[1.1]"
                                src={screenshotRepo}
                                alt="screenshot of the github repository"
                            />
                            <figcaption className="text-white text-lg font-bold text-center absolute bottom-5">
                                GitHub Repository
                            </figcaption>
                        </Link>
                    </figure>
                    <figure className="group relative rounded-md overflow-hidden">
                        <Link
                            className="flex items-center justify-center flex-col gap-y-2 bg-black"
                            href="http://87.106.32.7/"
                            target="_blank"
                        >
                            <Image
                                className="w-full h-full aspect-video opacity-70 transition-transform group-hover:scale-[1.1]"
                                src={screenshotWeb}
                                alt="screenshot of the website"
                            />
                            <figcaption className="text-white text-lg font-bold text-center absolute bottom-5">
                                Website
                            </figcaption>
                        </Link>
                    </figure>
                </div>
            )}
            <Button className="mt-6" asChild>
                <Link href="/pick-your-project">Pick the project</Link>
            </Button>
            <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(100px,200px))] gap-4">
                <RenderByRole match={["admin"]} role={session.user.role}>
                    <Stakeholders />
                    <Projects />
                    <ContactPerson />
                    <Fields />
                    <PositionSoilDatas role={session.user.role} />
                </RenderByRole>
                <RenderByRole match={["client-admin"]} role={session.user.role}>
                    <Projects />
                    <ContactPerson />
                    <Fields />
                    <PositionData stakeholderId="?" />
                    <PositionSoilDatas role={session.user.role} />
                </RenderByRole>
                <RenderByRole match={["client-user"]} role={session.user.role}>
                    <PositionSoilDatas contactPersonId={session.user.id!} />
                    <PositionMeasurements contactPersonId="??" />
                    <PositionResistivities contactPersonId="??" />
                </RenderByRole>
            </div>
        </section>
    )
}

export default DashboardPage
