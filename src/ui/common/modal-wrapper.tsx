"use client"
import { useRef } from "react"
import { merge } from "@/lib/utils"
import { ModalWrapperProps } from "@/lib/@types/props"
import { Button, Modal, innerDialogVariants } from "@/ui/common/form/index"

export const ModalWrapper = ({ className, innerClassName, buttonClassName, children, button, close }: ModalWrapperProps) => {
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
            <Button className={buttonClassName} onClick={() => handleToggleModal(true)}>
                {button}
            </Button>
            <Modal className={className} ref={ref}>
                <div
                    className={innerDialogVariants({
                        className: merge("relative", innerClassName),
                    })}
                >
                    <Button className="size-8 absolute top-3 right-3" onClick={() => handleToggleModal(false)}>
                        {close ?? "x"}
                    </Button>
                    {children}
                </div>
            </Modal>
        </>
    )
}
