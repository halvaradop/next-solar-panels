import { ReadonlyURLSearchParams } from "next/navigation"
import { Project, Sample, ProjectsOnUsers, User, Zone, Client, Address } from "@prisma/client"

export interface LayoutProps {
    children: React.ReactNode
}

export interface MenuState {
    isMenuOpen: boolean
    isMatchMedia: boolean
    hash: string
}

export interface ActionState<T> {
    message: string
    isSuccess: boolean
    schema: T
}

export type AddSampleActionState = ActionState<SamplesWithoutIds>

export type AddClientActionState = ActionState<Omit<Client, "clientId">>

export type AddUserActionState = ActionState<Omit<User, "userId" | "state">> & { project?: string; phone?: string }

export type AddAddressActionState = ActionState<Omit<Address, "isActive" | "addressId">>

export interface Entry {
    key: string
    value: string
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
    params: Record<T, string>
    searchParams: ReadonlyURLSearchParams
}

export type AddZonesActionState = ActionState<Omit<Zone, "zoneId" | "plantId" | "state">>

export type AddProjectActionState = ActionState<Omit<Project, "plantId" | "state">>

export type AddProjectOnUserActionState = ActionState<ProjectsOnUsers>

export type SamplesWithoutIds = Omit<Sample, "zoneId" | "userId" | "sampleDateTime" | "sampleId">

export type UserSession = Omit<User, "state" | "roleId" | "password" | "fax" | "website"> & {
    role: {
        roleId: number
        roleName: string
        state: string
    }
    projectsOnUsers: Array<{
        project: {
            clients: {
                clientId: string
            }
        }
    }>
}
