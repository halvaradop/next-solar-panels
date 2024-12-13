import Link from "next/link"
import { compiledSampleProps } from "@/lib/@types/props"

export const TableCompiledSamples = async ({ data }: compiledSampleProps) => {
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
        <table style={{ border: "1px solid black", width: "100%", borderCollapse: "collapse" }}>
            <thead>
                <tr>
                    <th style={{ border: "1px solid black", padding: "8px" }}>Results</th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>
                        B<sub>0</sub>
                    </th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>
                        B<sub>1</sub>
                    </th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>Soil Class</th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>Loss rate Zn [µm/y]</th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>Loss rate Steel [µm/y]</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style={{ border: "1px solid black", padding: "8px" }}>Max</td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>{data.valueb0Max}</td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>{data.valueb1Max}</td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>{getSoilClass(data.valueb0Max)}</td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>{data.valueMaxGalvanising}</td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>{data.valueMaxSteel}</td>
                </tr>
                <tr>
                    <td style={{ border: "1px solid black", padding: "8px" }}>Min</td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>{data.valueb0Min}</td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>{data.valueb1Min}</td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>{getSoilClass(data.valueb0Min)}</td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>{data.valueMinGalvanising}</td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>{data.valueMinSteel}</td>
                </tr>
                <tr>
                    <td style={{ border: "1px solid black", padding: "8px" }}>Avg.</td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>does not apply</td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>does not apply</td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>does not apply</td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                        {calculateAverage(data.valueMaxGalvanising, data.valueMinGalvanising)}
                    </td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                        {calculateAverage(data.valueMaxSteel, data.valueMinSteel)}
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
