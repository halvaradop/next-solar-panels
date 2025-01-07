import { ModalWrapper } from "@/ui/common/modal-wrapper"
import { AddPositionData } from "./add-position-data"

export const AddNewPositionData = () => {
    return (
        <ModalWrapper
            button="Add New Position Data"
            buttonClassName="border-sky-500 bg-sky-500 focus-visible:ring-sky-500"
            innerClassName="w-2/3 min-w-80 max-w-screen-sm mb-10"
        >
            <AddPositionData className="min-h-min" />
        </ModalWrapper>
    )
}
