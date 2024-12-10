import { getFields, getFieldsByStakeHolderId } from "@/lib/services"
import { CardDashboard } from "./card"
import fieldIcon from "@/public/fields.svg"

export const Fields = async ({ stakeholderId }: { stakeholderId?: string }) => {
    const fields = stakeholderId ? await getFieldsByStakeHolderId(stakeholderId) : await getFields()
    return <CardDashboard src={fieldIcon} alt="fields" title="Fields" count={fields.length} />
}
