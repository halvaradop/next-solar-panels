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
import { ModalWrapperRedirect } from "@/ui/dashboard/pick-project/modal-redirect"
import { getCookieToken } from "@/lib/services/cookies"
import { ErrorPickProject } from "@/ui/dashboard/pick-project/error-pick-project"

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dashboard page",
}

const DashboardPage = async ({ params, searchParams }: Params<"">) => {
    const session = await auth()
    const { data, ok } = await getCookieToken()
    if (!ok) {
        return <ErrorPickProject ok={true} params={params} searchParams={searchParams} />
    }

    if (!session) return null
    const { id, role } = session.user
    const { idStakeHolder } = data

    return (
        <section className="mt-4 mb-10 self-start">
            <h1 className="text-3xl font-medium text-center">Overview</h1>
            <RenderByRole match={["admin"]} role={role}>
                <Links />
            </RenderByRole>
            <ModalWrapperRedirect
                buttonClassName="mt-10 border-sky-500 bg-sky-500 focus-visible:ring-sky-500"
                button="Pick the project"
            >
                <PickProjectModal params={params} searchParams={searchParams} />
            </ModalWrapperRedirect>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                    <Projects id={idStakeHolder} />
                    <ContactPerson stakeholderId={idStakeHolder} />
                    <Fields stakeholderId={idStakeHolder} />
                    <PositionData id={idStakeHolder} />
                    <PositionSoilDatas id={idStakeHolder} role={role} />
                    <PositionMeasurements id={idStakeHolder} role={role} />
                    <PositionResistivities id={idStakeHolder} role={role} />
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
