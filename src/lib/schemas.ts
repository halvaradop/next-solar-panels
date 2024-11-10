import { z } from "zod"

export const SampleSchema = z.object({
    material: z.string().regex(/^[a-zA-Z\s]*$/, "Please enter only letters"),
    corrosion: z.string().regex(/^[0-9]+$/),
    temperature: z.string().regex(/^[0-9]+$/),
    humidity: z.string().regex(/^[0-9]+$/),
    zone: z.string(),
})

export const ZoneSchema = z.object({
    latitude: z.string(),
    longitude: z.string(),
    name: z.string(),
    plant: z.string(),
})
