import { ModalWrapperRedirect } from "./modal-redirect"
import { PickProjectModal } from "./pick-project"
import { ErrorPickProjectProps } from "@/lib/@types/props"

export const ErrorPickProject = async ({ ok, params, searchParams }: ErrorPickProjectProps) => {
    return (
        <section className="mt-4 self-start">
            <ModalWrapperRedirect button="Pick the project" error={ok}>
                <PickProjectModal params={params} searchParams={searchParams} />
            </ModalWrapperRedirect>
        </section>
    )
}
