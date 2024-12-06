import Image from "next/image"
import Link from "next/link"
import { Button } from "@halvaradop/ui-button"
import websiteBuilding from "@/public/website-building.svg"

const NotFound = () => {
    return (
        <main className="min-h-main flex items-center justify-center flex-col text-center">
            <h1 className="fluency-4xl font-bold">Page Not Found</h1>
            <p className="mt-2 mb-6 text-lg">
                Sorry, the page you are looking for does not exist. This page is under construction and will be available soon.
            </p>
            <Image src={websiteBuilding} alt="Website under construction" width={400} height={300} priority />
            <Button className="mt-6 mx-auto" asChild>
                <Link href="/">Go back to the homepage</Link>
            </Button>
        </main>
    )
}

export default NotFound
