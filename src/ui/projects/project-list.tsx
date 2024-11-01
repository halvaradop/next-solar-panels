import { Project } from "./project"

export const ProjectList = () => {
    return (
        <section className="mt-20">
            <h2 className="text-2xl font-medium">OUR PROJECTS</h2>
            <section className="mt-4 mb-8 w-full flex items-center justify-center gap-x-5">
                <div className="w-1/2 aspect-square bg-neutral-300"></div>
                <div className="w-1/2 aspect-square bg-neutral-300"></div>
                <div className="w-1/2 hidden aspect-square bg-neutral-300 base:block"></div>
            </section>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis blanditiis sit adipisci itaque ipsam porro
                reprehenderit maiores vitae soluta!
            </p>
            <section className="mt-10 mb-20 article:border-t">
                <Project title="Project 1" city="City 1" year="2021" />
                <Project title="Project 2" city="City 2" year="2022" />
                <Project className="border-b" title="Project 3" city="City 3" year="2023" />
            </section>
        </section>
    )
}
