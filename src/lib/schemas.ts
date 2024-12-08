import { object, number, string } from "zod"

const range = (min: number, minMessage: string, max: number, maxMessage: string) => {
    return number({ message: "Please fill in the field" }).min(min, { message: minMessage }).max(max, { message: maxMessage })
}

export const PositionSoilDataSchema = object({
    soilType: range(0, "Soil time must be a positive number", 100, "Soil time must be less than 100"),
    soilResistivity: range(0, "Soil resistivity must be a positive number", 10000, "Soil resistivity must be less than 1000"),
    moistureContent: range(0, "Moisture content must be a positive number", 100, "Moisture content must be less than 100"),
    pHValue: range(0, "pH value must be a positive number", 14, "pH value must be less than 50"),
    bufferCapacityPH4_3: range(
        0,
        "Buffer capacity pH4.3 must be a positive number",
        10000,
        "Buffer capacity pH4.3 must be less than 20"
    ),
    bufferCapacityPH7_0: range(
        0,
        "Buffer capacity pH7.0 must be a positive number",
        500,
        "Buffer capacity pH7.0 must be less than 50"
    ),
    sulfurReducingBacteria: range(0, "Sulphate reducing must be a positive number", 50, "Sulphate reducing must be less than 50"),
    sulfateContent: range(0, "Sulphate content must be a positive number", 50, "Sulphate content must be less than 50"),
    neutralSalts: range(0, "Neutral salts must be a positive number", 500, "Neutral salts must be less than 200"),
    undergroundWaterPresence: range(
        -2,
        "Underground water presence must be greater than -2",
        0,
        "Underground water presence must be less than 2"
    ),
    horizontalSoilHomogeneity: range(
        -4,
        "Horizontal soil homogeneity must be greater than -4",
        0,
        "Horizontal soil homogeneity must be less than 4"
    ),
    verticalSoilHomogeneity: range(
        -2,
        "Vertical soil homogeneity must be greater than -2",
        0,
        "Vertical soil homogeneity must be less than 2"
    ),
    soilTypeHomogeneity: range(
        -6,
        "Soil type homogeneity must be greater than -6",
        0,
        "Soil type homogeneity must be less than 6"
    ),
    pHSoilHomogeneity: range(
        0,
        "pH soil homogeneity must be a positive number",
        100,
        "pH soil homogeneity must be less than 100"
    ),
    externalCathodes: range(-1, "Foreign cathodes must be greater than -1", 0, "Foreign cathodes must be less than 1"),

    idContacPerson: string().optional().default(""),
})

export const StakeHolderSchema = object({
    name: string().regex(/^[A-Za-z]+$/, {
        message: "Only letters",
    }),
    email: string(),
    number: string(),
    password: string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message:
            "Your password must contain at least one lowercase letter, one uppercase letter, one number, one special character (e.g., @, $, !, %, *, ?, &), and be at least 8 characters long.",
    }),
    fax: string().regex(/^\+?[0-9]{1,4}[-.\s]?(\(?[0-9]+\)?[-.\s]?)+[0-9]+$/, {
        message: "The fax number you entered is incorrect. Please try again with the correct format (e.g., +1-800-123-4567).",
    }),
    website: string().regex(/^^(https?:\/\/)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})(\/[^\s]*)?$/, {
        message: "Website address is not valid. Please include a proper domain name (e.g., example.com).",
    }),
    contactPerson: string(),
})

export const ContactPersonSchema = object({
    firstName: string(),
    lastName: string(),
    email: string(),
    password: string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message:
            "Your password must contain at least one lowercase letter, one uppercase letter, one number, one special character (e.g., @, $, !, %, *, ?, &), and be at least 8 characters long.",
    }),
    number: string(),
    roleId: string(),

    fax: string().regex(/^\+?[0-9]{1,4}[-.\s]?(\(?[0-9]+\)?[-.\s]?)+[0-9]+$/, {
        message: "The fax number you entered is incorrect. Please try again with the correct format (e.g., +1-800-123-4567).",
    }),
    www: string().regex(/^^(https?:\/\/)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})(\/[^\s]*)?$/, {
        message: "Website address is not valid. Please include a proper domain name (e.g., example.com).",
    }),
})

export const ProjectSchema = object({
    name: string(),
    latitude: string(),
    longitude: string(),
    user: string(),
})

export const FiledSchema = object({
    fence: number()
        .nonnegative()
        .refine((value) => value !== 0, { message: "Latitude must be different than zero" }),
    connectionEarthingFence: number()
        .nonnegative()
        .refine((value) => value !== 0, { message: "Longitude must be different than zero" }),
    externalCurrentInfluence: number()
        .nonnegative()
        .refine((value) => value !== 0, { message: "Latitude must be different than zero" }),
})

export const ProjectOnUserSchema = object({
    plant: string(),
    user: string(),
})

export const AddressSchema = object({
    country: string(),
    state: string(),
    city: string(),
    postbox: string(),
    street: string(),
    number: string(),
})
