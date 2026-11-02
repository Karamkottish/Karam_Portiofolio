import { Globe } from "lucide-react"
import { FaApple } from "react-icons/fa"
import { cn } from "@/lib/utils"
import { Pass, type PassLink } from "@/components/ui/Pass"
import { SectionHeader } from "@/components/ui/SectionHeader"
import {
    type YearMonth, currentMonth, formatSpan, longMonth, monthsBetween, parseLocation, parsePeriod, shortMonth, toIndex,
} from "@/lib/route"

// Data Structure
type Role = {
    title: string
    period: string
    location?: string
    description?: string
    skills?: string[]
}

type ExperienceItem = {
    company: string
    roles: Role[]
    type: string // Full-time, Freelance, etc.
    iosApp?: { name: string; url: string } // App Store link for an app built at this company
    website?: { name: string; url: string } // Company / product website
}

const experiences: ExperienceItem[] = [
    {
        company: "Sama Tech",
        type: "Full-time",
        iosApp: { name: "Sama BTU", url: "https://apps.apple.com/sa/app/sama-btu/id6819293132" },
        website: { name: "sama-tech.ae/btu", url: "https://sama-tech.ae/btu/" },
        roles: [
            {
                title: "Full Stack Developer",
                period: "Apr 2026 - Present",
                location: "Damascus, Syria - Onsite",
                description: "Building client websites end-to-end — frontend, backend (Node.js), and Flutter — based on client needs.",
                skills: ["Frontend", "Node.js", "Flutter"]
            }
        ]
    },
    {
        company: "Tariquk | طريقك",
        type: "Freelance",
        website: { name: "tariquk.com", url: "https://tariquk.com/" },
        roles: [
            {
                title: "Product Manager",
                period: "Aug 2026 - Present",
                location: "Riyadh, Saudi Arabia - Remote",
                description: "Managing a team of 6 members."
            }
        ]
    },
    {
        company: "Freelancer.com",
        type: "Freelance",
        roles: [
            {
                title: "Full-stack Developer",
                period: "Jan 2026 - Present",
                location: "Riyadh Region - Remote",
                description: "Building Full Stack Apps in ReactJs & NextJs and flutter and react native and php as backend",
                skills: ["Mobile Application Development", "Mobile Applications", "Next.js", "Flutter"]
            }
        ]
    },
    {
        company: "NPT Solutions",
        type: "Full-time",
        roles: [
            {
                title: "Full Stack Engineer",
                period: "Jan 2026 - Nov 2026",
                location: "Bengaluru - Remote"
            },
            {
                title: "Associate Software Engineer",
                period: "Sep 2025 - Jan 2026",
                location: "Bangalore Urban",
                description: "Flutter Developer and Frontend Web Developer"
            }
        ]
    },
    {
        company: "Paws Pal Connect",
        type: "Full-time",
        roles: [
            {
                title: "Full-Stack Developer (Promoted)",
                period: "Aug 2025 - Aug 2026",
                description: "Transitioned from Team Lead to Full-Stack Developer to oversee end-to-end development of pet-tech solutions. Architecting scalable backends using FastAPI, integrating Next.js/React frontends with internal APIs, and maintaining product vision while leading technical execution.",
                skills: ["Front-End Development", "Mobile Application Development"]
            },
            {
                title: "Associate Software Engineer (Flutter TeamLeader)",
                period: "Sep 2025 - Aug 2026",
                description: "Developing the app from Scratch",
                skills: ["GitHub", "Firebase"]
            },
            {
                title: "Social Media Admin",
                period: "Sep 2025 - Nov 2025",
                description: "Managed Facebook and LinkedIn pages to strengthen brand presence and engagement."
            }
        ]
    },
    {
        company: "Vica Web Solutions",
        type: "Internship",
        roles: [
            {
                title: "Frontend Web Developer Intern",
                period: "Sep 2025 - Nov 2026",
                location: "Damascus - Remote",
                description: "Passionate about creating user-friendly, responsive, and visually appealing web applications.",
                skills: ["GitHub", "React.js", "Tailwind CSS"]
            }
        ]
    },
    {
        company: "Springer Capital",
        type: "Full-time",
        roles: [
            {
                title: "Frontend Software Engineer - Team Lead",
                period: "Jan 2025 - Nov 2025",
                location: "Chicago, IL - Remote",
                description: "Led frontend development using React.js, Next.js, and TypeScript for enterprise-grade web applications. Integrated REST & GraphQL APIs and ensured WCAG accessibility compliance.",
                skills: ["React.js", "Next.js", "TypeScript", "GraphQL"]
            }
        ]
    },
    {
        company: "SoftTechSyria",
        type: "Part-time",
        roles: [
            {
                title: "Flutter Developer",
                period: "Jan 2025 - Oct 2025",
                location: "Damascus - Remote",
                description: "Freelance Flutter dev turning ideas into fast, beautiful apps. Built polished Flutter apps—fast, stable, production-ready.",
                skills: ["Stripe", "SOLID", "MVC", "Clean Architecture"]
            }
        ]
    },
    {
        company: "focal X agency",
        type: "Full-time",
        roles: [
            {
                title: "Flutter Developer",
                period: "Feb 2024 - Jun 2024",
                location: "Damascus - Remote",
                description: "Completed an advanced program in Flutter and Dart. Applied advanced state management patterns (Provider, Riverpod, GetX, BLoC).",
                skills: ["GitHub", "Firebase", "REST APIs", "Bloc"]
            }
        ]
    }
]

/** Everything one pass shows, worked out from the raw entry. */
function toPass(item: ExperienceItem, now: YearMonth) {
    const periods = item.roles.map((role) => parsePeriod(role.period, now))
    const starts = periods.map((p) => p.start).filter((ym): ym is YearMonth => ym !== null)
    const ends = periods.map((p) => p.end).filter((ym): ym is YearMonth => ym !== null)
    const start = starts.length ? starts.reduce((a, b) => (toIndex(b) < toIndex(a) ? b : a)) : null
    const end = ends.length ? ends.reduce((a, b) => (toIndex(b) > toIndex(a) ? b : a)) : null
    const present = periods.some((p) => p.present)
    const months = start && end ? monthsBetween(start, end) : 0
    const base = item.roles.map((role) => parseLocation(role.location)).find(Boolean) ?? null

    const links: PassLink[] = []
    if (item.iosApp) links.push({ label: item.iosApp.name, href: item.iosApp.url, icon: <FaApple className="size-3.5" aria-hidden="true" /> })
    if (item.website) links.push({ label: item.website.name, href: item.website.url, icon: <Globe className="size-3.5" aria-hidden="true" /> })

    return {
        start,
        from: start ? shortMonth(start) : undefined,
        to: present ? "NOW" : end ? shortMonth(end) : "—",
        duration: months ? formatSpan(months) : undefined,
        routeLabel: [
            start && `${longMonth(start)} to ${present ? "now" : end ? longMonth(end) : "unknown"}`,
            months && formatSpan(months, true),
        ].filter(Boolean).join(", "),
        status: present ? ("in-flight" as const) : ("landed" as const),
        base,
        tags: [...new Set(item.roles.flatMap((role) => role.skills ?? []))],
        links,
    }
}

function Legs({ roles }: { roles: Role[] }) {
    const multiple = roles.length > 1

    return (
        <ol className={cn("space-y-4", multiple && "border-l border-border pl-4")}>
            {roles.map((role) => (
                <li key={role.title + role.period} className="relative">
                    {multiple && (
                        <span className="absolute -left-[21px] top-2 size-2.5 rounded-full border-2 border-(--signal) bg-card" aria-hidden="true" />
                    )}
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                        <h4 className="text-lg font-semibold leading-snug text-foreground">{role.title}</h4>
                        {multiple && (
                            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">{role.period}</span>
                        )}
                    </div>
                    {role.description && <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{role.description}</p>}
                </li>
            ))}
        </ol>
    )
}

export function Experience() {
    // Static export: "now" is the build date, which is also when "Present" roles were last true
    const now = currentMonth()
    const passes = experiences.map((item) => ({ item, pass: toPass(item, now) }))
    const roleCount = experiences.reduce((sum, item) => sum + item.roles.length, 0)
    const earliest = passes
        .map(({ pass }) => pass.start)
        .filter((ym): ym is YearMonth => ym !== null)
        .reduce((a, b) => (toIndex(b) < toIndex(a) ? b : a))

    return (
        <section id="experience" className="relative py-24 md:py-32 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    index="02"
                    label="Logbook"
                    title={{ dev: "Where I've shipped", pm: "Where I've led" }}
                    subtitle={{
                        dev: "Every role as a pass: when it ran, where it was based, and what I built there.",
                        pm: "The teams I've led and served, with dates, base and what each role owned.",
                    }}
                    meta={`${experiences.length} companies · ${roleCount} roles · since ${shortMonth(earliest)}`}
                />

                <ol className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {passes.map(({ item, pass }, index) => (
                        <li key={item.company} className="flex">
                            <Pass
                                className="w-full"
                                serial={String(index + 1).padStart(2, "0")}
                                kicker={item.type}
                                title={item.company}
                                status={pass.status}
                                from={pass.from}
                                to={pass.to}
                                duration={pass.duration}
                                routeLabel={pass.routeLabel}
                                fields={[
                                    {
                                        label: "Base",
                                        value: pass.base ? `${pass.base.code} · ${pass.base.city}` : "—",
                                        title: pass.base?.place,
                                    },
                                    { label: "Mode", value: pass.base?.mode ?? "—" },
                                    { label: "Roles", value: item.roles.length },
                                ]}
                                tags={pass.tags}
                                links={pass.links}
                            >
                                <Legs roles={item.roles} />
                            </Pass>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    )
}
