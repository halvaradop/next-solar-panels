import { ModalWrapper } from "@/ui/common/modal-wrapper"
import { AddPositionSoilDatas } from "./add-position-soil-datas"

export const AddNewPositionSoilData = () => {
    return (
        <ModalWrapper button="Add New Position" innerClassName="w-2/3 min-w-80 max-w-screen-sm mb-10">
            <AddPositionSoilDatas className="min-h-min" />
        </ModalWrapper>
    )
}
