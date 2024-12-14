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
import { PickProjectModal } from "@/ui/dashboard/pick-project/pick-project"
import { Params } from "@/lib/@types/types"
import { ModalWrapperRedirect } from "@/ui/dashboard/pick-project/modal"
import { getCookieToken } from "@/lib/services/cookies"

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dashboard page",
}

const DashboardPage = async ({ params, searchParams }: Params<"">) => {
    const session = await auth()
    const {
        data: { idStakeholder },
    } = await getCookieToken()
    if (!session) return null
    const { id, role } = session.user

    return (
        <section className="mt-4 self-start">
            <h1 className="text-2xl font-bold text-center uppercase">Dashboard</h1>
            <ModalWrapperRedirect button="Pick the project">
                <PickProjectModal params={params} searchParams={searchParams} />
            </ModalWrapperRedirect>
            <RenderByRole match={["admin"]} role={role}>
                <Links />
            </RenderByRole>
            <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(100px,200px))] gap-4">
                <RenderByRole match={["admin"]} role={role}>
                    <Stakeholders />
                    <Projects />
                    <ContactPerson />
                    <Fields />
                    <PositionData />
                    <PositionSoilDatas />
                    <PositionMeasurements />
                    <PositionResistivities />
                </RenderByRole>
                <RenderByRole match={["client-admin"]} role={role}>
                    <Projects id={idStakeholder} />
                    <ContactPerson stakeholderId={idStakeholder} />
                    <Fields stakeholderId={idStakeholder} />
                    <PositionData id={idStakeholder} />
                    <PositionSoilDatas id={idStakeholder} role={role} />
                    <PositionMeasurements id={idStakeholder} role={role} />
                    <PositionResistivities id={idStakeholder} role={role} />
                </RenderByRole>
                <RenderByRole match={["client-user"]} role={role}>
                    <Projects id={id} role={role} />
                    <PositionSoilDatas id={id} role={role} />
                    <PositionMeasurements id={id} role={role} />
                    <PositionResistivities id={id} role={role} />
                </RenderByRole>
            </div>
        </section>
    )
}

export default DashboardPage
