"use client"

import { useRef, useState } from "react"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { Github, ExternalLink, Folders, Smartphone, Globe, MessageSquare } from "lucide-react"
import ProjectCanvas from "@/components/canvas/ProjectCanvas"
import { cn } from "@/lib/utils"

type Project = {
    title: string
    role: string
    year: string
    description: string
    tags: string[]
    icon: React.ReactNode
    color: string // For accent gradients
    github?: string
}

const projects: Project[] = [
    {
        title: "Karam University",
        role: "Solo React Native Developer",
        year: "2025",
        description: "Modern, clean, trendy university platform with 3D UI and responsive UX. Built in Flutter with Firebase integration and scalable architecture.",
        tags: ["React Native", "Firebase", "Clean UI", "3D Design", "Full Stack"],
        icon: <Smartphone className="w-10 h-10" />,
        color: "from-orange-500 to-red-500",
        github: "https://github.com/Karamkottish/MyUniversity"
    },
    {
        title: "Paws Pal Connect",
        role: "Product Manager • Full Stack Developer",
        year: "2025",
        description: "End-to-end pet-care platform led as Product Manager and Flutter Team Lead. Defined roadmap and MVP scope, conducted user interviews... +32% Engagement.",
        tags: ["Flutter", "Fast API", "Firebase FCM", "GitHub", "AWS", "Languages", "AI API integration",],
        icon: <Folders className="w-10 h-10" />,
        color: "from-blue-500 to-cyan-500",
        github: "https://github.com/pawspalconnect/ppc"
    },
    {
        title: "E-commerce Web",
        role: "Frontend Web Developer",
        year: "2024",
        description: "Medical dashboard web application built with React.js, featuring product management, UI components, and clean responsive design.",
        tags: ["React.js", "JavaScript", "Web App", "Responsive", "Clean UI"],
        icon: <Globe className="w-10 h-10" />,
        color: "from-emerald-500 to-green-500",
        github: "https://github.com/AbdallahZagh/E-commerce-web/tree/store_dashboard"
    },
    {
        title: "Chatly",
        role: "Backend Developer",
        year: "2025",
        description: "An exclusive, real-time messaging platform designed for seamless private communication. Engineered a robust backend using PHP, implementing secure authentication and optimized database interactions for instant message delivery.",
        tags: ["PHP", "MySQL", "Real-time", "Backend Architecture", "Secure Auth"],
        icon: <MessageSquare className="w-10 h-10" />,
        color: "from-violet-500 to-fuchsia-500",
        github: "https://github.com/AbdallahZagh/chatly"
    },
    {
        title: "SoftTech Warehouse",
        role: "Part-time Developer",
        year: "2025",
        description: "Warehouse management mobile app (internal tooling). Optimized for performance and offline capabilities.",
        tags: ["Flutter", "REST", "SQLite", "Provider", "Clean Architecture"],
        icon: <Smartphone className="w-10 h-10" />,
        color: "from-amber-500 to-yellow-500",
        github: "https://github.com/Karamkottish/WareHouse-Flutter"
    },
    {
        title: "Graduation App 'Revonix'",
        role: "Flutter Lead",
        year: "2025",
        description: "Connecting Labors with Clients, offline cache, video demo. Complex integration with multiple payment gateways.",
        tags: ["Flutter", "Clean Architecture", "Django", "Riverpod", "Stripe", "Firebase"],
        icon: <Smartphone className="w-10 h-10" />,
        color: "from-purple-500 to-pink-500",
        github: "https://gitlab.com/revonix1/revonix-frontend"
    },
    {
        title: "E-commerce Clone",
        role: "Solo Developer",
        year: "2023",
        description: "Catalog, cart, payments, responsive web + mobile. A deep dive into complex state management and payment flows.",
        tags: ["Stripe", "Firebase", "Responsive"],
        icon: <Smartphone className="w-10 h-10" />,
        color: "from-teal-500 to-emerald-500",
        github: "#"
    },
    {
        title: "Change Volunteering App",
        role: "Flutter Lead",
        year: "2023",
        description: "Semester Project. Connect volunteers with companies, theming, analytics.",
        tags: ["Getx", "Charts", "Theming", "Languages", "Http"],
        icon: <Smartphone className="w-10 h-10" />,
        color: "from-indigo-500 to-blue-500",
        github: "https://github.com/Karamkottish/Change-ASPU/tree/flutter"
    }
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect()
        mouseX.set(clientX - left)
        mouseY.set(clientY - top)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative h-full"
        >
            <div
                className="relative h-full overflow-hidden rounded-3xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl p-8 hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2"
                onMouseMove={handleMouseMove}
            >
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
                <div className={cn("absolute top-0 left-0 w-full h-1 bg-gradient-to-r opacity-50 group-hover:opacity-100 transition-opacity", project.color)} />

                <div className="flex flex-col h-full relative z-10">
                    <div className="flex justify-between items-start mb-6">
                        <div className={cn("p-4 rounded-2xl bg-gradient-to-br opacity-80 group-hover:opacity-100 transition-all shadow-lg text-white", project.color)}>
                            {project.icon}
                        </div>
                        <div className="flex gap-2">
                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer transition-colors"
                                >
                                    <Github className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                            <span className={cn("text-xs font-bold px-2 py-0.5 rounded text-white bg-gradient-to-r", project.color)}>
                                {project.year}
                            </span>
                            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                {project.role}
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 dark:group-hover:from-white dark:group-hover:to-gray-400 transition-all">
                            {project.title}
                        </h3>
                    </div>

                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 grow">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-[10px] font-semibold px-2 py-1 rounded bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export function Projects() {
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
                        Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Projects</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        A selection of my recent work, ranging from mobile applications to complex web platforms.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}
