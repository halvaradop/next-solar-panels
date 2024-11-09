import { StaticImageData } from "next/image"
import { Zones, Samples } from "@prisma/client"
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
    pathname: string
}

export interface FilterByProps {
    className?: string
    title: string
    options: Entry[]
}

export interface TableProps {
    samples: Samples[]
}

export interface FilterProps {
    zones: Zones[]
}
