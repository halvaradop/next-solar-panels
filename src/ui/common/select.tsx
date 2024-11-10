import Image from "next/image"
import { SelectProps } from "@/lib/@types/props"
import { merge } from "@/lib/utils"
import arrowDown from "@/public/arrow.svg"

export const Select = ({ className, classNameOption, name, values }: SelectProps) => {
    return (
        <div className="mt-1 flex items-center relative">
            <select className={merge("group w-full h-10 pl-3 border rounded-lg appearance-none", className)} name={name}>
                {values.map(({ key, value }, index) => (
                    <option className={classNameOption} key={index} value={value}>
                        {key}
                    </option>
                ))}
            </select>
            <figcaption className="absolute right-2">
                <Image src={arrowDown} alt="arrow down icon" />
            </figcaption>
        </div>
    )
}
