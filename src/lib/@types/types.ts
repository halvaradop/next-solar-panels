import { ReadonlyURLSearchParams } from "next/navigation"
import { Companies, Plants, Samples, UserPlants, Users, Zones } from "@prisma/client"

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

export type AddCompanieActionState = ActionState<Omit<Companies, "companyId">>

export type AddUserActionState = ActionState<Omit<Users, "userId">>

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

export type AddZonesActionState = ActionState<Omit<Zones, "zoneId" | "plantId" | "state">>

export type AddPlantActionState = ActionState<Omit<Plants, "plantId" | "state">>

export type AddPUserPlantsActionState = ActionState<UserPlants>

export type SamplesWithoutIds = Omit<Samples, "zoneId" | "userId" | "sampleDateTime" | "sampleId">

export type UserSession = Omit<Users, "state" | "roleId" | "password"> & {
    role: {
        roleId: number
        roleName: string
    }
    companyId: number
}
