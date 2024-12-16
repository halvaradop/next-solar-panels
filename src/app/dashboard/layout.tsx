import { LayoutProps } from "@/lib/@types/types"
import { Menu } from "@/ui/dashboard/menu"

const DashboardLayout = ({ children }: LayoutProps) => {
    return (
        <section className="min-h-main overflow-hidden bg-sky-50">
            <section className="w-11/12 mx-auto base:flex base:items-center base:gap-x-8 lg:w-10/12 xl:max-w-screen-xl">
                <Menu />
                {children}
            </section>
        </section>
    )
}

export default DashboardLayout
