import Link from "next/link"

const ImprintPage = () => {
    return (
        <main className="w-11/12 mx-auto py-8 space-y-8 lg:w-10/12 xl:max-w-screen-xl">
            <div>
                <h2 className="fluency-2xl font-semibold mb-4">Contact Information</h2>
                <p>
                    <span className="font-semibold">Address:</span> Röntgenweg 9, D-35638 Leun
                </p>
                <p>
                    <span className="font-semibold">Email:</span>
                    <Link href="mailto:info@ache-engineering.de" className="text-blue-500 underline">
                        info@ache-engineering.de
                    </Link>
                </p>
                <p>
                    <span className="font-semibold">Phone:</span> +49 (0) 6473-92254-0
                </p>
                <p>
                    <span className="font-semibold">Fax:</span> +49 (0) 6473-92254-29
                </p>
                <p>
                    <span className="font-semibold">Emergency Number:</span> +49 (0) 171-35 48 478
                </p>
                <p>
                    <span className="font-semibold">Office Hours:</span> Mon.-Fri.: 7:00 AM – 7:00 PM
                </p>
            </div>
            <div>
                <h2 className="fluency-xl font-semibold mb-4">Managing Director</h2>
                <p>
                    <span className="font-semibold">Ernst-Günter Ache</span>
                    Publicly appointed and sworn expert for photovoltaic system technology
                </p>
            </div>
            <div>
                <h2 className="fluency-xl font-semibold mb-4">Legal Information</h2>
                <p>
                    <span className="font-semibold">Register Court:</span> District Court Wetzlar
                </p>
                <p>
                    <span className="font-semibold">Register Number:</span> HRB5406
                </p>
                <p>
                    <span className="font-semibold">VAT ID No.:</span> DE278383946
                </p>
                <p>
                    <span className="font-semibold">Share Capital:</span> 100,000€
                </p>
            </div>
            <div>
                <h2 className="fluency-xl font-semibold mb-4">Bank Details</h2>
                <div className="mb-4">
                    <h3 className="font-semimedfont-semibold">Volksbank Mittelhessen</h3>
                    <p>
                        <span className="font-semibold">BIC:</span> VBMHDE5FXXX
                    </p>
                    <p>
                        <span className="font-semibold">IBAN:</span> DE96 5139 0000 0039 4075 07
                    </p>
                </div>
                <div>
                    <h3 className="font-semimedfont-semibold">Sparkasse Wetzlar</h3>
                    <p>
                        <span className="font-medium">BIC:</span> HELADEF1WET
                    </p>
                    <p>
                        <span className="font-semibold">IBAN:</span> DE70 5155 0035 0002 1174 48
                    </p>
                </div>
            </div>
        </main>
    )
}

export default ImprintPage
