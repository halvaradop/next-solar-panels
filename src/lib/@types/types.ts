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

export type GetContactPersonById = (
    idContactPerson: string
) => Promise<(Omit<ContactPerson, "idContactPerson" | "idRole" | "password" | "state"> & { stakeHolder: StakeHolder[] }) | null>

export type GetPositionSoilDatasByContactPerson = (
    idContactPerson: string
) => Promise<(PositionSoilData & { contactPerson: ContactPerson })[]>

export type GetPositionSoilDataById = (idPositionSoilData: string) => Promise<PositionSoilData | null>

export type GetProjectsById = (
    idProject: string
) => Promise<(Project & { contactPerson: ContactPerson; address: Address; field: Field[] }) | null>

export type GetFieldsByProjectId = (idProject: string) => Promise<(Field & { project: Project; address: Address })[]>

export type GetContactPeopleByStakeHolderId = (idStakeHolder: string) => Promise<ContactPerson[]>

export type GetProjectsByStakeHolderId = (
    idStakeHolder: string
) => Promise<(Project & { address: Address; contactPerson: ContactPerson; stakeholder: StakeHolder })[]>

export type GetFieldsByStakeHolderId = (idStakeHolder: string) => Promise<(Field & { project: Project; address: Address })[]>
