import { ModalWrapper } from "@/ui/common/modal-wrapper"
import { AddContactPerson } from "./add-contact-person"

export const AddNewContactPerson = () => {
    return (
        <ModalWrapper button="Add New Person" innerClassName="w-2/3 min-w-80 max-w-screen-sm">
            <AddContactPerson className="min-h-min" />
        </ModalWrapper>
    )
}
