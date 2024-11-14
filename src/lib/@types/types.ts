import { ReadonlyURLSearchParams } from "next/navigation"
import { Companies, Plants, Samples, Users, Zones } from "@prisma/client"

export interface LayoutProps {
    children: React.ReactNode
}

export interface MenuState {
    isMenuOpen: boolean
    isMatchMedia: boolean
    hash: string
}

export interface AddSampleActionState {
    message: string
    isSuccess: boolean
    schema: SamplesWithoutIds
}

export interface AddCompanieActionState {
    message: string
    isSuccess: boolean
    schema: Omit<Companies, "companyId">
}

export interface AddUserActionState {
    message: string
    isSuccess: boolean
    schema: Omit<Users, "userId">
}
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
export interface AddZonesActionState {
    message: string
    isSuccess: boolean
    schema: Omit<Zones, "zoneId" | "plantId" | "state">
}

export interface AddPlantActionState {
    message: string
    isSuccess: boolean
    schema: Omit<Plants, "plantId" | "state">
}
export type SamplesWithoutIds = Omit<Samples, "zoneId" | "userId" | "sampleDateTime" | "sampleId">

export interface UsersResponse {
    userId: number
    email: string
    firstName: string
    lastName: string
    role: {
        roleId: number
        roleName: string
        state: string
    }
    UserPlants: Array<{
        plant: {
            company: {
                companyId: number
            }
        }
    }>
}
