import Image from "next/image"
import Link from "next/link"
import screenshotWeb from "@/public/screenshot-web.png"
import screenshotRepo from "@/public/screenshot-repo.png"

export const Links = () => {
    return (
        <div className="mt-4 mb-2 grid grid-cols-2 gap-4">
            <figure className="group relative rounded-md overflow-hidden">
                <Link
                    className="flex items-center justify-center flex-col gap-y-2 bg-black"
                    href="https://github.com/halvaradop/next-solar-panels"
                    target="_blank"
                >
                    <Image
                        className="w-full h-full aspect-video opacity-70 transition-transform group-hover:scale-[1.1]"
                        src={screenshotRepo}
                        alt="screenshot of the github repository"
                        priority
                    />
                    <figcaption className="text-white text-lg font-bold text-center absolute bottom-5">
                        GitHub Repository
                    </figcaption>
                </Link>
            </figure>
            <figure className="group relative rounded-md overflow-hidden">
                <Link
                    className="flex items-center justify-center flex-col gap-y-2 bg-black"
                    href="http://87.106.32.7/"
                    target="_blank"
                >
                    <Image
                        className="w-full h-full aspect-video opacity-70 transition-transform group-hover:scale-[1.1]"
                        src={screenshotWeb}
                        alt="screenshot of the website"
                        priority
                    />
                    <figcaption className="text-white text-lg font-bold text-center absolute bottom-5">Website</figcaption>
                </Link>
            </figure>
        </div>
    )
}
