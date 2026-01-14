"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { GraduationCap, School, Calendar, MapPin, Award, BookOpen } from "lucide-react"
import EducationCanvas from "@/components/canvas/EducationCanvas"
import { cn } from "@/lib/utils"
// Import icons for the specific institutions (using generic lucide for now, but conceptualizing placeholders)

type EducationItem = {
    school: string
    degree: string
    years: string
    skills: string
    logo?: any // Component or string
    color: string
}

const educationData: EducationItem[] = [
    {
        school: "Al-Sham Private University",
        degree: "Bachelor of Engineering, Information Technology",
        years: "2020 - 2025",
        skills: "Gitlab, Coding Standards and +12 skills",
        color: "from-amber-400 to-orange-500"
    },
    {
        school: "Future Window International School",
        degree: "High School Diploma, High School/Secondary Diplomas and Certificates",
        years: "May 2018 - May 2018",
        skills: "Scientific Section",
        color: "from-blue-400 to-indigo-500"
    }
]

function EducationCard({ item, index }: { item: EducationItem, index: number }) {
    const isEven = index % 2 === 0

    return (
        <motion.div
            initial={{ opacity: 0, x: isEven ? -50 : 50, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.2, type: "spring" }}
            className={cn(
                "relative flex items-center gap-8 mb-16 last:mb-0",
                isEven ? "flex-row" : "flex-row-reverse"
            )}
        >
            {/* Center Node on Timeline */}
            <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white z-20 border-4 border-background shadow-[0_0_20px_rgba(255,255,255,0.5)]" />

            {/* Content Card */}
            <div className={cn("w-[calc(50%-2rem)]", isEven ? "text-right" : "text-left")}>
                <div className="group relative overflow-hidden rounded-2xl bg-white/5 dark:bg-zinc-900/60 backdrop-blur-md border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1">

                    {/* Glowing Border Gradient */}
                    <div className={cn(
                        "absolute top-0 left-0 w-1 h-full bg-gradient-to-b opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                        item.color
                    )} />

                    <div className={cn("flex items-center gap-4 mb-3", isEven ? "flex-row-reverse" : "flex-row")}>
                        <div className={cn("p-2 rounded-lg bg-gradient-to-br text-white shadow-lg", item.color)}>
                            {index === 0 ? <GraduationCap className="w-5 h-5" /> : <School className="w-5 h-5" />}
                        </div>
                        <h3 className="text-xl font-bold leading-tight">{item.school}</h3>
                    </div>

                    <p className="text-muted-foreground font-medium mb-3 text-sm md:text-base">
                        {item.degree}
                    </p>

                    <div className={cn("flex items-center gap-3 text-xs text-muted-foreground/80 mb-4", isEven ? "justify-end" : "justify-start")}>
                        <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-full border border-white/5">
                            <Calendar className="w-3 h-3" /> {item.years}
                        </span>
                        <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-full border border-white/5">
                            <MapPin className="w-3 h-3" /> Damascus, Syria
                        </span>
                    </div>

                    {item.skills && (
                        <div className={cn("flex flex-wrap gap-2", isEven ? "justify-end" : "justify-start")}>
                            <div className="flex items-center gap-1 text-xs font-semibold text-primary">
                                <Award className="w-3 h-3" />
                                <span>{item.skills}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Spacer for the other side */}
            <div className="w-[calc(50%-2rem)]" />
        </motion.div>
    )
}

export function Education() {
    return (
        <section id="education" className="relative min-h-screen py-32 overflow-hidden">
            <EducationCanvas />

            <div className="relative max-w-5xl mx-auto px-6 z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                        Academic <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600">Journey</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        The educational foundation that powers my engineering mindset.
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-cyan-500/50 to-transparent -translate-x-1/2 md:block hidden" />

                    <div className="space-y-12">
                        {educationData.map((item, index) => (
                            <EducationCard key={index} item={item} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
