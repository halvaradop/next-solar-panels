import { getProjects, getProjectsByStakeHolderId } from "@/lib/services"
import { CardDashboard } from "./card"
import projectsIcon from "@/public/projects.png"

export const Projects = async ({ stakeholderId }: { stakeholderId?: string }) => {
    const projects = stakeholderId ? await getProjectsByStakeHolderId(stakeholderId) : await getProjects()
    return <CardDashboard src={projectsIcon} alt="projects" title="Projects" count={projects.length} />
}
