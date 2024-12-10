import { HTMLProps } from "react"
import { StaticImageData } from "next/image"
import { Project, StakeHolder, ContactPerson, PhoneContactPerson, Field, PositionSoilData, Address } from "@prisma/client"
import { ActionState, Entry, Order, Roles } from "./types"
import { ButtonProps, buttonVariants } from "@halvaradop/ui-button"
import { FormProps as FormVariantProps, formVariants } from "@halvaradop/ui-form"
import { Session } from "next-auth"

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

export interface PositionSoilDatasProps {
    positionSoilDatas: (PositionSoilData & {
        contactPerson?: Pick<ContactPerson, "firstName" | "lastName">
    })[]
}

export interface FilterProps {
    filters: FilterByProps[]
}

export interface TableStakeHoldersProps {
    stakeHolders: (Omit<StakeHolder, "state"> & { contactPerson?: Pick<ContactPerson, "firstName" | "lastName" | "email"> } & {
        phone?: Pick<PhoneContactPerson, "number">[]
    })[]
}

export interface TableProjectOnContactPersonProps {
    projectsOnUsers: (ContactPerson & Project)[]
}

export interface TableContactPeopleProps {
    /**
     * TODO: fix
     */
    contactPeople: (Omit<ContactPerson, "state"> & { phones?: Pick<PhoneContactPerson, "number">[] } & {
        role?: { name: string }
    })[]
}

export interface TableProjectsProps {
    projects: (Project & { contactPerson?: Pick<ContactPerson, "firstName" | "lastName" | "email"> } & {
        stakeholder?: Pick<StakeHolder, "name">
    } & { address?: Pick<Address, "country" | "city" | "latitude" | "longitude"> })[]
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

export interface TableFieldsProps {
    fields: (Field & { project?: Pick<Project, "designation" | "idProject"> })[]
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
    session: Session | null
}

export type SubmitProps = ButtonProps<typeof buttonVariants> & {
    children: React.ReactNode
    pending?: string
}

export type FormProps = FormVariantProps<typeof formVariants> & {
    action: NonNullable<HTMLProps<HTMLFormElement>["action"]>
}

export interface MyDocumentProps {
    positionSoilData: Order
}

export interface CardDashboardProps {
    src: string | StaticImageData
    alt?: string
    title: string
    count: number
    isHover?: boolean
}

export interface RenderByRoleProps {
    role: Roles
    match: Roles[]
    children?: React.ReactNode
}

export interface PickYourProjectProps {
    contactPersonId: string
    idProject: string
    designation: string
}

export interface AddProjectProps {
    className?: string
}

export interface AddPositionSoilDataProps {
    className?: string
}

export interface AddContactPersonProps {
    className?: string
}

export interface AddFieldsProps {
    className?: string
}

export interface AddStakeHoldersProps {
    className?: string
}
