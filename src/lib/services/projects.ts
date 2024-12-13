import { Field, Project } from "@prisma/client"
import { getFetch } from "@/lib/utils"

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
