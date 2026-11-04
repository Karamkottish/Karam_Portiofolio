"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Github, ExternalLink, Folders, Smartphone, Globe, MessageSquare, Leaf, Rocket, PlayCircle, X, Building2, Car, ChevronLeft, ChevronRight } from "lucide-react"
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

type ProjectImage = {
    src: string
    /** Shown as the slide's caption and read to screen readers */
    alt: string
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
    /** Up to three 16:9 screenshots, scrolled inside the card */
    images?: ProjectImage[]
}

// Screenshots live in public/images/projects/<slug>/1.webp, 2.webp, … at 1600x900
function screenshots(slug: string, captions: string[]): ProjectImage[] {
    return captions.map((alt, i) => ({
        src: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/projects/${slug}/${i + 1}.webp`,
        alt,
    }))
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
        website: "https://sama-tech.ae/btu/",
        images: screenshots("sama-btu", [
            "Admin dashboard: electricity use per apartment, unpaid invoices and payment status for the billing cycle",
            "Tenant iOS app: apartment summary, this month's kWh and invoices with their status",
        ])
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
        website: "https://kol-shei.com/",
        images: screenshots("kol-shei", [
            "Storefront: a scroll-driven tour of chassis, lighting and engine parts",
            "VIN decoder: every group of the 17 characters is read before an order reaches the factory",
            "Four-stage tracker, from deposit paid in China to ready for pickup in Damascus",
        ])
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
        github: "https://github.com/Karamkottish/Solarsystem3D",
        images: screenshots("cosmic-journey", [
            "Scroll-driven tour that opens on the Sun, with every planet on its orbit",
            "The camera flies to each planet in turn: Saturn and its ring system",
            "Mission Control panel with live NASA feeds and mission updates",
        ])
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
        video: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/Bustaniapp-video.mp4`,
        images: screenshots("bustaniplus", [
            "Visitors find farms on a map, browse each farm's market and activities, and book a visit date",
            "AR farm tour, a farm-learning game and a stamp passport of rewards",
            "Farmer side: weather and farm overview, an AI crop scanner and smart irrigation",
        ])
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
        github: "https://gitlab.com/revonix1/revonix-frontend",
        images: screenshots("revonix", [
            "Clients sign in, browse trades and open a worker's profile with rating and location",
            "Ordering: pin the address on a map, pay through MTN Cash, then rate the job",
            "Worker side: price or reject incoming orders and show past jobs in a gallery",
        ])
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
        github: "https://github.com/Karamkottish/Change-ASPU/tree/flutter",
        images: screenshots("change", [
            "Onboarding that introduces volunteers to the app",
            "Company use cases: post opportunities, accept or remove volunteers, review history",
        ])
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

function slideNumber(n: number) {
    return String(n).padStart(2, "0")
}

function scrollBehavior(): ScrollBehavior {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
}

// A row of 16:9 slides that scrolls sideways inside the card; a slide opens the lightbox
function ProjectGallery({ title, images, onOpen }: { title: string; images: ProjectImage[]; onOpen: (index: number) => void }) {
    const trackRef = useRef<HTMLDivElement>(null)
    const [active, setActive] = useState(0)

    function handleScroll() {
        const track = trackRef.current
        if (track) setActive(Math.round(track.scrollLeft / track.clientWidth))
    }

    function goTo(index: number) {
        const track = trackRef.current
        if (track) track.scrollTo({ left: index * track.clientWidth, behavior: scrollBehavior() })
    }

    const navButton = "rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-(--signal) focus-visible:outline-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-30"

    return (
        <div className="relative z-10 border-b border-border">
            <div
                ref={trackRef}
                onScroll={handleScroll}
                tabIndex={0}
                role="region"
                aria-roledescription="carousel"
                aria-label={`${title} screenshots`}
                className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain bg-muted [scrollbar-width:none] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring [&::-webkit-scrollbar]:hidden"
            >
                {images.map((image, i) => (
                    <button
                        key={image.src}
                        type="button"
                        onClick={() => onOpen(i)}
                        aria-label={`Enlarge screenshot ${i + 1} of ${images.length}: ${image.alt}`}
                        className="aspect-video w-full shrink-0 snap-center cursor-zoom-in"
                    >
                        <img
                            src={image.src}
                            alt=""
                            width={1600}
                            height={900}
                            loading="lazy"
                            decoding="async"
                            draggable={false}
                            className="size-full object-cover"
                        />
                    </button>
                ))}
            </div>
            <div className="flex items-center gap-3 px-6 py-2.5">
                <p className="shrink-0 font-mono text-[11px] tracking-[0.18em] text-muted-foreground tabular-nums">
                    <span className="text-(--signal)">{slideNumber(active + 1)}</span>/{slideNumber(images.length)}
                </p>
                <p className="min-w-0 flex-1 text-xs leading-snug text-muted-foreground line-clamp-2">
                    {images[active]?.alt}
                </p>
                {images.length > 1 && (
                    <div className="-mr-1.5 flex shrink-0">
                        <button type="button" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Previous screenshot" className={navButton}>
                            <ChevronLeft className="size-4" />
                        </button>
                        <button type="button" onClick={() => goTo(active + 1)} disabled={active === images.length - 1} aria-label="Next screenshot" className={navButton}>
                            <ChevronRight className="size-4" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

// Full-size view of one screenshot; arrow keys step through, Escape closes
function ImageLightbox({ title, images, index, onIndex, onClose }: {
    title: string
    images: ProjectImage[]
    index: number
    onIndex: (index: number) => void
    onClose: () => void
}) {
    const count = images.length
    const step = useCallback((delta: number) => onIndex((index + delta + count) % count), [index, count, onIndex])

    useEffect(() => {
        function handleKey(e: KeyboardEvent) {
            if (e.key === "Escape") onClose()
            else if (e.key === "ArrowRight") step(1)
            else if (e.key === "ArrowLeft") step(-1)
        }
        window.addEventListener("keydown", handleKey)
        return () => window.removeEventListener("keydown", handleKey)
    }, [onClose, step])

    const image = images[index]
    const navButton = "shrink-0 rounded-full bg-white/10 p-2 text-white/70 transition-colors hover:bg-white/20 hover:text-white focus-visible:outline-2 focus-visible:outline-white"

    return (
        <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${title} screenshots`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/85 p-4 sm:p-8"
            onClick={onClose}
        >
            <button
                aria-label="Close screenshots"
                autoFocus
                className="absolute top-6 right-6 z-101 rounded-full bg-white/10 p-2 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
                onClick={onClose}
            >
                <X className="w-6 h-6" />
            </button>
            <motion.figure
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="w-full max-w-[min(72rem,calc(78vh*16/9))]"
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={image.src}
                    alt={image.alt}
                    width={1600}
                    height={900}
                    className="aspect-video w-full rounded-2xl border border-white/10 bg-card object-contain"
                />
                <figcaption className="mt-4 flex items-center gap-4 text-sm text-white/80">
                    <span className="shrink-0 font-mono text-xs tracking-[0.18em] text-white/50 tabular-nums">
                        {slideNumber(index + 1)}/{slideNumber(count)}
                    </span>
                    <span className="min-w-0 flex-1">{image.alt}</span>
                    {count > 1 && (
                        <span className="flex shrink-0 gap-2">
                            <button type="button" onClick={() => step(-1)} aria-label="Previous screenshot" className={navButton}>
                                <ChevronLeft className="size-5" />
                            </button>
                            <button type="button" onClick={() => step(1)} aria-label="Next screenshot" className={navButton}>
                                <ChevronRight className="size-5" />
                            </button>
                        </span>
                    )}
                </figcaption>
            </motion.figure>
        </motion.div>
    )
}

function ProjectCard({ project, index, mode }: { project: Project; index: number; mode: "pm" | "dev" }) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isHovered, setIsHovered] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [zoomedImage, setZoomedImage] = useState<number | null>(null)
    const [mounted, setMounted] = useState(false)
    const closeLightbox = useCallback(() => setZoomedImage(null), [])

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
                    {zoomedImage !== null && project.images && (
                        <ImageLightbox
                            key="lightbox"
                            title={project.title}
                            images={project.images}
                            index={zoomedImage}
                            onIndex={setZoomedImage}
                            onClose={closeLightbox}
                        />
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
                    {/* Kept at icon-button height so cards without links line up with the rest */}
                    <div className="-mr-2 flex min-h-8.5 items-center">
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

                {project.images?.length ? (
                    <ProjectGallery title={project.title} images={project.images} onOpen={setZoomedImage} />
                ) : (
                    // Same footprint as a gallery so cards in a row stay aligned
                    <div
                        aria-hidden="true"
                        className="relative z-10 grid aspect-video place-items-center border-b border-border bg-muted bg-[radial-gradient(hsl(var(--border))_1px,transparent_1px)] [background-size:14px_14px] text-muted-foreground/40 [&_svg]:size-12"
                    >
                        {project.icon}
                    </div>
                )}

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
