import Link from "next/link"
import Image from "next/image"
import { Keywords } from "@/ui/index/keywords"
import { Button } from "@halvaradop/ui-button"
import { ProductList } from "@/ui/index/products/product-list"
import clouds from "@/public/clouds.jpg"
import arrowIcon from "@/public/arrow.svg"

const Index = () => {
    return (
        <section className="w-11/12 mx-auto lg:w-10/12 xl:max-w-screen-xl">
            <figure className="w-full h-screen absolute top-0 left-0 -z-10 bg-black ">
                <Image className="w-full h-screen object-cover opacity-70" src={clouds} alt="clouds" />
            </figure>
            <div className="min-h-main pb-20 flex flex-col justify-end gap-y-4 text-white text-center base:justify-between base:items-end base:flex-row base:gap-x-10 base:text-start">
                <div>
                    <p className="text-lg">Renewable energy - Corrosion protection</p>
                    <h1 className="fluency-5xl font-bold base:fluency-6xl">
                        ACHE ENGINEERING <span className="text-lg tracking-wider">GmbH</span>
                    </h1>
                </div>
                <Button
                    className="group min-w-[fit-content] mx-auto gap-x-2 text-white base:mx-0 base:mb-3"
                    variant="ghost"
                    asChild
                >
                    <Link href="/#about-us">
                        <span className="break-words">Explore more</span>
                        <Image className="group-hover:invert" src={arrowIcon} alt="arrow icon" />
                    </Link>
                </Button>
            </div>
            <Keywords />
            <p
                className="h-dvh grid place-content-center font-normal fluency-2xl uppercase text-center md:fluency-4xl is-[p]:md:leading-tight lg:fluency-5xl"
                id="about-us"
            >
                Specialists in photovoltaic systems and corrosion protection for efficient and safe long-term installations to
                contributing to a greener planet
            </p>
            <ProductList />
        </section>
    )
}

export default Index
