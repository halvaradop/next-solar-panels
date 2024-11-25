"use client"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { SampleListProps } from "@/lib/@types/props"

/**
 * TODO: update userId to display the name of the user logged in and update
 * zoneId to display the name of the zone
 */
export const SampleList = ({ samples }: SampleListProps) => {
    const params = useSearchParams()

    const filteredSamples = samples.filter(({ zoneId }) => {
        const zone = params.get("zone")
        return zone ? zone === zoneId.toString() : true
    })

    return (
        <section>
            <section className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(300px,500px))]">
                {filteredSamples.map(({ sampleId, date, zone, user }) => (
                    <article key={sampleId}>
                        <Link
                            className="p-4 flex items-center justify-between font-normal border rounded-lg shadow hover:cursor-pointer"
                            href={`/dashboard/samples/${sampleId}`}
                        >
                            <div>
                                <div className="flex items-center justify-between gap-x-5 mb-2">
                                    <p className="text-neutral-800 font-medium">
                                        User: {user?.firstName} {user?.lastName}
                                    </p>
                                    <p className="px-4 py-1 text-white text-xs rounded-full bg-green-500">Zone: {zone?.name}</p>
                                </div>
                                <div className="mb-2 text-neutral-700">
                                    <p>B0: {0}</p>
                                    <p>B1: {1}</p>
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
