import { Zone } from "@prisma/client"
import { SampleZone } from "@/lib/@types/types"

export const getSamples = async (userId: number): Promise<SampleZone[]> => {
    const response = await fetch("http://localhost:3000/api/dashboards/samples", {
        method: "POST",
        body: JSON.stringify({ userId }),
    })
    const json = await response.json()
    return json.data
}

export const getZones = async (userId: number): Promise<Zone[]> => {
    const response = await fetch("http://localhost:3000/api/dashboards/zones", {
        method: "POST",
        body: JSON.stringify({ userId }),
    })
    const json = await response.json()
    return json.data
}
