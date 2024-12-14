"use client"
import { useRef } from "react"
import { merge } from "@/lib/utils"
import { Button } from "@halvaradop/ui-button"
import { ModalWrapperProps } from "@/lib/@types/props"
import { innerDialogVariants, Modal } from "@halvaradop/ui-dialog"

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
                <div
                    className={innerDialogVariants({
                        className: merge("w-11/12 relative lg:w-10/12 xl:max-w-screen-xl", innerClassName),
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
