import { Dispatch, HTMLProps, SetStateAction } from "react"
import { StaticImageData } from "next/image"
import { Zone, Sample, User, Project, Client, Phone } from "@prisma/client"
import { ActionState, Entry } from "./types"
import { ButtonProps, buttonVariants } from "@halvaradop/ui-button"
import { FormProps as FormVariantProps, formVariants } from "@halvaradop/ui-form"

export interface HeaderMenuProps {
    onCloseMenu: () => void
}

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

export interface FilterByProps {
    className?: string
    title: string
    options: Entry[]
}

export interface SampleListProps {
    samples: (Sample & { zone?: { name: string } } & { user?: Pick<User, "firstName" | "lastName"> })[]
}

export interface FilterProps {
    filters: FilterByProps[]
}

export interface TableClientsProps {
    clients: (Omit<Client, "state"> & { phone?: Pick<Phone, "number">[] } & { user?: Pick<User, "firstName" | "lastName"> })[]
}

export interface TableProjectOnUserProps {
    projectsOnUsers: (User & Project)[]
}

export interface TableUsersProps {
    /**
     * TODO: fix
     */
    users: (Omit<User, "state"> & { phones?: Pick<Phone, "number">[] } & { role?: { roleName: string } })[]
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

export interface MenuRoutesProps {
    className?: string
    classTitle?: string
    classOption?: string
}

export type SubmitProps = ButtonProps<typeof buttonVariants> & {
    children: React.ReactNode
    pending?: string
}

export type FormProps = FormVariantProps<typeof formVariants> & {
    action: NonNullable<HTMLProps<HTMLFormElement>["action"]>
}
