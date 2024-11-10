import Image from "next/image"
import { merge } from "@/lib/utils"
import { ProductProps } from "@/lib/@types/props"

export const Product = ({ className, id, title, subtitle, description, src, alt, isRight }: ProductProps) => {
    const figureVariant = isRight ? "base:grid-cols-[0.35fr_0.65fr]" : "base:grid-cols-[0.65fr_0.35fr]"
    return (
        <article className={merge("flex flex-col gap-y-4", className, { "text-right": isRight, "items-end": isRight })} id={id}>
            <h3 className="text-lg font-medium uppercase base:w-[60%]">{subtitle}</h3>
            <h2 className="text-3xl font-medium uppercase base:w-[60%]">{title}</h2>
            <figure className={`base:grid base:items-center base:gap-x-8 ${figureVariant}`}>
                <Image className={merge("aspect-video object-cover", { "order-1": isRight })} src={src} alt={alt} />
                <figcaption className="mt-4">{description}</figcaption>
            </figure>
        </article>
    )
}
