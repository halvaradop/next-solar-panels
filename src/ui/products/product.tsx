import { ProductProps } from "@/lib/@types/props"
import Image from "next/image"

export const Product = ({ title, subtitle, description, src, alt }: ProductProps) => {
    return (
        <article className="flex flex-col gap-y-4">
            <h3 className="text-lg font-medium uppercase">{subtitle}</h3>
            <h2 className="text-3xl font-medium uppercase">{title}</h2>
            <figure>
                <Image className="aspect-video object-cover" src={src} alt={alt} />
                <figcaption className="mt-4">{description}</figcaption>
            </figure>
        </article>
    )
}
