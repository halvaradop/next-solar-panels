import { Product } from "./product"
import corrosion from "@/public/corrosion.jpg"

export const ProductList = () => {
    return (
        <section className="space-y-28">
            <Product
                src={corrosion}
                alt="corrosion protection picture"
                id="corrosion"
                title="kss corrosion protection systems and line location"
                subtitle="corrosion protection"
                description="with special equipment and know-how we develop corrosion protection systems and carry ut line localisation"
            />
        </section>
    )
}
