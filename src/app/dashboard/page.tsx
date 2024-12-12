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
    Links,
} from "@/ui/dashboard/index"
import { PickYourProject } from "@/ui/dashboard/pick-project"

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
            <PickYourProject />
            <RenderByRole match={["admin"]} role={session.user.role}>
                <Links />
            </RenderByRole>
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
