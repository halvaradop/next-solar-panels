import { Product } from "./product"
import panels from "@/public/panels.jpg"
import corrosion from "@/public/corrosion.jpg"

export const ProductList = () => {
    return (
        <section className="space-y-28">
            <Product
                src={corrosion}
                alt="corrosion protection picture"
                title="kss corrosion protection systems and line location"
                subtitle="corrosion protection"
                description="with special equipment and know-how we develop corrosion protection systems and carry ut line localisation"
            />
            <Product
                src={panels}
                alt="solar panels picture"
                title="internationl photovolaic large-scale and ground-mounted systems"
                subtitle="solar panels"
                description="we build photovoltaic systems for you worldwide in various sizes and types. From industrial roofs to ground-mounted systems, together we will find the right solution for you"
                isRight
            />
        </section>
    )
}
