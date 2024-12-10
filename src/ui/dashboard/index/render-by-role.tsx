import { Children } from "react"
import { RenderByRoleProps } from "@/lib/@types/props"

export const RenderByRole = ({ role, match, children }: RenderByRoleProps) => {
    if (!match.includes(role)) return null
    return Children.toArray(children).map((Component, key) => Component)
}
