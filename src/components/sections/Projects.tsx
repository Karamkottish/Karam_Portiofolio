"use client"

import { useRef, useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { motion, useMotionTemplate, useMotionValue, AnimatePresence } from "framer-motion"
import { Github, ExternalLink, Folders, Smartphone, Globe, MessageSquare, Leaf, Rocket, PlayCircle, X } from "lucide-react"
import ProjectCanvas from "@/components/canvas/ProjectCanvas"
import { cn } from "@/lib/utils"
import { usePerspective } from "@/components/PerspectiveProvider"

// Icons
import {
    FaReact, FaPhp, FaAws, FaGithub, FaStripe, FaPython, FaAndroid
} from "react-icons/fa"
import {
    SiTailwindcss, SiThreedotjs, SiVite, SiFirebase, SiFlutter,
    SiFastapi, SiMysql, SiSqlite, SiDjango, SiOpencv,
    SiJavascript, SiTypescript, SiNasa
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
    color: string // For accent gradients
    github?: string
    website?: string
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

const projects: Project[] = [
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
        color: "from-blue-500 to-cyan-500",
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
        color: "from-violet-600 to-indigo-600",
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
        color: "from-green-600 to-emerald-600",
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
        color: "from-orange-500 to-red-500",
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
        color: "from-emerald-500 to-green-500",
        github: "https://github.com/AbdallahZagh/E-commerce-web/tree/store_dashboard"
    },
    {
        title: "Chatly",
        role: "Backend Developer",
        year: "2025",
        description: "An exclusive, real-time messaging platform designed for seamless private communication. Engineered a robust backend using PHP, implementing secure authentication and optimized database interactions for instant message delivery.",
        techStack: [
            { name: "PHP", icon: FaPhp },
            { name: "MySQL", icon: SiMysql },
            { name: "Real-time", icon: TbApi },
            { name: "Secure Auth", icon: MdArchitecture }
        ],
        icon: <MessageSquare className="w-10 h-10" />,
        color: "from-violet-500 to-fuchsia-500",
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
        color: "from-amber-500 to-yellow-500",
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
        color: "from-purple-500 to-pink-500",
        github: "https://gitlab.com/revonix1/revonix-frontend"
    },
    {
        title: "E-commerce Clone",
        role: "Solo Developer",
        year: "2023",
        description: "Catalog, cart, payments, responsive web + mobile. A deep dive into complex state management and payment flows.",
        techStack: [
            { name: "Stripe", icon: FaStripe },
            { name: "Firebase", icon: SiFirebase },
            { name: "Responsive", icon: Smartphone as React.ComponentType<any> }
        ],
        icon: <Smartphone className="w-10 h-10" />,
        color: "from-teal-500 to-emerald-500",
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
        color: "from-indigo-500 to-blue-500",
        github: "https://github.com/Karamkottish/Change-ASPU/tree/flutter"
    }
]

function ProjectCard({ project, index, mode }: { project: Project; index: number; mode: "pm" | "dev" }) {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isHovered, setIsHovered] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect()
        mouseX.set(clientX - left)
        mouseY.set(clientY - top)
    }

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
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative h-full"
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
                            className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8"
                            onClick={() => setIsModalOpen(false)}
                        >
                            <button 
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
                                className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 bg-black"
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
            <div
                className="relative h-full overflow-hidden rounded-3xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl p-8 hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2"
                onMouseMove={handleMouseMove}
            >
                {/* Background Video */}
                {project.video && (
                    <div
                        className={cn(
                            "absolute inset-0 z-0 overflow-hidden rounded-3xl transition-opacity duration-700 pointer-events-none",
                            isHovered ? "opacity-100" : "opacity-0"
                        )}
                    >
                        <video
                            ref={videoRef}
                            src={project.video}
                            className="w-full h-full object-cover opacity-20 dark:opacity-30 mix-blend-overlay"
                            loop
                            muted
                            playsInline
                            preload="metadata"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-background/80 via-background/40 to-transparent dark:from-zinc-900/80 dark:via-zinc-900/40" />
                    </div>
                )}
                {/* Gradient Glow Effect on Hover */}
                <motion.div
                    className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
                    style={{
                        background: useMotionTemplate`
                    radial-gradient(
                        600px circle at ${mouseX}px ${mouseY}px,
                        rgba(255, 255, 255, 0.1),
                        transparent 80%
                    )
                    `,
                    }}
                />
                {/* Color Accent Line */}
                <div className={cn("absolute top-0 left-0 w-full h-1 bg-linear-to-r opacity-50 group-hover:opacity-100 transition-opacity", project.color)} />

                <div className="flex flex-col h-full relative z-10">
                    <div className="flex justify-between items-start mb-6">
                        <div className={cn("p-4 rounded-2xl bg-linear-to-br opacity-80 group-hover:opacity-100 transition-all shadow-lg text-white", project.color)}>
                            {project.icon}
                        </div>
                        <div className="flex gap-2 relative">
                            {project.video && (
                                <div className="group/video relative flex items-center justify-center p-2 rounded-full cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 transition-colors z-20">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setIsModalOpen(true);
                                        }}
                                        className="flex items-center justify-center w-full h-full"
                                    >
                                        <PlayCircle className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                                    </button>
                                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black dark:bg-white text-white dark:text-black text-xs rounded opacity-0 group-hover/video:opacity-100 transition-opacity pointer-events-none whitespace-nowrap font-bold">
                                        Watch Video
                                    </span>
                                </div>
                            )}
                            {project.android && (
                                project.android === "coming_soon" ? (
                                    <div className="group/android relative flex items-center justify-center p-2 rounded-full cursor-not-allowed hover:bg-black/5 dark:hover:bg-white/10 transition-colors z-20">
                                        <FaAndroid className="w-5 h-5 text-muted-foreground" />
                                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black dark:bg-white text-white dark:text-black text-xs rounded opacity-0 group-hover/android:opacity-100 transition-opacity pointer-events-none whitespace-nowrap font-bold">
                                            Coming Soon
                                        </span>
                                    </div>
                                ) : (
                                    <a
                                        href={project.android}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer transition-colors z-20"
                                    >
                                        <FaAndroid className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                                    </a>
                                )
                            )}
                            {project.website && (
                                <a
                                    href={project.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer transition-colors z-20"
                                >
                                    <ExternalLink className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                                </a>
                            )}
                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer transition-colors z-20"
                                >
                                    <Github className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                            <span className={cn("text-xs font-bold px-2 py-0.5 rounded text-white bg-linear-to-r", project.color)}>
                                {project.year}
                            </span>
                            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                {mode === "pm" && project.pmRole ? project.pmRole : project.role}
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-white group-hover:to-gray-400 dark:group-hover:from-white dark:group-hover:to-gray-400 transition-all">
                            {project.title}
                        </h3>
                    </div>

                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 grow">
                        {mode === "pm" && project.pmDescription ? project.pmDescription : project.description}
                    </p>

                    <div className="flex flex-wrap gap-3 mt-auto">
                        {project.techStack.map((tech, idx) => {
                            const Icon = tech.icon
                            return (
                                <div key={idx} className="group/icon relative">
                                    <div className="p-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-muted-foreground hover:text-foreground hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-help">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black dark:bg-white text-white dark:text-black text-xs rounded opacity-0 group-hover/icon:opacity-100 transition-opacity pointer-events-none whitespace-nowrap font-bold">
                                        {tech.name}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export function Projects() {
    const { mode } = usePerspective()

    return (
        <section id="projects" className="relative py-24 min-h-screen bg-background overflow-hidden">
            {/* 3D Background */}
            <div className="absolute inset-0 z-0">
                <ProjectCanvas />
            </div>

            <div className="absolute inset-0 bg-background/50 dark:bg-background/80 backdrop-blur-[1px] z-0" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                        {mode === "pm" ? "Product" : "Featured"}{" "}
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                            {mode === "pm" ? "Case Studies" : "Projects"}
                        </span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg hover:italic transition-all">
                        {mode === "pm"
                            ? "A selection of successful product lifecycles, emphasizing strategy, roadmapping, and user impact."
                            : "A selection of my recent technical work, ranging from mobile applications to complex web platforms."}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} mode={mode} />
                    ))}
                </div>
            </div>
        </section>
    )
}
