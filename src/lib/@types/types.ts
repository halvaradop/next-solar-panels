import { ReadonlyURLSearchParams } from "next/navigation"
import { Samples, Zones } from "@prisma/client"
import { ZoneSchema } from "../schemas"
import { z } from "zod"

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

export type ZoneRequest = z.infer<typeof ZoneSchema>

export interface AddZonesActionState {
    message: string
    isSuccess: boolean
    schema: Omit<Zones, "zoneId" | "plantId" | "state">
}

export type SamplesWithoutIds = Omit<Samples, "zoneId" | "userId" | "sampleDateTime" | "sampleId">
