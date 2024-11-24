import { Dispatch, SetStateAction } from "react"
import { StaticImageData } from "next/image"
import { Zone, Sample, User, Project, Client, Phone } from "@prisma/client"
import { ActionState, Entry, MenuState } from "./types"

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
    samples: Sample[]
}

export interface FilterProps {
    filters: FilterByProps[]
}

export interface TableCompaniesProps {
    companies: (Omit<Client, "state"> & { phoneCompanies?: Pick<Phone, "number">[] })[]
}

export interface TableUserPlantsProps {
    userPlants: {
        userId: number
        plantId: number
        plant?: Project
        user?: Pick<User, "firstName" | "lastName">
    }[]
}

export interface TableUsersProps {
    /**
     * TODO: fix
     */
    users: (Omit<User, "state"> & { phoneUsers?: Pick<Phone, "number">[] } & { role?: { roleName: string } })[]
}

export interface TablePlantsProps {
    plants: Project[]
}

export interface SelectGenericProps<T extends Record<string, unknown>, K = keyof T> {
    className?: string
    classNameOption?: string
    name: string
    id: K
    value: K
    values: T[]
}

export interface SelectProps {
    className?: string
    classNameOption?: string
    name: string
    values: Entry[]
}

export interface TableZonesProps {
    zones: (Zone & { project?: Pick<Project, "name"> })[]
}

export interface InputListProps<T> {
    state: ActionState<T>
    inputs: {
        label: string
        name: string
        type: string
    }[]
}
