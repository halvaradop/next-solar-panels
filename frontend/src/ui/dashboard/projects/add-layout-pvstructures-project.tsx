"use client"
import { Submit } from "@/ui/common/form/index"
import { ModalWrapper } from "@/ui/common/modal-wrapper"

export const AddPVStructures = () => {
    return (
        <ModalWrapper button="" innerClassName="w-2/3 min-w-80 max-w-screen-sm mb-10">
            <a>Fromulario</a>
            <Submit className="min-h-min" fullWidth>
                Add
            </Submit>
        </ModalWrapper>
    )
}
