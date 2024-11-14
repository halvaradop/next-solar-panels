import Image from "next/image"
import { Suspense } from "react"
import { auth } from "@/lib/auth"
import { getUserByCompany } from "@/lib/services"
import { Table } from "@/ui/dashboard/users/table"
import arrowIcon from "@/public/arrow.svg"

const DashboardCompaniesPage = async () => {
    const session = await auth()
    const userId = Number(session?.user?.id) || Number.MAX_SAFE_INTEGER
    const users = await getUserByCompany(userId)
    return (
        <section className="min-h-main py-4 space-y-4">
            <Suspense fallback={<p>Table...</p>}>
                <Table users={users} />
            </Suspense>
            <div className="w-full flex items-center justify-between">
                <p className="text-sm">showing </p>
                <figure className="h-8 flex items-center border border-gray-1000 rounded-md divide-x">
                    <figure className="px-1 hover:cursor-pointer">
                        <Image className="rotate-90" src={arrowIcon} alt="arrow icon" />
                    </figure>
                    <figure className="px-1 hover:cursor-pointer">
                        <Image className="-rotate-90" src={arrowIcon} alt="arrow icon" />
                    </figure>
                </figure>
            </div>
        </section>
    )
}

export default DashboardCompaniesPage
