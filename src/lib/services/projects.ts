import { Field, PositionData, Project } from "@prisma/client"
import { getFetch } from "@/lib/utils"
import { string } from "zod"

export const getProjects = async <T extends unknown[] = Project[]>(): Promise<T> => {
    const { data } = await getFetch<T>("projects")
    return data
}

export const getProjectsById = async <T extends unknown[] = Project[]>(projectId: string): Promise<T> => {
    const { data } = await getFetch<T>(`projects/${projectId}`)
    return data
}

export const getFieldsByProjectsId = async <T extends unknown[] = Field[]>(idProject: string): Promise<T> => {
    const { data } = await getFetch<T>(`projects/${idProject}/fields`)
    return data
}

export const getPositionDatasByProjectId = async <T extends unknown[] = PositionData[]>(projectId: string): Promise<T> => {
    const { data } = await getFetch<T>(`projects/${projectId}/position-datas`)
    return data
}
