"use client"

import { useRef, useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Github, ExternalLink, Folders, Smartphone, Globe, MessageSquare, Leaf, Rocket, PlayCircle, X, Building2, Car } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePerspective } from "@/components/PerspectiveProvider"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { SAMA_BTU_APP_ID, SAMA_BTU_APP_STORE_URL, appStoreListing } from "@/data/app-store"

// Icons
import {
    FaReact, FaPhp, FaAws, FaGithub, FaStripe, FaPython, FaAndroid, FaApple
} from "react-icons/fa"
import {
    SiTailwindcss, SiThreedotjs, SiVite, SiFirebase, SiFlutter,
    SiFastapi, SiMysql, SiSqlite, SiDjango, SiOpencv,
    SiJavascript, SiTypescript, SiNasa,
    SiNestjs, SiPostgresql, SiPrisma, SiRedis, SiCloudflare
} from "react-icons/si"
import { TbBrandNextjs, TbApi, TbDatabase, TbWorld } from "react-icons/tb"
import { MdOutlineCleanHands, MdArchitecture, MdLanguage } from "react-icons/md"

type TechItem = {
    name: string
    icon: React.ComponentType<any>
}

type Project = {
    title: string
    role: string
    year: string
    description: string
    techStack: TechItem[]
    icon: React.ReactNode
    github?: string
    website?: string
    ios?: string // App Store listing
    android?: string | "coming_soon"
    pmDescription?: string
    pmRole?: string
    video?: string
}

// Icon Mapping Helper
const Icons = {
    React: FaReact,
    Tailwind: SiTailwindcss,
    ThreeJS: SiThreedotjs,
    Vite: SiVite,
    NASA: SiNasa,
    Physics: MdOutlineCleanHands, // Placeholder for Physics
    Firebase: SiFirebase,
    Flutter: SiFlutter,
    FastAPI: SiFastapi,
    AWS: FaAws,
    GitHub: FaGithub,
    PHP: FaPhp,
    MySQL: SiMysql,
    SQLite: SiSqlite,
    Django: SiDjango,
    Stripe: FaStripe,
    Python: FaPython,
    JS: SiJavascript,
    TS: SiTypescript,
    CleanArch: MdArchitecture,
    Web: TbWorld,
    Database: TbDatabase,
    API: TbApi,
    Lang: MdLanguage
}

// Version and date come from the App Store at build time (scripts/fetch-app-store.mjs)
const samaBtu = appStoreListing(SAMA_BTU_APP_ID)

const projects: Project[] = [
    {
        title: "Sama BTU",
        role: "Full Stack Developer",
        year: samaBtu?.released.slice(0, 4) ?? "2026",
        description: `Property and energy-billing platform: buildings, apartments and tenants in one workspace, per-apartment BTU consumption from sensors, scheduled billing cycles, Stripe card payments and live push alerts, in English, Arabic and Urdu. ${samaBtu ? `iOS app v${samaBtu.version} is live on the App Store.` : "The iOS app is live on the App Store."}`,
        pmDescription: "Four user types (admin, investor, employee, tenant) with a visual permission builder, billing rules set once and run on a schedule, and reminders by app, email and SMS to speed up collection. Full right-to-left support for the region.",
        techStack: [
            { name: "React", icon: FaReact },
            { name: "Vite", icon: SiVite },
            { name: "Tailwind CSS", icon: SiTailwindcss },
            { name: "Firebase Push", icon: SiFirebase },
            { name: "Stripe", icon: FaStripe },
            { name: "EN · AR · UR", icon: MdLanguage }
        ],
        icon: <Building2 className="w-10 h-10" />,
        ios: samaBtu?.url ?? SAMA_BTU_APP_STORE_URL,
        website: "https://sama-tech.ae/btu/"
    },
    {
        title: "Kol Shei",
        role: "Full Stack Developer",
        year: "2026",
        description: "Online store for spare parts for Chinese cars, shipped from China to Damascus. A VIN check blocks wrong orders before checkout, a 50% Sham Cash deposit commits each order, and a four-stage timeline tracks it to pickup. I built the Next.js site and the NestJS API behind it. Live in demo mode until payments are connected.",
        pmDescription: "Shaped the brief into a launch scope: a triple check (VIN, model, photo) against wrong orders, deposit-first payments so no factory order goes out unpaid, and a staff console for orders, stock and handover. Live in demo mode until payments are connected.",
        techStack: [
            { name: "Next.js", icon: TbBrandNextjs },
            { name: "NestJS", icon: SiNestjs },
            { name: "PostgreSQL", icon: SiPostgresql },
            { name: "Prisma", icon: SiPrisma },
            { name: "Redis", icon: SiRedis },
            { name: "Cloudflare", icon: SiCloudflare }
        ],
        icon: <Car className="w-10 h-10" />,
        website: "https://kol-shei.com/"
    },
    {
        title: "Paws Pal Connect",
        role: "Product Manager • Full Stack Developer",
        year: "2025",
        description: "End-to-end pet-care platform led as Product Manager and Flutter Team Lead. Defined roadmap and MVP scope, conducted user interviews... +32% Engagement.",
        pmDescription: "Led cross-functional team of 4 from ideation to launch. Defined product roadmap, conducted user research resulting in +32% engagement, and managed agile sprints.",
        pmRole: "Product Manager",
        techStack: [
            { name: "Flutter", icon: SiFlutter },
            { name: "Fast API", icon: SiFastapi },
            { name: "Firebase", icon: SiFirebase },
            { name: "AWS", icon: FaAws },
            { name: "AI Integration", icon: TbApi }
        ],
        icon: <Folders className="w-10 h-10" />,
        github: "https://github.com/pawspalconnect/ppc",
        website: "https://www.pawspalconnect.com/",
        android: "coming_soon"
    },
    {
        title: "Cosmic Journey",
        role: "Frontend Developer",
        year: "2026",
        description: "A high-fidelity, scroll-driven 3D simulation of the solar system. Features cinematic transitions, real-time NASA data integration, and scientifically accurate Keplerian orbital mechanics.",
        techStack: [
            { name: "Three.js", icon: SiThreedotjs },
            { name: "React", icon: FaReact },
            { name: "Vite", icon: SiVite },
            { name: "NASA API", icon: SiNasa },
            { name: "Physics", icon: MdArchitecture }
        ],
        icon: <Rocket className="w-10 h-10" />,
        github: "https://github.com/Karamkottish/Solarsystem3D"
    },
    {
        title: "BustaniPlus",
        role: "React Native Developer",
        year: "2025",
        description: "Reimagining agritourism with a scalable mobile platform that connects farms to visitors. Features seamless booking for tours and cultural experiences, driving sustainable tourism and economic growth in alignment with Vision 2030.",
        techStack: [
            { name: "React Native", icon: FaReact },
            { name: "Tailwind CSS", icon: SiTailwindcss },
            { name: "AgriTech", icon: Leaf as React.ComponentType<any> },
            { name: "Vision 2030", icon: Globe as React.ComponentType<any> }
        ],
        icon: <Leaf className="w-10 h-10" />,
        github: "https://github.com/Karamkottish/BustaniPlus",
        video: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/Bustaniapp-video.mp4`
    },
    {
        title: "Karam University",
        role: "Solo React Native Developer",
        year: "2025",
        description: "Modern, clean, trendy university platform with 3D UI and responsive UX. Built in Flutter with Firebase integration and scalable architecture.",
        techStack: [
            { name: "React Native", icon: FaReact },
            { name: "Firebase", icon: SiFirebase },
            { name: "3D Design", icon: SiThreedotjs },
            { name: "Full Stack", icon: TbDatabase }
        ],
        icon: <Smartphone className="w-10 h-10" />,
        github: "https://github.com/Karamkottish/MyUniversity"
    },
    {
        title: "E-commerce Web",
        role: "Frontend Web Developer",
        year: "2024",
        description: "Medical dashboard web application built with React.js, featuring product management, UI components, and clean responsive design.",
        pmDescription: "Designed an intuitive merchant dashboard flow. Reduced inventory management time by 40% through UX improvements and clear data visualization.",
        pmRole: "Product Owner",
        techStack: [
            { name: "React.js", icon: FaReact },
            { name: "JavaScript", icon: SiJavascript },
            { name: "Responsive", icon: Smartphone as React.ComponentType<any> },
            { name: "Clean UI", icon: MdOutlineCleanHands }
        ],
        icon: <Globe className="w-10 h-10" />,
        github: "https://github.com/AbdallahZagh/E-commerce-web/tree/store_dashboard"
    },
    {
        title: "Chatly",
        role: "Backend Developer",
        year: "2026",
        description: "An exclusive, real-time messaging platform designed for seamless private communication. Engineered a robust backend using PHP with a Next.js frontend, implementing secure authentication and optimized database interactions for instant message delivery.",
        techStack: [
            { name: "PHP", icon: FaPhp },
            { name: "Next.js", icon: TbBrandNextjs },
            { name: "Real-time", icon: TbApi },
            { name: "Secure Auth", icon: MdArchitecture }
        ],
        icon: <MessageSquare className="w-10 h-10" />,
        github: "https://github.com/AbdallahZagh/chatly"
    },
    {
        title: "SoftTech Warehouse",
        role: "Part-time Developer",
        year: "2025",
        description: "Warehouse management mobile app (internal tooling). Optimized for performance and offline capabilities.",
        techStack: [
            { name: "Flutter", icon: SiFlutter },
            { name: "REST API", icon: TbApi },
            { name: "SQLite", icon: SiSqlite },
            { name: "Clean Arch", icon: MdArchitecture }
        ],
        icon: <Smartphone className="w-10 h-10" />,
        github: "https://github.com/Karamkottish/WareHouse-Flutter"
    },
    {
        title: "Graduation App 'Revonix'",
        role: "Flutter Lead",
        year: "2025",
        description: "Connecting Labors with Clients, offline cache, video demo. Complex integration with multiple payment gateways.",
        techStack: [
            { name: "Flutter", icon: SiFlutter },
            { name: "Django", icon: SiDjango },
            { name: "Stripe", icon: FaStripe },
            { name: "Firebase", icon: SiFirebase }
        ],
        icon: <Smartphone className="w-10 h-10" />,
        github: "https://gitlab.com/revonix1/revonix-frontend"
    },
    {
        title: "Shein Replica App",
        role: "Solo Developer",
        year: "2024",
        description: "Developed a mobile application that replicates the shopping experience of Shein, offering users an intuitive interface to browse and purchase fashion items with ease.",
        techStack: [
            { name: "Flutter", icon: SiFlutter },
            { name: "Firebase", icon: SiFirebase },
            { name: "Stripe", icon: FaStripe },
            { name: "Responsive", icon: Smartphone as React.ComponentType<any> }
        ],
        icon: <Smartphone className="w-10 h-10" />,
        github: "#"
    },
    {
        title: "Change Volunteering App",
        role: "Flutter Lead",
        year: "2023",
        description: "Semester Project. Connect volunteers with companies, theming, analytics.",
        techStack: [
            { name: "Getx", icon: SiFlutter }, // Using Flutter icon as proxy for GetX
            { name: "Theming", icon: MdOutlineCleanHands },
            { name: "Analytics", icon: TbDatabase }
        ],
        icon: <Smartphone className="w-10 h-10" />,
        github: "https://github.com/Karamkottish/Change-ASPU/tree/flutter"
    }
]

// Anchor the hero's departures board links to, e.g. "#project-paws-pal-connect"
function projectAnchor(title: string) {
    return `project-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`
}

// An icon link in a card's header; the label is the tooltip and what screen readers hear
function CardLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className="relative z-20 rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-(--signal) focus-visible:outline-2 focus-visible:outline-ring"
        >
            {children}
        </a>
    )
}

function ProjectCard({ project, index, mode }: { project: Project; index: number; mode: "pm" | "dev" }) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isHovered, setIsHovered] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    function handleMouseEnter() {
        setIsHovered(true)
        if (videoRef.current) {
            // Unmute just in case, though muted attribute is usually enough
            videoRef.current.play().catch(() => {})
        }
    }

    function handleMouseLeave() {
        setIsHovered(false)
        if (videoRef.current) {
            videoRef.current.pause()
            videoRef.current.currentTime = 0
        }
    }

    return (
        <div
            id={projectAnchor(project.title)}
            className="reveal group relative h-full scroll-mt-24"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {mounted && typeof document !== "undefined" && createPortal(
                <AnimatePresence>
                    {isModalOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-100 flex items-center justify-center bg-black/85 p-4 sm:p-8"
                            onClick={() => setIsModalOpen(false)}
                        >
                            <button
                                aria-label="Close video"
                                className="absolute top-6 right-6 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-101"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsModalOpen(false);
                                }}
                            >
                                <X className="w-6 h-6" />
                            </button>
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                                className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <video
                                    src={project.video}
                                    className="w-full h-full"
                                    controls
                                    autoPlay
                                    playsInline
                                />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
            <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-(--signal)/50">
                {/* Background Video */}
                {project.video && (
                    <div
                        className={cn(
                            "absolute inset-0 z-0 overflow-hidden transition-opacity duration-700 pointer-events-none",
                            isHovered ? "opacity-100" : "opacity-0"
                        )}
                    >
                        <video
                            ref={videoRef}
                            src={project.video}
                            className="w-full h-full object-cover opacity-20 dark:opacity-30"
                            loop
                            muted
                            playsInline
                            preload="none"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-card via-card/70 to-card/20" />
                    </div>
                )}

                <header className="relative z-10 flex items-center justify-between gap-3 border-b border-border px-6 py-3">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                        <span className="text-(--signal)">{String(index + 1).padStart(2, "0")}</span> · {project.year}
                    </p>
                    <div className="-mr-2 flex items-center">
                        {project.video && (
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setIsModalOpen(true);
                                }}
                                aria-label={`Watch the ${project.title} video`}
                                title="Watch video"
                                className="relative z-20 rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-(--signal) focus-visible:outline-2 focus-visible:outline-ring"
                            >
                                <PlayCircle className="w-[18px] h-[18px]" />
                            </button>
                        )}
                        {project.android && (
                            project.android === "coming_soon" ? (
                                <span title="Android version coming soon" className="p-2 text-muted-foreground/60 cursor-not-allowed">
                                    <FaAndroid className="w-[18px] h-[18px]" aria-hidden="true" />
                                    <span className="sr-only">Android version coming soon</span>
                                </span>
                            ) : (
                                <CardLink href={project.android} label={`${project.title} on Google Play`}>
                                    <FaAndroid className="w-[18px] h-[18px]" />
                                </CardLink>
                            )
                        )}
                        {project.ios && (
                            <CardLink href={project.ios} label={`${project.title} on the App Store`}>
                                <FaApple className="w-[18px] h-[18px]" />
                            </CardLink>
                        )}
                        {project.website && (
                            <CardLink href={project.website} label={`Visit the ${project.title} website`}>
                                <ExternalLink className="w-[18px] h-[18px]" />
                            </CardLink>
                        )}
                        {project.github && project.github !== "#" && (
                            <CardLink href={project.github} label={`${project.title} source code`}>
                                <Github className="w-[18px] h-[18px]" />
                            </CardLink>
                        )}
                    </div>
                </header>

                <div className="relative z-10 flex flex-1 flex-col px-6 pt-5 pb-6">
                    <div className="flex items-center gap-3">
                        <span className="grid size-11 shrink-0 place-items-center rounded bg-muted text-(--signal) [&_svg]:size-5" aria-hidden="true">
                            {project.icon}
                        </span>
                        <p className="font-mono text-[11px] uppercase leading-snug tracking-[0.12em] text-muted-foreground">
                            {mode === "pm" && project.pmRole ? project.pmRole : project.role}
                        </p>
                    </div>

                    <h3 className="mt-4 font-display text-4xl font-extrabold uppercase leading-[0.9] tracking-tight text-foreground">
                        {project.title}
                    </h3>

                    <p className="mt-3 grow text-sm leading-relaxed text-muted-foreground">
                        {mode === "pm" && project.pmDescription ? project.pmDescription : project.description}
                    </p>

                    <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Stack">
                        {project.techStack.map((tech) => {
                            const Icon = tech.icon
                            return (
                                <li key={tech.name} className="inline-flex items-center gap-1.5 rounded bg-muted px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-foreground">
                                    <Icon className="size-3.5 text-muted-foreground" aria-hidden="true" />
                                    {tech.name}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </article>
        </div>
    )
}

export function Projects() {
    const { mode } = usePerspective()

    return (
        <section id="projects" className="relative py-24 md:py-32 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    index="04"
                    label="Case files"
                    title={{ dev: "Featured projects", pm: "Product case studies" }}
                    subtitle={{
                        dev: "Recent technical work, from shipped mobile apps to web platforms and the APIs behind them.",
                        pm: "Product lifecycles I've owned or shaped, with the strategy and the outcome.",
                    }}
                    meta={`${projects.length} case files`}
                />

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.title} project={project} index={index} mode={mode} />
                    ))}
                </div>
            </div>
        </section>
    )
}
