import { Pass } from "@/components/ui/Pass"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { currentMonth, formatSpan, parseLocation } from "@/lib/route"

type EducationItem = {
    school: string
    degree: string
    /** Short name of the qualification for the pass header */
    award: string
    field: string
    from?: number
    /** Graduation, or omit while still studying */
    to?: { label: string; spoken: string; year: number }
    location: string
    tags: string[]
}

const educationData: EducationItem[] = [
    {
        school: "Al-Sham Private University",
        degree: "Bachelor of Engineering, Informatics Engineering",
        award: "Bachelor of Engineering",
        field: "Informatics",
        from: 2020,
        location: "Damascus, Syria",
        tags: ["GitLab", "Coding standards", "+12 skills"],
    },
    {
        school: "Future Window International School",
        degree: "High School Diploma, High School/Secondary Diplomas and Certificates",
        award: "High school diploma",
        field: "Scientific",
        to: { label: "MAY 18", spoken: "May 2018", year: 2018 },
        location: "Riyadh, Saudi Arabia",
        tags: ["Scientific section"],
    },
]

export function Education() {
    const now = currentMonth()

    return (
        <section id="education" className="relative py-24 md:py-32 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    index="06"
                    label="Origin"
                    title="Where it started"
                    subtitle={{
                        dev: "The foundation behind the engineering: informatics, systems and a lot of late-night builds.",
                        pm: "The foundation behind the product thinking: structured problem solving before shipping.",
                    }}
                />

                <ol className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {educationData.map((item, index) => {
                        const base = parseLocation(item.location)
                        const studying = !item.to
                        const years = item.from ? (item.to?.year ?? now.y) - item.from : 0
                        return (
                            <li key={item.school} className="flex">
                                <Pass
                                    className="w-full"
                                    serial={String(index + 1).padStart(2, "0")}
                                    kicker={item.award}
                                    title={item.school}
                                    status={studying ? "in-flight" : "landed"}
                                    from={item.from ? String(item.from) : undefined}
                                    to={studying ? "NOW" : item.to!.label}
                                    duration={years ? formatSpan(years * 12) : undefined}
                                    routeLabel={studying ? `${item.from} to now` : `Graduated ${item.to!.spoken}`}
                                    fields={[
                                        { label: "Base", value: base ? `${base.code} · ${base.city}` : "—", title: item.location },
                                        { label: "Field", value: item.field },
                                        { label: "Status", value: studying ? "Studying" : "Graduated" },
                                    ]}
                                    tags={item.tags}
                                >
                                    <p className="text-sm leading-relaxed text-muted-foreground">{item.degree}</p>
                                </Pass>
                            </li>
                        )
                    })}
                </ol>
            </div>
        </section>
    )
}
