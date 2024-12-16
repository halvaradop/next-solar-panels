import { AddProject } from "./add-project"
import { ModalWrapper } from "@/ui/common/modal-wrapper"

export const AddNewProject = () => {
    return (
        <ModalWrapper
            button="Add New Project"
            buttonClassName="border-sky-500 bg-sky-500 focus-visible:ring-sky-500"
            innerClassName="w-2/3 min-w-80 max-w-screen-sm mb-10"
        >
            <AddProject className="min-h-min" />
        </ModalWrapper>
    )
}
