import { twMerge } from "tw-merge"
import clsx, { ClassValue } from "clsx"

export const merge = (...classes: ClassValue[]) => {
    return twMerge(clsx(classes.filter(Boolean)))
}
