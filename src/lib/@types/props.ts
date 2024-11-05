import { StaticImageData } from "next/image"
import { AddPropertyToObject } from "@halvaradop/ts-utility-types"
import { Sample, Zone } from "@prisma/client"
import { Entry } from "./types"

export interface ProductProps {
    className?: string
    id: string
    title: string
    subtitle: string
    description: string
    src: string | StaticImageData
    alt: string
    isRight?: boolean
}

export interface ProjectProps {
    className?: string
    title: string
    city: string
    year: string
}

export interface HeaderMenuProps {
    isMatchMedia: boolean
}

export interface FilterByProps {
    className?: string
    title: string
    options: Entry[]
}

export interface TableProps {
    samples: AddPropertyToObject<Sample, "Zone", Zone>[]
}

export interface FilterProps {
    zones: Zone[]
}
