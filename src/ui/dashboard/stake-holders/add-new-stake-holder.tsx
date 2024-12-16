import { AddStakeHolder } from "./add-stake-holders"
import { ModalWrapper } from "@/ui/common/modal-wrapper"

export const AddNewStakeHolder = () => {
    return (
        <ModalWrapper
            button="Add New Stakeholder"
            buttonClassName="border-sky-500 bg-sky-500 focus-visible:ring-sky-500"
            innerClassName="w-2/3 min-w-80 max-w-screen-sm mb-10"
        >
            <AddStakeHolder className="min-h-min" />
        </ModalWrapper>
    )
}
