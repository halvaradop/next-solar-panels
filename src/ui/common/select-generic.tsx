import Image from "next/image"
import { SelectGenericProps } from "@/lib/@types/props"
import { merge } from "@/lib/utils"
import arrowDown from "@/public/arrow.svg"

export const SelectGeneric = <T extends Record<string, unknown>>({
    className,
    classNameOption,
    values,
    id,
    value,
    name,
}: SelectGenericProps<T>) => {
    return (
        <div className="mt-1 flex items-center relative">
            <select className={merge("group w-full h-10 pl-3 border rounded-lg appearance-none", className)} name={name}>
                {values.map((entry, index) => (
                    <option className={classNameOption} key={index} value={String(entry[value as keyof T])}>
                        {String(entry[id as keyof T])}
                    </option>
                ))}
            </select>
            <figcaption className="absolute right-2">
                <Image src={arrowDown} alt="arrow down icon" />
            </figcaption>
        </div>
    )
}
