import { Params } from "@/lib/@types/types"
import { getSamplesById } from "@/lib/services/dashboard"

/**
 * TODO: Improve the UI of this page
 */
const SampleByIdPage = async ({ params }: Params<"sampleId">) => {
    const getSample = await getSamplesById(parseInt(params.sampleId))

    return (
        <div className="self-start mt-4 grid place-content-center">
            <div className="space-y-1">
                {Object.entries(getSample).map(([key, value]) => (
                    <p>
                        <span className="text-neutral-700 font-medium">{key}: </span>
                        <span className="text-neutral-600">{value as never}</span>
                    </p>
                ))}
            </div>
        </div>
    )
}

export default SampleByIdPage
