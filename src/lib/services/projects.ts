import { ContactPerson, Project } from "@prisma/client"
import { getFetch } from "@/lib/utils"

export const getProjects = async <T extends unknown[] = Project[]>(): Promise<T> => {
    const { data } = await getFetch<T>("projects")
    return data
}
