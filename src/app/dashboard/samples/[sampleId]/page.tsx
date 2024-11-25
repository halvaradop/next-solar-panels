import Link from "next/link"
import { Params } from "@/lib/@types/types"
import { getSampleById } from "@/lib/services/samples"
import { camelCaseToWords } from "@/lib/utils"
import { Button } from "@halvaradop/ui-button"

const SampleByIdPage = async ({ params }: Params<"sampleId">) => {
    const getSample = await getSampleById(parseInt(params.sampleId))
    const { zoneId, date: dateTime, ...spread } = getSample
    const date = new Date(dateTime).toLocaleString()

    return (
        <section className="pt-4 pb-12 self-start grid place-content-center base:pb-0 base:relative">
            <Button className="mb-6 base:absolute base:top-4">
                <Link href="./">Go back</Link>
            </Button>
            <article className="w-full">
                <div className="flex items-center justify-between">
                    <h1 className="text-neutral-700 text-lg font-medium">Sample information</h1>
                    <span className="w-fit px-4 py-1 text-white text-xs rounded-full bg-green-500">Zone {zoneId}</span>
                </div>
                <time className="text-neutral-600" dateTime={date}>
                    Date: {0}
                </time>
                <table className="mt-2 py-4 px-2 border border-separate rounded-lg">
                    <thead>
                        <tr>
                            <th className="p-2">Title</th>
                            <th className="p-2">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(spread).map(([key, value]) => (
                            <tr key={key}>
                                <td className="py-1 px-2 text-neutral-700 font-medium">{camelCaseToWords(key)}</td>
                                <td className="py-1 px-2 text-neutral-600">{value as never}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </article>
        </section>
    )
}

export default SampleByIdPage
