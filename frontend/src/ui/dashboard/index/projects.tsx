import { getProjects, getProjectsByStakeHolderId, getProjectsByContactPersonId } from "@/lib/services"
import { CardDashboard } from "./card"
import { Roles } from "@/lib/@types/types"
import { isFalsy } from "@halvaradop/ts-utility-types/validate"

export const Projects = async ({ role, id }: { role?: Roles; id?: string }) => {
    const projects =
        role === "admin" || isFalsy(role)
            ? await getProjects()
            : role === "client-admin"
              ? await getProjectsByStakeHolderId(id!)
              : await getProjectsByContactPersonId(id!)
    return <CardDashboard href="/dashboard/projects" title="Projects" count={projects.length} />
}
