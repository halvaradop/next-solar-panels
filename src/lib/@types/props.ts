import React, { HTMLProps } from "react"
import { StaticImageData } from "next/image"
import {
    Project,
    StakeHolder,
    ContactPerson,
    PhoneContactPerson,
    Field,
    PositionSoilData,
    Address,
    PositionData,
    CookieToken,
} from "@prisma/client"
import { ActionState, Entry, Order, Params, ResponseAPI, Roles } from "./types"
import { FormProps as FormVariantProps, formVariants } from "@halvaradop/ui-form"
import { Session } from "next-auth"

export interface HeaderMenuProps extends ClassNameProps {
    onCloseMenu: () => void
}

export interface ProductProps extends ClassNameProps {
    id: string
    title: string
    subtitle: string
    description: string
    src: string | StaticImageData
    alt: string
    isRight?: boolean
}

export interface ProjectProps extends ClassNameProps {
    title: string
    city: string
    year: string
}

export interface FilterByProps extends ClassNameProps {
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
    stakeHolders: (Omit<StakeHolder, "state"> & {
        contactPerson?: Pick<ContactPerson, "firstName" | "lastName" | "email">
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
    contactPeople: (Omit<ContactPerson, "state"> & { phones?: Pick<PhoneContactPerson, "number">[]; role?: { name: string } })[]
}

export interface TableProjectsProps {
    projects: (Project & {
        contactPerson?: Pick<ContactPerson, "firstName" | "lastName" | "email">
        stakeholder?: Pick<StakeHolder, "name">
        address?: Pick<Address, "country" | "city" | "latitude" | "longitude">
    })[]
}

export interface SelectGenericProps<T extends Record<string, unknown>, K = keyof T> extends ClassNameProps {
    classNameOption?: string
    name: string
    id: K
    value: K
    values: T[]
}

export interface SelectProps extends ClassNameProps {
    classNameOption?: string
    name: string
    values: Entry[]
}

export interface TableFieldsProps {
    fields: (Field & {
        project?: Pick<Project, "designation" | "idProject">
        address?: Pick<Address, "country" | "city" | "latitude" | "longitude">
    })[]
}

export interface TablePositionDatasProps {
    postionDatas: (PositionData & { field?: Pick<Field, "designation"> })[]
}

export interface InputListProps<T> {
    state: ActionState<T>
    inputs: {
        label: string
        name: string
        type: string
    }[]
}

export interface MenuRoutesProps extends ClassNameProps {
    classTitle?: string
    classOption?: string
    session: Session | null
}

export type FormProps = FormVariantProps<typeof formVariants> & {
    action: NonNullable<HTMLProps<HTMLFormElement>["action"]>
}

export interface MyDocumentProps {
    positionSoilData: Order
}

export interface compiledSampleProps {
    data: {
        valueb0Max: number
        valueb1Max: number
        valueb0Min: number
        valueb1Min: number
        valueMaxSteel: number
        valueMinSteel: number
        valueMaxGalvanising: number
        valueMinGalvanising: number
    }
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

export interface ProjectOnPickProps {
    contactPersonId: string
    idProject: string
    designation: string
}

export interface ClassNameProps {
    className?: string
}

export interface ModalWrapperProps extends ClassNameProps {
    children: React.ReactNode
    innerClassName?: string
    button?: React.ReactNode
    close?: React.ReactNode
    mandatory?: boolean
    error?: boolean
}

export interface ErrorPickProjectProps extends Params<""> {
    ok: boolean
}
