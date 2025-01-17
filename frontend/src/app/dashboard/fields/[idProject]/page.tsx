import { Metadata } from "next"
import { Suspense } from "react"
import { TableFields } from "@/ui/dashboard/fields/table"
import { getAddressById, getFieldsByProjectsId, getPositionSoilDatasByContactPerson, getProjectsById } from "@/lib/services"
import { Entry, Params } from "@/lib/@types/types"
import { AddNewField } from "@/ui/dashboard/fields/add-new-field"
import { compiledSample } from "@/lib/math"
import { TableCompiledSamples } from "@/ui/dashboard/samples/table-compiled"
import { auth } from "@/lib/auth"
import { CardInformation } from "@/ui/dashboard/Card/cards"
import { Filter } from "@/ui/common/filter"
import { Address } from "@/lib/@types/models"

export const metadata: Metadata = {
    title: "Fields",
    description: "List of Fields",
}

const getInformation = async (idProject: string) => {
    const session = await auth()
    const userId = session?.user?.id ? session.user.id : Number.MAX_SAFE_INTEGER.toString()
    const [fields, positionSoilDatas, project] = await Promise.all([
        getFieldsByProjectsId(idProject),
        getPositionSoilDatasByContactPerson(userId.toString()),
        getProjectsById(idProject),
    ])

    // @ts-expect-error
    const addresses = await Promise.all(fields.map(({ idAddress }) => getAddressById(idAddress)))
    const filteredAddresses = addresses.filter((address) => address && address.city && address.country) as Address[]
    const cities = filteredAddresses.filter(({ city }) => city).map<Entry>(({ city }) => ({ key: city!, value: city! }))
    const countries = filteredAddresses
        .filter(({ country }) => country)
        .map<Entry>(({ country }) => ({ key: country!, value: country! }))
    return { fields, positionSoilDatas, project, cities, countries }
}

const DashboardFieldsPage = async ({ params }: Params<"idProject">) => {
    const idProject = (await params).idProject
    const { fields, positionSoilDatas, project, cities, countries } = await getInformation(idProject)
    const data = compiledSample(positionSoilDatas)

    return (
        <section className="min-h-main py-4 space-y-4">
            <CardInformation project={project!}></CardInformation>
            <Filter
                filters={[
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
                <TableCompiledSamples data={data} />
            </Suspense>
        </section>
    )
}

export default DashboardFieldsPage
