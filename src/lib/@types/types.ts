import { ReadonlyURLSearchParams } from "next/navigation"
import { Project, Sample, ProjectsOnUsers, User, Zone, Client } from "@prisma/client"

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

export type AddCompanieActionState = ActionState<Omit<Client, "clientId">>

export type AddUserActionState = ActionState<Omit<User, "userId">>

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

export type AddPlantActionState = ActionState<Omit<Project, "plantId" | "state">>

export type AddPUserPlantsActionState = ActionState<ProjectsOnUsers>

export type SamplesWithoutIds = Omit<Sample, "zoneId" | "userId" | "sampleDateTime" | "sampleId">

export type UserSession = Omit<User, "state" | "roleId" | "password"> & {
    role: {
        roleId: number
        roleName: string
    }
    companyId: number
}
