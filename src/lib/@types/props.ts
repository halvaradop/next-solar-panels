import { Dispatch, SetStateAction } from "react"
import { StaticImageData } from "next/image"
import { Zones, Samples, Plants } from "@prisma/client"
import { Entry, MenuState } from "./types"

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
    pathname: string
    menuState: MenuState
    setMenuState: Dispatch<SetStateAction<MenuState>>
}

export interface FilterByProps {
    className?: string
    title: string
    options: Entry[]
}

export interface SampleListProps {
    samples: Samples[]
}

export interface FilterProps {
    zones: Zones[]
}

export interface FilterPropsPlants {
    plants: Plants[]
}
export interface SelectProps {
    className?: string
    classNameOption?: string
    name: string
    values: Entry[]
}
