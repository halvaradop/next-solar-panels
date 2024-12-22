import { CompiledSampleProps } from "@/lib/@types/props"

export const TableCompiledSamples = async ({ data }: CompiledSampleProps) => {
    const calculateAverage = (max: number, min: number): number => {
        return (max + min) / 2
    }
    const getSoilClass = (b0: number): string => {
        if (b0 >= 0) return "Ia"
        if (b0 >= -4) return "Ib"
        if (b0 >= -10) return "II"
        return "III"
    }
    return (
        <table className="border border-black w-full border-collapse">
            <thead>
                <tr>
                    <th className="border border-black p-2">Results</th>
                    <th className="border border-black p-2">
                        B<sub>0</sub>
                    </th>
                    <th className="border border-black p-2">
                        B<sub>1</sub>
                    </th>
                    <th className="border border-black p-2">Soil Class</th>
                    <th className="border border-black p-2">Loss rate Zn [µm/y]</th>
                    <th className="border border-black p-2">Loss rate Steel [µm/y]</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="border border-black p-2">Max</td>
                    <td className="border border-black p-2">{data.valueb0Max}</td>
                    <td className="border border-black p-2">{data.valueb1Max}</td>
                    <td className="border border-black p-2">{getSoilClass(data.valueb0Max)}</td>
                    <td className="border border-black p-2">{data.valueMaxGalvanising}</td>
                    <td className="border border-black p-2">{data.valueMaxSteel}</td>
                </tr>
                <tr>
                    <td className="border border-black p-2">Min</td>
                    <td className="border border-black p-2">{data.valueb0Min}</td>
                    <td className="border border-black p-2">{data.valueb1Min}</td>
                    <td className="border border-black p-2">{getSoilClass(data.valueb0Min)}</td>
                    <td className="border border-black p-2">{data.valueMinGalvanising}</td>
                    <td className="border border-black p-2">{data.valueMinSteel}</td>
                </tr>
                <tr>
                    <td className="border border-black p-2">Avg.</td>
                    <td className="border border-black p-2">does not apply</td>
                    <td className="border border-black p-2">does not apply</td>
                    <td className="border border-black p-2">does not apply</td>
                    <td className="border border-black p-2">
                        {calculateAverage(data.valueMaxGalvanising, data.valueMinGalvanising)}
                    </td>
                    <td className="border border-black p-2">{calculateAverage(data.valueMaxSteel, data.valueMinSteel)}</td>
                </tr>
            </tbody>
        </table>
    )
}
