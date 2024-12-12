"use client"
import { useRef } from "react"
import { Button } from "@halvaradop/ui-button"
import { Modal, innerDialogVariants } from "@halvaradop/ui-dialog"
import { AddField } from "./add-fields"

export const AddNewField = () => {
    const ref = useRef<HTMLDialogElement>(null)

    const handleToggleModal = (isOpen: boolean): void => {
        if (isOpen) {
            ref.current?.showModal()
        } else {
            ref.current?.close()
        }
    }

    return (
        <>
            <Button onClick={() => handleToggleModal(true)}>Add New Field</Button>
            <Modal className="w-2/3 min-w-80 max-w-screen-sm" ref={ref}>
                <div className={innerDialogVariants({ className: "w-full mb-10 relative", size: "sm", variant: "base" })}>
                    <Button className="size-8 absolute top-3 right-3" onClick={() => handleToggleModal(false)}>
                        x
                    </Button>
                    <h2 className="mt-12 mb-4 text-xl font-bold">Adds New Field</h2>
                    <AddField className="min-h-min" />
                </div>
            </Modal>
        </>
    )
}
