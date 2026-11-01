import { ArrowRight, Download } from "lucide-react"
import { DepartureBoard } from "@/components/ui/DepartureBoard"
import { departures } from "@/data/departures"
import { profiles } from "@/data/contact"
import { formatDate } from "@/lib/utils"

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""

// The same proof the board shows, for search engines and AI assistants
const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Person",
            "@id": "#karam-kottish",
            name: "Karam Kottish",
            jobTitle: "Full-Stack Software Engineer & Product Manager",
            knowsAbout: ["Flutter", "React Native", "Next.js", "FastAPI", "Product management"],
            sameAs: profiles.map((profile) => profile.href),
        },
        ...departures.map((departure) => ({
            "@type": "CreativeWork",
            name: departure.product,
            dateCreated: departure.year,
            creator: { "@id": "#karam-kottish" },
            keywords: [...departure.dev.stack, ...departure.dev.platform].join(", "),
            ...(departure.liveUrl && { url: departure.liveUrl }),
        })),
    ],
}

export function Hero() {
    // Static export: this is the build (deploy) time
    const deployedAt = new Date()

    return (
        <section id="hero" className="relative min-h-svh w-full flex items-center bg-background pt-28 pb-16 lg:pt-24">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

            {/* Side by side only from xl: below that the board's columns get too narrow and it stacks under the copy */}
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-12 xl:gap-14 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.35fr)] items-center">
                <div>
                    <p className="flex items-center gap-2 mb-6 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        <span className="size-2 rounded-full bg-emerald-500" aria-hidden="true" />
                        Available for full-time &amp; freelance
                    </p>

                    <h1 className="font-display text-7xl sm:text-8xl font-black uppercase tracking-tight leading-[0.84] text-foreground">
                        <span className="block">Karam</span>{" "}
                        <span className="block">Kottish</span>
                    </h1>

                    <p className="persp-swap mt-6 text-xl md:text-2xl font-semibold tracking-tight text-foreground">
                        <span className="persp-dev">
                            <span className="text-(--accent-dev)">Full-stack engineer</span>{" "}
                            <span className="font-normal text-muted-foreground">who also runs product.</span>
                        </span>
                        <span className="persp-pm">
                            <span className="text-(--accent-pm)">Product manager</span>{" "}
                            <span className="font-normal text-muted-foreground">who still ships the code.</span>
                        </span>
                    </p>

                    <p className="persp-swap mt-4 max-w-xl text-base md:text-lg leading-relaxed text-muted-foreground">
                        <span className="persp-dev">
                            I build web and mobile products end-to-end in Flutter, React Native, Next.js and FastAPI, and I&apos;ve taken 10+ of them to production.
                        </span>
                        <span className="persp-pm">
                            I turn business goals into shipped roadmaps: discovery, specs and cross-functional delivery. My last launch lifted engagement 32%.
                        </span>
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-3">
                        <a
                            href="#projects"
                            className="group inline-flex items-center gap-2 h-12 px-6 rounded-full bg-foreground text-background font-semibold transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                        >
                            View work
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                        </a>
                        <a
                            href={`${basePath}/Cv/CV10.pdf`}
                            download="Karam_Kottish_CV.pdf"
                            className="inline-flex items-center gap-2 h-12 px-6 rounded-full border border-border text-foreground font-semibold transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                        >
                            <Download className="w-4 h-4" aria-hidden="true" />
                            Download CV
                        </a>
                    </div>

                    <p className="mt-8 font-mono text-xs text-muted-foreground">
                        3+ years shipping · Last deploy <time dateTime={deployedAt.toISOString()}>{formatDate(deployedAt)}</time>
                    </p>
                </div>

                <DepartureBoard departures={departures} />
            </div>
        </section>
    )
}
