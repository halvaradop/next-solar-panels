import { object, number, string } from "zod"

const range = (min: number, minMessage: string, max: number, maxMessage: string) => {
    return number({ message: "Please fill in the field" }).min(min, { message: minMessage }).max(max, { message: maxMessage })
}

export const PositionSoilDataSchema = object({
    z1: range(0, "Soil time must be a positive number", 100, "Soil time must be less than 100"),
    z2: range(0, "Soil resistivity must be a positive number", 10000, "Soil resistivity must be less than 1000"),
    z3: range(0, "Moisture content must be a positive number", 100, "Moisture content must be less than 100"),
    z4: range(0, "pH value must be a positive number", 14, "pH value must be less than 50"),
    z5: range(0, "Buffer capacity pH4.3 must be a positive number", 10000, "Buffer capacity pH4.3 must be less than 20"),
    z6: range(0, "Buffer capacity pH7.0 must be a positive number", 500, "Buffer capacity pH7.0 must be less than 50"),
    z7: range(0, "Sulphate reducing must be a positive number", 50, "Sulphate reducing must be less than 50"),
    z8: range(0, "Sulphate content must be a positive number", 50, "Sulphate content must be less than 50"),
    z9: range(0, "Neutral salts must be a positive number", 500, "Neutral salts must be less than 200"),
    z10: range(-2, "Underground water presence must be greater than -2", 0, "Underground water presence must be less than 2"),
    z11: range(-4, "Horizontal soil homogeneity must be greater than -4", 0, "Horizontal soil homogeneity must be less than 4"),
    z12: range(-2, "Vertical soil homogeneity must be greater than -2", 0, "Vertical soil homogeneity must be less than 2"),
    z13: range(-6, "Soil type homogeneity must be greater than -6", 0, "Soil type homogeneity must be less than 6"),
    z14: range(0, "pH soil homogeneity must be a positive number", 100, "pH soil homogeneity must be less than 100"),
    z15: range(-1, "Foreign cathodes must be greater than -1", 0, "Foreign cathodes must be less than 1"),
    chlorides: range(0, "Sulphate content must be a positive number", 50, "Sulphate content must be less than 50"),
    idContacPerson: string().optional().default(""),
})

export const StakeHolderSchema = object({
    name: string().regex(/^[A-Za-z]+$/, {
        message: "Only letters",
    }),
    industry: string().regex(/^[A-Za-z]+$/, {
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
    idRole: string(),

    fax: string().regex(/^\+?[0-9]{1,4}[-.\s]?(\(?[0-9]+\)?[-.\s]?)+[0-9]+$/, {
        message: "The fax number you entered is incorrect. Please try again with the correct format (e.g., +1-800-123-4567).",
    }),
    website: string().regex(/^^(https?:\/\/)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})(\/[^\s]*)?$/, {
        message: "Website address is not valid. Please include a proper domain name (e.g., example.com).",
    }),
})
export const AddressSchema = object({
    country: string(),
    state: string(),
    city: string(),
    postbox: string(),
    street: string(),
    number: string(),
    latitude: number()
        .nonnegative()
        .refine((value) => value !== 0, { message: "Latitude must be different than zero" }),
    longitude: number()
        .nonnegative()
        .refine((value) => value !== 0, { message: "Latitude must be different than zero" }),
})

export const ProjectSchema = object({
    name: string(),
    contactPerson: string(),
    idStakeholder: string(),
    country: string(),
    state: string(),
    city: string(),
    postbox: string(),
    street: string(),
    number: string(),
    latitude: number()
        .nonnegative()
        .refine((value) => value !== 0, { message: "Latitude must be different than zero" }),
    longitude: number()
        .nonnegative()
        .refine((value) => value !== 0, { message: "Latitude must be different than zero" }),
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
