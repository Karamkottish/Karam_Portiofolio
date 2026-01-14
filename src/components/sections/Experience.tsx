"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, useMotionValue } from "framer-motion"
import { Briefcase, Calendar, MapPin, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

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
}

const experiences: ExperienceItem[] = [
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
                period: "Jan 2026 - Present",
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
                title: "Product Manager",
                period: "Dec 2025 - Present",
                skills: ["Front-End Development", "Mobile Application Development"]
            },
            {
                title: "Flutter TeamLeader Developer Intern",
                period: "Sep 2025 - Present",
                description: "Developing the app from Scratch",
                skills: ["GitHub", "Firebase"]
            },
            {
                title: "Social Media Admin",
                period: "Sep 2025 - Dec 2025",
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
                period: "Sep 2025 - Present",
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
                title: "Frontend Web Developer",
                period: "Aug 2025 - Nov 2025",
                location: "Chicago, IL - Remote",
                description: "Contributed to building responsive web apps with React/Next.js and TypeScript.",
                skills: ["React.js", "Next.js", "TypeScript"]
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
                period: "Feb 2023 - Jun 2024",
                location: "Damascus - Remote",
                description: "Completed an advanced program in Flutter and Dart. Applied advanced state management patterns (Provider, Riverpod, GetX, BLoC).",
                skills: ["GitHub", "Firebase", "REST APIs", "Bloc"]
            }
        ]
    }
]

function ExperienceCard({ item, index }: { item: ExperienceItem; index: number }) {
    const ref = useRef<HTMLDivElement>(null)

    // Mouse position for spotlight effect
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect()
        mouseX.set(clientX - left)
        mouseY.set(clientY - top)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative"
        >
            <div
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-md dark:border-white/5 dark:bg-black/20"
                onMouseMove={handleMouseMove}
            >
                {/* Spotlight Effect */}
                <motion.div
                    className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
                    style={{
                        background: useMotionTemplate`
              radial-gradient(
                650px circle at ${mouseX}px ${mouseY}px,
                rgba(129, 140, 248, 0.15),
                transparent 80%
              )
            `,
                    }}
                />

                <div className="relative z-10 flex flex-col md:flex-row gap-6">
                    {/* Company Info - Left Side on Desktop */}
                    <div className="md:w-1/3 flex flex-col border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-6">
                        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400">
                            {item.company}
                        </h3>
                        <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 w-fit">
                            {item.type}
                        </span>
                    </div>

                    {/* Roles - Right Side */}
                    <div className="md:w-2/3 space-y-6">
                        {item.roles.map((role, rIndex) => (
                            <div key={rIndex} className={cn("relative pl-6 border-l-2 border-white/10", rIndex === item.roles.length - 1 ? "pb-0" : "pb-6")}>
                                {/* Timeline dot */}
                                <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-background bg-blue-500 dark:bg-purple-500" />

                                <div className="flex flex-wrap gap-2 items-center text-sm text-muted-foreground mb-1">
                                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {role.period}</span>
                                    {role.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {role.location}</span>}
                                </div>

                                <h4 className="text-xl font-semibold text-foreground mb-2">{role.title}</h4>

                                {role.description && (
                                    <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                                        {role.description}
                                    </p>
                                )}

                                {role.skills && (
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {role.skills.map(skill => (
                                            <span key={skill} className="px-2 py-1 text-[10px] uppercase tracking-wider rounded border border-white/10 bg-white/5 text-primary/80 hover:bg-primary/10 transition-colors">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export function Experience() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    return (
        <section id="experience" className="relative py-24 min-h-screen overflow-hidden bg-background">
            {/* Dynamic Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[10%] left-[50%] -translate-x-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-3xl opacity-20 dark:opacity-10" />
                <div className="absolute bottom-[10%] left-[20%] w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl opacity-20 dark:opacity-10" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={containerRef}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Professional <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">Experience</span></h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        A non-linear journey through my career as a developer and product manager.
                    </p>
                </motion.div>

                <div className="flex flex-col gap-8">
                    {experiences.map((item, index) => (
                        <ExperienceCard key={index} item={item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}
