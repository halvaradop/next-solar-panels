import { Zone } from "@prisma/client"
import { ResponseAPI, SampleZone } from "@/lib/@types/types"

export const getSamplesByUser = async (userId: number): Promise<SampleZone[]> => {
    const response = await fetch("http://localhost:3000/api/dashboards/samples", {
        method: "POST",
        body: JSON.stringify({ userId }),
    })
    const json: ResponseAPI<SampleZone[]> = await response.json()
    return json.data
}

export const getZonesByUser = async (userId: number): Promise<Zone[]> => {
    const response = await fetch("http://localhost:3000/api/dashboards/zones", {
        method: "POST",
        body: JSON.stringify({ userId }),
    })
    const json: ResponseAPI<Zone[]> = await response.json()
    return json.data
}

export const getZones = async (): Promise<Zone[]> => {
    const response = await fetch("http://localhost:3000/api/dashboards/zones")
    const json: ResponseAPI<Zone[]> = await response.json()
    return json.data
}
