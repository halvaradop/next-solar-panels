import { AddPropertyToObject } from "@halvaradop/ts-utility-types"
import { Sample, Zone } from "@prisma/client"

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
