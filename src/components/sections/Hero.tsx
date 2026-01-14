"use client"

import { motion } from "framer-motion"
import HeroCanvas from "@/components/canvas/HeroCanvas"
import { ArrowDown } from "lucide-react"

export function Hero() {
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
                    <p className="text-xl md:text-3xl text-muted-foreground font-light max-w-2xl mx-auto mb-10">
                        Product Manager & Full Stack Developer
                    </p>
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
                        href="#experience"
                        className="px-8 py-4 rounded-full border border-foreground/20 bg-background/50 backdrop-blur-sm text-foreground font-bold hover:bg-background hover:scale-105 transition-all"
                    >
                        Contact Me
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
