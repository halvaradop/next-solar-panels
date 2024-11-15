import { Dispatch, SetStateAction } from "react"
import { StaticImageData } from "next/image"
import { Zones, Samples, Users, Plants, Companies, PhoneUsers, PhoneCompanies } from "@prisma/client"
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
    filters: FilterByProps[]
}

export interface TableCompaniesProps {
    companies: (Omit<Companies, "state"> & { phoneCompanies?: Pick<PhoneCompanies, "phoneNumber">[] })[]
}

export interface TableUserPlantsProps {
    userPlants: {
        userId: number
        plantId: number
        plant?: Pick<Plants, "plantName">
        user?: Pick<Users, "firstName" | "lastName">
    }[]
}

export interface TableUsersProps {
    users: (Omit<Users, "state"> & { phoneUsers?: Pick<PhoneUsers, "phoneNumber">[] } & { role?: { roleName: string } })[]
}

export interface TablePlantsProps {
    plants: Plants[]
}
export interface SelectProps {
    className?: string
    classNameOption?: string
    name: string
    values: Entry[]
}
export interface TableZonesProps {
    zones: (Zones & { plant?: Pick<Plants, "plantName"> })[]
}
