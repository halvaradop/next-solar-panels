import { ReadonlyURLSearchParams } from "next/navigation"
import { Project, Address, Role, StakeHolder, PositionSoilData, ContactPerson, Field, Linkage } from "@prisma/client"

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

export type AddContactPersonActionState = ActionState<Omit<ContactPerson, "userId" | "state">> & {
    project?: string
    phone?: string
}

export type AddAddressActionState = ActionState<Omit<Address, "isActive" | "addressId">>

export interface Entry {
    key: string
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
    searchParams: Promise<ReadonlyURLSearchParams>
}

export type Order = PositionSoilData & {
    field?: { name: string; latitude: string; longitude: string }
    contactPerson?: Pick<ContactPerson, "firstName" | "lastName">
    valueb0?: string
    valueb1?: string
    steel?: string
    galvanising?: string
    message?: string
}
export type AddFieldsActionState = ActionState<Omit<Field, "fieldId" | "state">>

export type AddProjectActionState = ActionState<Omit<Project, "plantId" | "state">>

export type AddProjectOnUserActionState = ActionState<Linkage>

export type PositionSoilDatasWithoutIds = Omit<PositionSoilData, "idContectPerson" | "date" | "positionSoildDataId" | "b0" | "b1">

export type UserSession = Omit<ContactPerson, "state" | "roleId" | "password" | "fax" | "wwww"> & {
    role: Omit<Role, "users" | "rolesPermissions">
    clients: { clientId: string }[]
}

export type Roles = "client-admin" | "client-user" | "admin"
