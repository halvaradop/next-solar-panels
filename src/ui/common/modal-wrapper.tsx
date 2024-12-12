"use client"
import { useRef, useEffect, useState } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { merge } from "@/lib/utils"
import { Button } from "@halvaradop/ui-button"
import { ModalWrapperProps } from "@/lib/@types/props"
import { getCookieToken } from "@/lib/services/cookies"
import { innerDialogVariants, Modal } from "@halvaradop/ui-dialog"

export const ModalWrapper = ({ className, innerClassName, children, button, close, mandatory = false }: ModalWrapperProps) => {
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
        if (params.get("error") == "You need to select a stakeholder first") {
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
            <Button onClick={() => handleToggleModal(true)}>{button}</Button>
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
