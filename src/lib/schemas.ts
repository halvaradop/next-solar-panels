import { z } from "zod"

export const SampleSchema = z.object({
    material: z.string().regex(/^[a-zA-Z\s]*$/, "Please enter only letters"),
    corrosion: z
        .string({
            message: "Corrosion must be a number",
        })
        .regex(/^[0-9]+$/),
    temperature: z
        .string({
            message: "Temperature must be a number",
        })
        .regex(/^[0-9]+$/),
    humidity: z
        .string({
            message: "Humidity must be a number",
        })
        .regex(/^[0-9]+$/),
    zone: z.string(),
})
