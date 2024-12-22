import { Project, Address, Role, StakeHolder, PositionSoilData, ContactPerson, Field, PositionData } from "@prisma/client"

export interface LayoutProps {
    children: React.ReactNode
}

export interface ActionState<T> {
    message: string
    isSuccess: boolean
    schema: T
}

export type AddPositionSoilDatasPageActionState = ActionState<PositionSoilDatasWithoutIds>

export type AddStakeHolderActionState = ActionState<Omit<StakeHolder, "idStakeHolder">>

export type AddContactPersonActionState = ActionState<Omit<ContactPerson, "idContacPerson" | "state">> & {
    project?: string
    phone?: string
}

export type AddAddressActionState = ActionState<Omit<Address, "isActive" | "addressId">>

export interface Entry {
    key: string | number
    value: string | number
}

export interface LoginActionState {
    message: string
    isSuccess: boolean
}

export interface ResponseAPI<T> {
    data: T
    ok: boolean
    message?: string
}

export interface Params<T extends string> {
    params: Promise<Record<T, string>>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export type Order = PositionSoilData & {
    field?: { designation: string; latitude: string; longitude: string }
    contactPerson?: Pick<ContactPerson, "firstName" | "lastName">
    valueb0?: string
    valueb1?: string
    steel?: string
    galvanising?: string
    message?: string
}
export type AddFieldsActionState = ActionState<Omit<Field, "fieldId" | "state">>

export type AddProjectActionState = ActionState<Omit<Project, "plantId" | "state">>

export type AddPositionDataActionState = ActionState<Omit<PositionData, "idPositionData">>

export type PositionSoilDatasWithoutIds = Omit<PositionSoilData, "idContectPerson" | "date" | "positionSoildDataId" | "b0" | "b1">

export type ContactPersonAPI = Omit<ContactPerson, "idContactPerson" | "idRole" | "password" | "state"> & {
    role: Pick<Role, "name">
    stakeHolder: StakeHolder[]
}

export type Roles = "client-admin" | "client-user" | "admin" | "project-manager"

export interface CookieToken {
    idProject: string
    idStakeHolder: string
}

export type PositionSoildDataById = PositionSoilData & {
    field: Pick<Field, "designation">
    user: Pick<ContactPerson, "firstName" | "lastName">
}
