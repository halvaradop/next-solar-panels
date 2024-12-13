"use client"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { PositionSoilDatasProps } from "@/lib/@types/props"

export const PositionSoilDatasList = ({ positionSoilDatas }: PositionSoilDatasProps) => {
    const params = useSearchParams()
    /*
    TODO FIX : FILTER IS NOT TO idContactPerson TO FIELDID
    */
    const filteredPositionSoilData = positionSoilDatas.filter(({ idContactPerson }) => {
        const field = params.get("field")
        return field ? field === idContactPerson.toString() : true
    })

    return (
        <section>
            <section className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
                {filteredPositionSoilData.map(({ idPositionSoilData, contactPerson, date, b0, b1 }) => (
                    <article className="max-w-md" key={idPositionSoilData}>
                        <Link
                            className="p-4 flex items-center justify-between font-normal border rounded-lg shadow hover:cursor-pointer"
                            href={`/dashboard/samples/${idPositionSoilData}`}
                        >
                            <div>
                                <div className="flex items-center justify-between gap-x-5 mb-2">
                                    <p className="text-neutral-800 font-medium">
                                        Contact Person: {contactPerson?.firstName} {contactPerson?.lastName}
                                    </p>
                                    <p className="px-4 py-1 text-white text-xs rounded-full bg-green-500"></p>
                                </div>
                                <div className="mb-2 text-neutral-700">
                                    <p>B0: {b0}</p>
                                    <p>B1: {b1}</p>
                                </div>
                                <p className="text-neutral-600">Date: {new Date(date).toLocaleString()}</p>
                            </div>
                        </Link>
                    </article>
                ))}
            </section>
        </section>
    )
}
