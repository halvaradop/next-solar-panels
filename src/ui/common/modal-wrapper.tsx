"use client"
import { useRef } from "react"
import { Button } from "@halvaradop/ui-button"
import { innerDialogVariants, Modal } from "@halvaradop/ui-dialog"
import { ModalWrapperProps } from "@/lib/@types/props"
import { merge } from "@/lib/utils"

export const ModalWrapper = ({ className, innerClassName, children, button, close }: ModalWrapperProps) => {
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
            <Button onClick={() => handleToggleModal(true)}>{button}</Button>
            <Modal className={className} ref={ref}>
                <div className={innerDialogVariants({ className: merge("relative", innerClassName) })}>
                    <Button className="size-8 absolute top-3 right-3" onClick={() => handleToggleModal(false)}>
                        {close ?? "x"}
                    </Button>
                    {children}
                </div>
            </Modal>
        </>
    )
}
