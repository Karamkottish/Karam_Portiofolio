"use client"

import { motion } from "framer-motion"
import { Users, Brain, MessageSquare, Terminal, Globe2 } from "lucide-react"
import SkillsCanvas from "@/components/canvas/SkillsCanvas"
import { usePerspective } from "@/components/PerspectiveProvider"

const softSkills = [
    { name: "Product Management", icon: <Users /> },
    { name: "Team Leadership", icon: <Brain /> },
    { name: "Strategic Thinking", icon: <Terminal /> }, // Using Terminal as abstract placeholder for logic/strategy
    { name: "Effective Communication", icon: <MessageSquare /> },
]

const languages = [
    { name: "Arabic", level: "Native", percentage: 100 },
    { name: "English", level: "Professional", percentage: 90 },
    //{ name: "German", level: "Beginner", percentage: 30 }, // Example
]

export function Skills() {
    const { mode } = usePerspective()

    return (
        <section id="skills" className="relative py-24 bg-background overflow-hidden">

            {/* Background Gradients */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                        {mode === "pm" ? "Product" : "Technical"}{" "}
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                            {mode === "pm" ? "Ecosystem" : "Proficiency"}
                        </span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        {mode === "pm"
                            ? "A comprehensive toolkit for driving product strategy, execution, and team alignment."
                            : "A dynamic toolbelt of modern technologies and frameworks honed through production experience."}
                    </p>
                </motion.div>

                {/* 3D Skills Constellation */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="w-full mb-20 rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 bg-black/5 dark:bg-white/5 relative shadow-xl"
                >
                    <div className="absolute top-4 left-6 z-10 hidden md:block">
                        <p className="text-sm font-semibold tracking-wider uppercase opacity-50">
                            Interactive Knowledge Map
                        </p>
                    </div>
                    <SkillsCanvas mode={mode} />
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Soft Skills */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
                            <Brain className="w-8 h-8 text-purple-500" />
                            Soft Skills
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {softSkills.map((skill, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ scale: 1.02 }}
                                    className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:bg-white dark:hover:bg-white/10 hover:shadow-lg transition-all"
                                >
                                    <div className="text-purple-500">
                                        {skill.icon}
                                    </div>
                                    <span className="font-semibold text-lg">{skill.name}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Languages */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
                            <Globe2 className="w-8 h-8 text-blue-500" />
                            Languages
                        </h3>
                        <div className="space-y-6">
                            {languages.map((lang, idx) => (
                                <div key={idx} className="bg-white/50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/5">
                                    <div className="flex justify-between items-end mb-2">
                                        <h4 className="text-xl font-bold">{lang.name}</h4>
                                        <span className="text-sm font-medium text-muted-foreground">{lang.level}</span>
                                    </div>
                                    <div className="h-2 w-full bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${lang.percentage}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1, delay: 0.2 }}
                                            className="h-full bg-linear-to-r from-blue-500 to-purple-500 rounded-full"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                </div>

            </div>
        </section>
    )
}
