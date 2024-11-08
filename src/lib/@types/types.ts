import { ReadonlyURLSearchParams } from "next/navigation"
import { z } from "zod"
import { Sample, Zone } from "@prisma/client"
import { SampleSchema } from "@/lib/schemas"
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
    schema: Pick<Sample, "material" | "temperature" | "humidity" | "corrosion">
}

export interface Entry {
    key: string
    value: string
}

export interface LoginActionState {
    message: string
    isSuccess: boolean
}

export type SampleZone = AddPropertyToObject<Sample, "Zone", Zone>

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
