import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getProjectsByContactPersonId } from "@/lib/services"
import { Project } from "@/ui/dashboard/pick-project/project"
import { Params } from "@/lib/@types/types"
import { SessionProvider } from "next-auth/react"

export const PickProjectModal = async ({ searchParams }: Params<"">) => {
    const session = await auth()
    if (!session || !session.user.id) {
        return redirect("/dashboard")
    }
    const { error } = await searchParams
    const projects = await getProjectsByContactPersonId(session.user.id)

    return (
        <section>
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-slate-800 mb-2">Pick Your Project</h1>
                <p className="text-gray-500">
                    {error
                        ? "Please select one of the projects you are registered for or working on to proceed."
                        : "Select one of the projects you are working on to enhance your dashboard experience."}
                </p>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <SessionProvider session={session}>
                    {projects.map(({ idProject, designation }) => (
                        <Project
                            key={idProject}
                            contactPersonId={session.user.id!}
                            idProject={idProject}
                            designation={designation}
                        />
                    ))}
                </SessionProvider>
            </ul>
        </section>
    )
}
