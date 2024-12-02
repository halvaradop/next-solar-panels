import { LayoutProps } from "@/lib/@types/types"
import { Menu } from "@/ui/dashboard/menu"

const DashboardLayout = ({ children }: LayoutProps) => {
    return (
        <section className="min-h-main overflow-hidden bg-[#F5F7FA]">
            <section className="w-11/12 mx-auto base:grid base:items-center base:gap-x-4 base:grid-cols-[auto,1fr] lg:w-10/12 xl:max-w-screen-xl">
                <Menu />
                {children}
            </section>
        </section>
    )
}

export default DashboardLayout
