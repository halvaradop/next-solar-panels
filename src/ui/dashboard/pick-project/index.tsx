import { ModalWrapper } from "@/ui/common/modal-wrapper"
import { PickProjectModal } from "./pick-project"

export const PickYourProject = () => {
    return (
        <ModalWrapper button="Pick the project">
            <PickProjectModal />
        </ModalWrapper>
    )
}
