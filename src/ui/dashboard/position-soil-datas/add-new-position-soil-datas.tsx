import { ModalWrapper } from "@/ui/common/modal-wrapper"
import { AddPositionSoilDatas } from "./add-position-soil-datas"

export const AddNewPositionSoilData = () => {
    return (
        <ModalWrapper
            button="Add New Position"
            buttonClassName="border-sky-500 bg-sky-500 focus-visible:ring-sky-500"
            innerClassName="w-2/3 min-w-80 max-w-screen-sm mb-10"
        >
            <AddPositionSoilDatas className="min-h-min" />
        </ModalWrapper>
    )
}
