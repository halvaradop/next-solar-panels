import Link from "next/link"
import { Metadata } from "next"
import { Params } from "@/lib/@types/types"
import { getSampleById } from "@/lib/services/samples"
import { camelCaseToWords, evalutionGrosor, sampleCalcs } from "@/lib/utils"
import { Button } from "@halvaradop/ui-button"
import { isObject } from "@halvaradop/ts-utility-types/validate"

export const generateMetadata = async ({ params }: Params<"sampleId">): Promise<Metadata> => {
    const slug = (await params).sampleId
    return {
        description: `Sample ${slug} information`,
    }
}

const SampleByIdPage = async ({ params }: Params<"sampleId">) => {
    const slug = (await params).sampleId
    console.log(slug)
    const getSample = await getSampleById(slug)
    console.log(getSample)
    const pdfGnerate = evalutionGrosor(getSample)
    console.log(pdfGnerate)

    const {
        zoneId,
        sampleId,
        userId,
        date: dateTime,
        zone: { name },
        ...spread
    } = getSample
    const date = new Date(dateTime).toLocaleString()

    return (
        <section className="pt-4 pb-12 self-start grid place-content-center base:pb-0 base:relative">
            <Button className="mb-6 base:absolute base:top-4">
                <Link href="./">Go back</Link>
            </Button>
            <article className="w-full">
                <div className="flex items-center justify-between">
                    <h1 className="text-neutral-700 text-lg font-medium">Sample information</h1>
                    <span className="w-fit px-4 py-1 text-white text-xs rounded-full bg-green-500">{name}</span>
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
                        {Object.entries(spread)
                            .filter((entry) => !isObject(entry[1]))
                            .map(([key, value]) => (
                                <tr key={key}>
                                    <td className="py-1 px-2 text-neutral-700 font-medium">{camelCaseToWords(key)}</td>
                                    <td className="py-1 px-2 text-neutral-600">{value}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </article>
        </section>
    )
}

export default SampleByIdPage
