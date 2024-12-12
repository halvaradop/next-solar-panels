"use client"
import { useRef } from "react"
import { Button } from "@halvaradop/ui-button"
import { Modal, innerDialogVariants } from "@halvaradop/ui-dialog"
import { AddProject } from "./add-project"

export const AddNewProject = () => {
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
            <Button onClick={() => handleToggleModal(true)}>Add New Project</Button>
            <Modal ref={ref}>
                <div className={innerDialogVariants({ className: "mb-10 relative", size: "sm", variant: "base" })}>
                    <Button className="size-8 absolute top-3 right-3" onClick={() => handleToggleModal(false)}>
                        x
                    </Button>
                    <h2 className="mt-12 mb-4 text-xl font-bold">Adds New Project</h2>
                    <AddProject className="min-h-min" />
                </div>
            </Modal>
        </>
    )
}
