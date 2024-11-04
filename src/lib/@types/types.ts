export interface LayoutProps {
    children: React.ReactNode
}

export interface MenuState {
    isMenuOpen: boolean
    isMatchMedia: boolean
}

/**
 * TODO: Remove it when the DATABASE is ready
 */
export interface Sample {
    material: string
    corrosion: string
    temperature: string
    humidity: string
    zone: string
}

export interface AddSampleActionState {
    scheme: Sample
    message: string
    isSuccess: boolean
}

export interface Entry {
    key: string
    value: string
}
