import { ProjectProps } from "@/lib/@types/props"
import { merge } from "@/lib/merge"

export const Project = ({ className, title, city, year }: ProjectProps) => {
    return (
        <article className={merge("py-4 flex flex-col font-medium", className)}>
            <h3 className="text-2xl">{title}</h3>
            <p className="mt-2 mb-1">{city}</p>
            <p>{year}</p>
        </article>
    )
}
