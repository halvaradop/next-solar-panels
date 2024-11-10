import { ReadonlyURLSearchParams } from "next/navigation"
import { z } from "zod"
import { Samples, Zones } from "@prisma/client"
import { SampleSchema, ZoneSchema } from "@/lib/schemas"
import { AddPropertyToObject } from "@halvaradop/ts-utility-types"

export interface LayoutProps {
    children: React.ReactNode
}

export interface MenuState {
    isMenuOpen: boolean
    isMatchMedia: boolean
}

export interface AddSampleActionState {
    message: string
    isSuccess: boolean
    schema: Omit<Samples, "zoneId" | "userId" | "sampleDateTime" | "sampleId">
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

export type SampleRequest = z.infer<typeof SampleSchema>

export interface Params<T extends string> {
    params: Record<T, string>
    searchParams: ReadonlyURLSearchParams
}

export type ZoneRequest = z.infer<typeof ZoneSchema>

export interface AddZonesActionState {
    message: string
    isSuccess: boolean
    schema: Zones
}
