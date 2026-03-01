"use client"

import { motion } from "framer-motion"
import HeroCanvas from "@/components/canvas/HeroCanvas"
import { cn } from "@/lib/utils"
import { ArrowDown, Download } from "lucide-react"
import { usePerspective } from "@/components/PerspectiveProvider"

export function Hero() {
    const { mode } = usePerspective()

    return (
        <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-background">
            {/* 3D Background */}
            <div className="absolute inset-0 w-full h-full z-0 opacity-80 dark:opacity-60">
                <HeroCanvas />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h2 className="text-sm md:text-lg font-medium tracking-wide text-primary/80 uppercase mb-4">
                        Welcome to my portfolio
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 text-foreground">
                        Karam <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Kottish</span>
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <div className="text-xl md:text-2xl text-muted-foreground font-light max-w-3xl mx-auto mb-12 space-y-6">
                        <p>
                            {mode === "pm"
                                ? <span className="text-purple-600 dark:text-purple-400 font-bold">Product Manager</span>
                                : <span className="text-blue-600 dark:text-blue-400 font-bold">Full Stack Developer</span>}
                            {" "}& {mode === "pm" ? "Technical Lead" : "Product Thinker"} with <span className="text-foreground font-semibold border-b-2 border-primary/20">3+ years</span> of experience.
                        </p>
                        <p className="text-base md:text-lg opacity-90 max-w-2xl mx-auto leading-relaxed h-[60px] md:h-auto">
                            {mode === "pm"
                                ? "Specializing in translating business requirements into user-centric digital products. I lead cross-functional teams to drive roadmap execution and deliver measurable impact."
                                : "Specializing in building scalable, high-performance web and mobile applications. I architect robust solutions from database design to seamless interactive 3D frontends."}
                        </p>

                        <div className="flex flex-wrap justify-center gap-3 pt-4">
                            {(mode === "pm"
                                ? ["Roadmap Planning", "Agile Execution", "Data-Driven Decisions", "Technical Leadership", "Stakeholder Comm", "User Research"]
                                : ["Flutter", "React Native", "PHP", "FastAPI", "Next.js", "Three.js", "React"]
                            ).map((item, i) => (
                                <motion.span
                                    key={`${mode}-${item}`}
                                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ delay: 0.2 + (i * 0.1), type: "spring" }}
                                    className={cn(
                                        "px-4 py-1.5 rounded-full border text-foreground font-medium text-sm transition-all cursor-default",
                                        mode === "pm"
                                            ? "bg-purple-500/10 border-purple-500/20 hover:border-purple-500/40 shadow-[0_0_15px_-3px_rgba(168,85,247,0.1)] hover:shadow-[0_0_20px_-3px_rgba(168,85,247,0.3)]"
                                            : "bg-blue-500/10 border-blue-500/20 hover:border-blue-500/40 shadow-[0_0_15px_-3px_rgba(59,130,246,0.1)] hover:shadow-[0_0_20px_-3px_rgba(59,130,246,0.3)]"
                                    )}
                                >
                                    {item}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <a
                        href="#projects"
                        className="px-8 py-4 rounded-full bg-foreground text-background font-bold hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
                    >
                        View Work
                    </a>
                    <a
                        href="/Karam_Portiofolio/Cv/CV9.pdf"
                        download="Karam_Kottish_CV.pdf"
                        className="group relative px-8 py-4 rounded-full border border-foreground/10 bg-background/30 backdrop-blur-md overflow-hidden transition-all duration-300 hover:scale-105 hover:border-foreground/20 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)] dark:hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)]"
                    >
                        <div className="absolute inset-0 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <span className="relative flex items-center gap-2 text-foreground font-bold tracking-wide">
                            <Download className="w-5 h-5 group-hover:animate-bounce" />
                            DOWNLOAD CV
                        </span>
                    </a>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
                <ArrowDown className="w-8 h-8 text-muted-foreground opacity-50" />
            </motion.div>

            {/* Gradient Overlay for better text readability if needed */}
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background z-0 pointer-events-none" />
        </section>
    )
}
