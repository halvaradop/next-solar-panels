export const Impressum = () => {
    return (
        <div className="min-h-screen bg-gray-100 text-gray-800">
            <header className="bg-blue-600 text-white p-6">
                <h1 className="text-2xl font-bold">ACHE Engineering GmbH</h1>
                <p className="text-sm">Ihr Partner für Photovoltaikanlagen</p>
            </header>

            <main className="p-6">
                <section className="bg-white p-6 rounded shadow mb-6">
                    <h2 className="text-xl font-bold mb-4">Kontaktdaten</h2>
                    <p>
                        <strong>Anschrift:</strong> Röntgenweg 9, D-35638 Leun
                    </p>
                    <p>
                        <strong>E-Mail:</strong>{" "}
                        <a href="mailto:info@ache-engineering.de" className="text-blue-500 underline">
                            info@ache-engineering.de
                        </a>
                    </p>
                    <p>
                        <strong>Telefon:</strong> +49 (0) 6473-92254-0
                    </p>
                    <p>
                        <strong>Telefax:</strong> +49 (0) 6473-92254-29
                    </p>
                    <p>
                        <strong>Notfallnummer:</strong> +49 (0) 171-35 48 478
                    </p>
                    <p>
                        <strong>Bürozeiten:</strong> Mo.-Fr.: 7.00 Uhr – 19.00 Uhr
                    </p>
                </section>

                <section className="bg-white p-6 rounded shadow mb-6">
                    <h2 className="text-xl font-bold mb-4">Geschäftsführer</h2>
                    <p>
                        Ernst-Günter Ache <br />
                        Öffentlich bestellter und vereidigter Sachverständiger für Photovoltaikanlagentechnik
                    </p>
                </section>

                <section className="bg-white p-6 rounded shadow mb-6">
                    <h2 className="text-xl font-bold mb-4">Rechtliche Informationen</h2>
                    <p>
                        <strong>Registergericht:</strong> Amtsgericht Wetzlar
                    </p>
                    <p>
                        <strong>Registernummer:</strong> HRB5406
                    </p>
                    <p>
                        <strong>U.St.Id. Nr.:</strong> DE278383946
                    </p>
                    <p>
                        <strong>Stammkapital:</strong> 100.000€
                    </p>
                </section>

                <section className="bg-white p-6 rounded shadow">
                    <h2 className="text-xl font-bold mb-4">Bankverbindungen</h2>
                    <div className="mb-4">
                        <h3 className="font-semibold">Volksbank Mittelhessen</h3>
                        <p>
                            <strong>BIC:</strong> VBMHDE5FXXX
                        </p>
                        <p>
                            <strong>IBAN:</strong> DE96 5139 0000 0039 4075 07
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold">Sparkasse Wetzlar</h3>
                        <p>
                            <strong>BIC:</strong> HELADEF1WET
                        </p>
                        <p>
                            <strong>IBAN:</strong> DE70 5155 0035 0002 1174 48
                        </p>
                    </div>
                </section>
            </main>

            <footer className="bg-gray-800 text-white p-6 mt-6 text-center">
                © 2024 ACHE Engineering GmbH. Alle Rechte vorbehalten.
            </footer>
        </div>
    )
}
