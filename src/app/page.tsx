import Image from "next/image"
import { Keywords } from "@/ui/keywords"
import clouds from "@/public/clouds.jpg"
import arrowIcon from "@/public/arrow-down.svg"
import { Button } from "@halvaradop/ui-button"
import { ProductList } from "@/ui/products/product-list"
import { ProjectList } from "@/ui/projects/project-list"

const Index = () => {
    return (
        <section className="w-11/12 mx-auto">
            <figure className="w-full h-screen absolute top-0 left-0 -z-10 bg-black ">
                <Image className="h-screen object-cover opacity-70" src={clouds} alt="clouds" />
            </figure>
            <div className="min-h-[calc(100dvh-5rem)] pb-20 flex flex-col justify-end gap-y-4 text-white text-center">
                <p className="text-lg">Renewable energy - Corrosion protection</p>
                <h1 className="text-5xl font-bold">ACHE ENGINEERING</h1>
                <Button className="mx-auto gap-x-2 text-white" variant="ghost">
                    <span>Explore more</span>
                    <Image src={arrowIcon} alt="arrow icon" />
                </Button>
            </div>
            <Keywords />
            <p className="h-dvh grid place-content-center font-normal text-2xl uppercase text-center">
                Specialists in photovoltaic systems and corrosion protection for efficient and safe long-term installations to
                contributing to a greener planet
            </p>
            <ProductList />
            <ProjectList />
        </section>
    )
}

export default Index
