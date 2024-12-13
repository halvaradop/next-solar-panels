import Image from "next/image"
import { CardDashboardProps } from "@/lib/@types/props"
import { merge } from "@/lib/utils"

export const CardDashboard = ({ src, alt, title, count, isHover = false }: CardDashboardProps) => {
    return (
        <figure
            className={merge("p-3 flex items-center justify-evenly gap-x-4 border border-gray-1000 rounded-lg bg-white ", {
                "hover:cursor-pointer": isHover,
            })}
        >
            <Image width={48} height={48} src={src} alt={`${alt} icon`} priority />
            <figcaption className="flex flex-col">
                <h2>{title}</h2>
                <p>{count}</p>
            </figcaption>
        </figure>
    )
}
