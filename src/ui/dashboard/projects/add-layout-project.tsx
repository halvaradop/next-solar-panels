"use client"

import { Submit } from "@/ui/common/form-elements"
import { ModalWrapper } from "@/ui/common/modal-wrapper"
import { useState } from "react"
import Link from "next/link"

export const AddLayoutProject = () => {
    return (
        <ModalWrapper button="Add Layout Project" innerClassName="w-2/3 min-w-80 max-w-screen-sm mb-10">
            <div className="grid grid-cols-2 gap-4">
                <article className="p-4 flex items-center justify-between font-normal border rounded-lg shadow hover:cursor-pointer">
                    <Link href={`/dashboard/`}>
                        <div>
                            <div className="flex items-center justify-between gap-x-5 mb-2">
                                <p className="text-neutral-800 font-medium">PV Structures</p>
                            </div>
                            <div className="mb-2 text-neutral-700">
                                <p>Add</p>
                            </div>
                        </div>
                    </Link>
                </article>
                <article className="p-4 flex items-center justify-between font-normal border rounded-lg shadow hover:cursor-pointer">
                    <Link href={`/dashboard/`}>
                        <div>
                            <div className="flex items-center justify-between gap-x-5 mb-2">
                                <p className="text-neutral-800 font-medium">Large Structures</p>
                            </div>
                            <div className="mb-2 text-neutral-700">
                                <p>Add</p>
                            </div>
                        </div>
                    </Link>
                </article>
                <article className="p-4 flex items-center justify-between font-normal border rounded-lg shadow hover:cursor-pointer">
                    <Link href={`/dashboard/`}>
                        <div>
                            <div className="flex items-center justify-between gap-x-5 mb-2">
                                <p className="text-neutral-800 font-medium">Measuring/geo-points</p>
                            </div>
                            <div className="mb-2 text-neutral-700">
                                <p>Add</p>
                            </div>
                        </div>
                    </Link>
                </article>
                <article className="p-4 flex items-center justify-between font-normal border rounded-lg shadow hover:cursor-pointer">
                    <Link href={`/dashboard/`}>
                        <div>
                            <div className="flex items-center justify-between gap-x-5 mb-2">
                                <p className="text-neutral-800 font-medium">Environmental Parameters</p>
                            </div>
                            <div className="mb-2 text-neutral-700">
                                <p>Add</p>
                            </div>
                        </div>
                    </Link>
                </article>
            </div>
            <br></br>
            <Submit className="min-h-min" fullWidth>
                Add
            </Submit>
        </ModalWrapper>
    )
}
