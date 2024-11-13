import Link from "next/link"
import { Button } from "@halvaradop/ui-button"
import { SampleListProps } from "@/lib/@types/props"

export const SampleList = ({ samples }: SampleListProps) => {
    return (
        <section>
            <section className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
                {samples.map(({ sampleId, userId, zoneId, sampleDateTime }) => (
                    <article key={sampleId}>
                        <Link
                            className="p-4 flex items-center justify-between font-normal border rounded-lg shadow hover:cursor-pointer"
                            href={`/dashboard/samples/${sampleId}`}
                        >
                            <div>
                                <div className="flex items-center justify-between gap-x-5 mb-2">
                                    <p className="text-neutral-800 font-medium">User ID: {userId}</p>
                                    <p className="px-4 py-1 text-white text-xs rounded-full bg-green-500">Zone {zoneId}</p>
                                </div>
                                <div className="mb-2 text-neutral-700">
                                    <p>B0: {0}</p>
                                    <p>B1: {1}</p>
                                </div>
                                <p className="text-neutral-600">Date: {new Date(sampleDateTime).toLocaleString()}</p>
                            </div>
                            <Button className="text-green-500 hover:bg-green-500 hover:text-white" variant="ghost">
                                Edit
                            </Button>
                        </Link>
                    </article>
                ))}
            </section>
        </section>
    )
}
