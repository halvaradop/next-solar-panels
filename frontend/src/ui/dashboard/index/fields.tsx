import { getFields, getFieldsByStakeHolderId } from "@/lib/services"
import { CardDashboard } from "./card"

export const Fields = async ({ stakeholderId }: { stakeholderId?: string }) => {
    const fields = stakeholderId ? await getFieldsByStakeHolderId(stakeholderId) : await getFields()
    return <CardDashboard href="/dashboard/fields" title="Fields" count={fields.length} />
}
