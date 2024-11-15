import { Dispatch, SetStateAction } from "react"
import { StaticImageData } from "next/image"
import { Zones, Samples, Companies, Users, Plants } from "@prisma/client"
import { Entry, MenuState, Params } from "./types"
import { Decimal } from "@prisma/client/runtime/library"

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
    filters: FilterByProps[]
}

export interface FilterComapaniesProps {
    companies: {
        companyId: number
        companyName: string
        email: string
        phoneCompanies?: { phoneNumber: string }[]
    }[]
}
export interface FilterUserPlantsProps {
    userPlants: {
        userId: number
        plantId: number
        plant?: { plantName: string }
        user?: { firstName: string; lastName: string }
    }[]
}

export interface FilterUserProps {
    users: Users[]
}

export interface FilterPlantsProps {
    plants: Plants[]
}
export interface SelectProps {
    className?: string
    classNameOption?: string
    name: string
    values: Entry[]
}
export interface TableZonesPropsp {
    zones: {
        zoneId: number
        plantId: number
        latitude: Decimal
        longitude: Decimal
        name: string
        state: string
        plant?: { plantName: string }
    }[]
}
export interface TableZonesProps {
    zones: Zones[]
}
