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
}

export interface Entry {
    key: string
    value: string
}

export interface LoginActionState {
    message: string
    isSuccess: boolean
}
