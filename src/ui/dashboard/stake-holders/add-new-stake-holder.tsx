import { AddStakeHolder } from "./add-stake-holders"
import { ModalWrapper } from "@/ui/common/modal-wrapper"

export const AddNewStakeHolder = () => {
    return (
        <ModalWrapper button="Add New Stakeholder" innerClassName="w-2/3 min-w-80 max-w-screen-sm mb-10">
            <AddStakeHolder className="min-h-min" />
        </ModalWrapper>
    )
}
