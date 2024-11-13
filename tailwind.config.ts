import type { Config } from "tailwindcss"
import utilities from "@halvaradop/tailwindcss-utilities"

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "node_modules/@halvaradop/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            screens: {
                xs: "480px",
                base: "900px",
            },
            minHeight: {
                main: "calc(100vh - calc(5rem + 1px))",
            },
            fontSize: {
                poppins: "var(--font-poppins)",
            },
            colors: {
                gray: {
                    1000: "#D5D5D5",
                },
            },
        },
    },
    plugins: [utilities],
}
export default config
