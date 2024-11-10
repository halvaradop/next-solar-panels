import Link from "next/link"

export const Footer = () => {
    return (
        <footer className="py-20 base:py-24">
            <section className="w-11/12 mx-auto flex flex-col gap-y-10 font-medium text-center base:text-start lg:w-10/12 xl:max-w-screen-xl">
                <h3 className="fluency-4xl">© 2024 - ACHE ENGINEERING</h3>
                <div className="space-y-8 base:mt-10 base:flex base:items-start base:justify-between base:space-y-0">
                    <ul className="flex justify-evenly items-center flex-wrap gap-x-5 base:flex-row base:gap-x-8">
                        <li>
                            <Link href="/">HOME</Link>
                        </li>
                        <li>
                            <Link href="/#corrosion">CORROSION</Link>
                        </li>
                        <li>
                            <Link href="/#solar-panels">SOLAR PANELS</Link>
                        </li>
                        <li>
                            <Link href="/">ABOUT US</Link>
                        </li>
                        <li>
                            <Link href="/dashboard">LOGIN</Link>
                        </li>
                    </ul>
                    <ul>
                        <li>CONTACTS</li>
                        <li className="font-normal">TEL: +49 (0) 6473-92254-0</li>
                        <li className="font-normal">FAX: +49 (0) 647392254-29</li>
                    </ul>
                    <ul>
                        <li>ADDRESS</li>
                        <li className="font-normal">Röntgenweg 9</li>
                        <li className="font-normal">D-35638 Leun (Hessen)</li>
                    </ul>
                </div>
                <p className="text-[10px] base:-order-1">© 2024 ACHE ENGINEERING GmbH. ALL RIGHT RESERVED</p>
            </section>
        </footer>
    )
}
