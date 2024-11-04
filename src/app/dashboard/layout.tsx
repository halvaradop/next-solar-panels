import { LayoutProps } from "@/lib/@types/types"

const DashboardLayout = ({ children }: LayoutProps) => {
    return <section className="min-h-main bg-[#F5F7FA]">{children}</section>
}

export default DashboardLayout
