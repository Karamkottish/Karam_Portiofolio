import { Wrench } from "lucide-react"
import { cn } from "@/lib/utils"
import { Flap } from "@/components/ui/Flap"
import { Swap } from "@/components/ui/Swap"
import { PerspectiveSwitch } from "@/components/ui/PerspectiveSwitch"
import { SectionHeader } from "@/components/ui/SectionHeader"

type Line = { label: string; items: string[] }

// Each row is one line of the board; its engineering and product faces flip together
const toolchain: { dev: Line; pm: Line }[] = [
    {
        dev: { label: "Mobile", items: ["Flutter", "React Native", "GetX", "Firebase", "Supabase"] },
        pm: { label: "Discovery", items: ["User research", "Market research", "Customer journey", "Wireframing", "Figma"] },
    },
    {
        dev: { label: "Web", items: ["React", "Next.js", "TypeScript", "Tailwind", "Three.js"] },
        pm: { label: "Delivery", items: ["Agile", "Scrum", "Sprint planning", "Jira", "Risk management"] },
    },
    {
        dev: { label: "Backend", items: ["Node.js", "FastAPI", "PHP", "Python", "GraphQL"] },
        pm: { label: "Strategy", items: ["Roadmapping", "Vision", "Prioritization", "Go-to-market", "Stakeholders"] },
    },
    {
        dev: { label: "Data & ops", items: ["PostgreSQL", "MySQL", "AWS", "Docker", "Git"] },
        pm: { label: "Metrics", items: ["Product KPIs", "A/B testing", "Data analysis", "Growth metrics", "Value prop"] },
    },
]

const languages = [
    { name: "Arabic", level: "Native", percentage: 100 },
    { name: "English", level: "Professional", percentage: 90 },
]

const workingStyle = ["Product management", "Team leadership", "Strategic thinking", "Clear communication"]

// Tiles flip as a diagonal wave across the board
const WAVE_MS = 40

function SpokenToolchain({ face }: { face: "dev" | "pm" }) {
    return (
        <ul className={cn("sr-only", face === "dev" ? "pm:hidden" : "dev:hidden")}>
            {toolchain.map((line) => (
                <li key={line[face].label}>
                    {line[face].label}: {line[face].items.join(", ")}
                </li>
            ))}
        </ul>
    )
}

export function Skills() {
    return (
        <section id="skills" className="relative py-24 md:py-32 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    index="03"
                    label="Toolchain"
                    title={{ dev: "What I build with", pm: "How I run product" }}
                    subtitle="Flip the board to switch between the engineering stack and the product toolkit."
                />

                <div className="board reveal rounded-2xl p-3 sm:p-4 font-mono">
                    <div className="flex items-center justify-between gap-3 pb-3 pl-1">
                        <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-(--flap-ink)">
                            <Wrench className="w-3.5 h-3.5" aria-hidden="true" />
                            <Swap dev="Stack" pm="Toolkit" />
                        </p>
                        <PerspectiveSwitch />
                    </div>

                    <SpokenToolchain face="dev" />
                    <SpokenToolchain face="pm" />

                    <div className="space-y-2.5 sm:space-y-1.5" aria-hidden="true">
                        {toolchain.map((line, row) => (
                            <div key={line.dev.label} className="grid grid-cols-2 gap-1 sm:grid-cols-[7.5rem_repeat(5,minmax(0,1fr))]">
                                <Flap
                                    className="col-span-2 sm:col-span-1 text-(--signal)"
                                    dev={line.dev.label}
                                    pm={line.pm.label}
                                    delay={row * WAVE_MS}
                                />
                                {line.dev.items.map((item, col) => (
                                    <Flap
                                        key={item}
                                        dev={item}
                                        pm={line.pm.items[col]}
                                        delay={(row + col + 1) * WAVE_MS}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-2">
                    <div className="board reveal rounded-2xl p-3 sm:p-4 font-mono">
                        <h3 className="pb-3 pl-1 text-[11px] uppercase tracking-[0.22em] text-(--flap-ink)">Languages</h3>
                        <ul className="space-y-1.5">
                            {languages.map((lang) => (
                                <li key={lang.name} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] gap-1">
                                    <span className="board-cell px-3 py-2 text-xs uppercase tracking-[0.06em] font-semibold">{lang.name}</span>
                                    <span className="board-cell px-3 py-2 text-xs uppercase tracking-[0.06em] text-(--flap-dim)">{lang.level}</span>
                                    {/* A ten-segment meter, read as the level text above */}
                                    <span className="board-cell flex items-center gap-0.5 px-3" aria-hidden="true">
                                        {Array.from({ length: 10 }, (_, i) => (
                                            <span
                                                key={i}
                                                className={cn("h-3 w-1.5 rounded-[1px]", i < lang.percentage / 10 ? "bg-(--signal)" : "bg-(--board)")}
                                            />
                                        ))}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="board reveal rounded-2xl p-3 sm:p-4 font-mono">
                        <h3 className="pb-3 pl-1 text-[11px] uppercase tracking-[0.22em] text-(--flap-ink)">Working style</h3>
                        <ul className="grid grid-cols-2 gap-1.5">
                            {workingStyle.map((item) => (
                                <li key={item} className="board-cell px-3 py-2 text-xs uppercase tracking-[0.06em]">{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}
