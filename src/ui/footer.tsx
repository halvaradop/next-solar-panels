import Link from "next/link"

export const Footer = () => {

    return (
        <footer className="py-20">
            <section className="w-11/12 mx-auto flex flex-col gap-y-10 font-medium text-center">
                <h3 className="text-4xl">© 2024 - ACHE ENGINEERING</h3>
                <div className="space-y-8">
                    <ul className="flex justify-between items-center">
                        <li><Link href="/">HOME</Link></li>
                        <li><Link href="/">CORROSION</Link></li>
                        <li><Link href="/">ABOUT US</Link></li>
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
                <p className="text-[10px]">© 2024 ACHE ENGINEERING GmbH. ALL RIGHT RESERVED</p>
            </section>
        </footer>
    )
}