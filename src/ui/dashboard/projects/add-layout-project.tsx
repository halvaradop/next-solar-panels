"use client"

import { Submit } from "@/ui/common/form-elements"
import { ModalWrapper } from "@/ui/common/modal-wrapper"
import { useState } from "react"
import Link from "next/link"

export const AddLayoutProject = () => {
    const [openDialog, setOpenDialog] = useState<string | null>(null)

    const handleOpenDialog = (dialogName: string) => {
        setOpenDialog(dialogName)
    }

    const handleCloseDialog = () => {
        setOpenDialog(null)
    }
    return (
        <ModalWrapper button="Add Layout Project" innerClassName="w-2/3 min-w-80 max-w-screen-sm mb-10">
            <div className="grid grid-cols-2 gap-4">
                {/* PV Structures */}
                <article
                    className="p-4 flex items-center justify-between font-normal border rounded-lg shadow hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleOpenDialog("pvStructures")}
                >
                    <div>
                        <p className="text-neutral-800 font-medium">PV Structures</p>
                        <p className="mb-2 text-neutral-700">Add</p>
                    </div>
                </article>

                {/* Large Structures */}
                <article
                    className="p-4 flex items-center justify-between font-normal border rounded-lg shadow hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleOpenDialog("largeStructures")}
                >
                    <div>
                        <p className="text-neutral-800 font-medium">Large Structures</p>
                        <p className="mb-2 text-neutral-700">Add</p>
                    </div>
                </article>

                {/* Measuring/Geo-Points */}
                <article
                    className="p-4 flex items-center justify-between font-normal border rounded-lg shadow hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleOpenDialog("geoPoints")}
                >
                    <div>
                        <p className="text-neutral-800 font-medium">Measuring/Geo-Points</p>
                        <p className="mb-2 text-neutral-700">Add</p>
                    </div>
                </article>

                {/* Environmental Parameters */}
                <article
                    className="p-4 flex items-center justify-between font-normal border rounded-lg shadow hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleOpenDialog("environmentalParams")}
                >
                    <div>
                        <p className="text-neutral-800 font-medium">Environmental Parameters</p>
                        <p className="mb-2 text-neutral-700">Add</p>
                    </div>
                </article>
            </div>

            {/* Dialog */}
            {openDialog && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 w-2/3 min-w-80 max-w-screen-sm relative">
                        {/* Close Button */}
                        <button
                            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 font-bold rounded-full w-8 h-8 flex items-center justify-center shadow-md"
                            onClick={handleCloseDialog}
                        >
                            ✖
                        </button>

                        {/* Dialog Content */}
                        <h2 className="text-xl font-bold mb-4 text-center">
                            {openDialog === "pvStructures" && "PV Structures Form"}
                            {openDialog === "largeStructures" && "Large Structures Form"}
                            {openDialog === "geoPoints" && "Measuring/Geo-Points Form"}
                            {openDialog === "environmentalParams" && "Environmental Parameters Form"}
                        </h2>

                        <div>
                            {openDialog === "pvStructures" && (
                                <form className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Structure Name</label>
                                        <input
                                            type="text"
                                            className="mt-1 block w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            placeholder="Enter structure name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Height</label>
                                        <input
                                            type="number"
                                            className="mt-1 block w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            placeholder="Enter height"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Material</label>
                                        <input
                                            type="text"
                                            className="mt-1 block w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            placeholder="Enter material"
                                        />
                                    </div>
                                    <Submit className="w-full mt-4">Submit</Submit>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}
            <br />
        </ModalWrapper>
    )
}
