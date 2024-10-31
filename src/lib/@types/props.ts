import { StaticImageData } from "next/image"

export interface ProductProps {
    title: string
    subtitle: string
    description: string
    src: string | StaticImageData
    alt: string
}

export interface ProjectProps {
    className?: string
    title: string
    city: string
    year: string
}
