import { object, number, enum as enums } from "zod"

const range = (min: number, minMessage: string, max: number, maxMessage: string) => {
    return number({ message: "Please fill in the field" }).min(min, { message: minMessage }).max(max, { message: maxMessage })
}

export const SampleSchema = object({
    soilTime: range(0, "Soil time must be a positive number", 100, "Soil time must be less than 100"),
    soilResistivity: range(0, "Soil resistivity must be a positive number", 1000, "Soil resistivity must be less than 1000"),
    pHValue: range(0, "pH value must be a positive number", 50, "pH value must be less than 50"),
    bufferCapacityPH4_3: range(
        0,
        "Buffer capacity pH4.3 must be a positive number",
        20,
        "Buffer capacity pH4.3 must be less than 20"
    ),
    bufferCapacityPH7_0: range(
        0,
        "Buffer capacity pH7.0 must be a positive number",
        50,
        "Buffer capacity pH7.0 must be less than 50"
    ),
    sulfurReducingBacteria: range(0, "Sulphate reducing must be a positive number", 50, "Sulphate reducing must be less than 50"),
    sulfateContent: range(0, "Sulphate content must be a positive number", 50, "Sulphate content must be less than 50"),
    neutralSalts: range(0, "Neutral salts must be a positive number", 200, "Neutral salts must be less than 200"),
    undergroundWaterPresence: enums(["never", "constant", "intermittent"]),
    horizontalSoilHomogeneity: range(0, "Horizontal soil must be a positive number", 10, "Horizontal soild must be less than 10"),
    verticalSoilHomogeneity: range(0, "Vertical soil must be a positive number", 10, "Vertical soild must be less than 10"),
    soilTypeHomogeneity: enums(["homogeneous", "heterogeneous"]),
    pHSoilHomogeneity: range(0, "Soil homogeneity must be a positive number", 10, "Soild homogeneity must be less than 10"),
    externalCathodes: range(-1, "Foreign cathodes must be greater than -1", 1, "Foreign cathodes must be less than 1"),
    zoneId: range(0, "", 0, ""),
})

export const ZoneSchema = z.object({
    latitude: z.string(),
    longitude: z.string(),
    name: z.string(),
    plant: z.string(),
})
