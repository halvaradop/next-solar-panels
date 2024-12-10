import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getProjectsByContactPersonId } from "@/lib/services"
import { PickYourProject } from "@/ui/pick-your-project/project"

const PickYourProjectPage = async () => {
    const session = await auth()
    if (!session || !session.user.id) return redirect("/dashboard")

    const projects = await getProjectsByContactPersonId(session.user.id)

    return (
        <section className="w-11/12 min-h-main mx-auto base:w-10/12 py-8">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-slate-800 mb-2">Pick Your Project</h1>
                <p className="text-gray-500">
                    Select one of the projects you are working on to have a better experience in the dashboard.
                </p>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {projects.map(({ idProject, designation }) => (
                    <PickYourProject
                        key={idProject}
                        contactPersonId={session.user.id!}
                        idProject={idProject}
                        designation={designation}
                    />
                ))}
            </ul>
        </section>
    )
}

export default PickYourProjectPage
