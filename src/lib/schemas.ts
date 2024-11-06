import { z } from "zod"

export const SampleSchema = z.object({
    material: z.string().regex(/^[a-zA-Z\s]*$/, "Please enter only letters"),
    corrosion: z.string().regex(/^[0-9]+$/),
    temperature: z.string().regex(/^[0-9]+$/),
    humidity: z.string().regex(/^[0-9]+$/),
    zone: z.string(),
})
