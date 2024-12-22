"use client"
import { useRef, useEffect, useState } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { merge } from "@/lib/utils"
import { ModalWrapperProps } from "@/lib/@types/props"
import { getCookieToken } from "@/lib/services/cookies"
import { Button, Modal, innerDialogVariants } from "@/ui/common/form/index"

export const ModalWrapperRedirect = ({
    className,
    innerClassName,
    buttonClassName,
    children,
    button,
    close,
    mandatory = false,
    error,
}: ModalWrapperProps) => {
    const router = useRouter()
    const pathname = usePathname()
    const params = useSearchParams()
    const ref = useRef<HTMLDialogElement>(null)
    const [isMandatory, setIsMandatory] = useState(mandatory)

    const handleToggleModal = (isOpen: boolean): void => {
        if (isOpen) {
            ref.current?.showModal()
        } else {
            ref.current?.close()
            router.push(pathname)
        }
    }

    useEffect(() => {
        if (params.get("error") == "You need to select a stakeholder first" || error) {
            setIsMandatory(true)
            handleToggleModal(true)
        }
        const fetchToken = async () => {
            const { ok } = await getCookieToken()
            if (ok) {
                handleToggleModal(false)
            }
        }
        fetchToken()
    }, [])

    return (
        <>
            <Button className={buttonClassName} onClick={() => handleToggleModal(true)}>
                {button}
            </Button>
            <Modal className={className} ref={ref}>
                <div
                    className={innerDialogVariants({
                        className: merge("w-11/12 relative lg:w-10/12 xl:max-w-screen-xl", innerClassName),
                    })}
                >
                    {!isMandatory && (
                        <Button className="size-8 absolute top-3 right-3" onClick={() => handleToggleModal(false)}>
                            {close ?? "x"}
                        </Button>
                    )}
                    {children}
                </div>
            </Modal>
        </>
    )
}
