"use client"
import Link from "next/link"
import { PickYourProjectProps } from "@/lib/@types/props"
import { setProjectToken } from "@/lib/services"

export const PickYourProject = ({ contactPersonId, idProject, designation }: PickYourProjectProps) => {
    return (
        <li
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
            key={idProject}
            onClick={async () => await setProjectToken(contactPersonId, idProject)}
        >
            <Link href={`/dashboard`} className="block h-full text-center">
                <div className="text-xl font-semibold text-slate-700">{designation}</div>
            </Link>
        </li>
    )
}
