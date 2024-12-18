import { Metadata } from "next"
import { Suspense } from "react"
import { TableFields } from "@/ui/dashboard/fields/table"
import { getProjectsByStakeHolderId, getFieldsByStakeHolderId, getAddressById } from "@/lib/services"
import { Filter } from "@/ui/common/filter"
import { AddNewField } from "@/ui/dashboard/fields/add-new-field"
import { getSessionToken } from "@/lib/utils"
import { Entry } from "@/lib/@types/types"

export const metadata: Metadata = {
    title: "Fields",
    description: "List of Fields",
}

const getInformation = async () => {
    const { idStakeHolder } = await getSessionToken()
    const [fields, projects_] = await Promise.all([
        getFieldsByStakeHolderId(idStakeHolder),
        getProjectsByStakeHolderId(idStakeHolder),
    ])
    /**
     * TODO: update this logic with a simple map function due to the fiel has a city and
     * country from the address
     */
    const addresses = await Promise.all(fields.map(({ idAddress }) => getAddressById(idAddress)))
    const cities = addresses.filter(({ city }) => city).map<Entry>(({ city }) => ({ key: city!, value: city! }))
    const countries = addresses.filter(({ country }) => country).map<Entry>(({ country }) => ({ key: country!, value: country! }))
    const projects = projects_.map<Entry>(({ idProject, designation }) => ({ key: designation, value: idProject.toString() }))
    return { fields, projects, cities, countries }
}

const DashboardFieldsPage = async () => {
    const { fields, projects, cities, countries } = await getInformation()

    return (
        <section className="min-h-main py-4 space-y-4">
            <Filter
                filters={[
                    {
                        title: "project",
                        options: projects,
                    },
                    {
                        title: "city",
                        options: cities,
                    },
                    {
                        title: "country",
                        options: countries,
                    },
                ]}
            />
            <AddNewField />
            <Suspense fallback={<p>Table...</p>}>
                <TableFields fields={fields} />
            </Suspense>
        </section>
    )
}

export default DashboardFieldsPage
