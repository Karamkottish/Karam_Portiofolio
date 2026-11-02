"use client"

import * as React from "react"
import { Moon, Sun, Menu, X, Briefcase, Code2 } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { usePerspective } from "@/components/PerspectiveProvider"
import { Logo } from "@/components/ui/Logo"


const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Courses", href: "#courses" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
]

export function Navbar() {
    const { theme, setTheme } = useTheme()
    const { mode, toggleMode } = usePerspective()
    const [isOpen, setIsOpen] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
                scrolled ? "bg-background/80 backdrop-blur-md border-border/40 shadow-sm" : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="shrink-0">

                        <Link href="/" aria-label="Karam Kottish, home" className="block rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
                            <Logo />
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="font-mono text-xs uppercase tracking-[0.14em] text-foreground/70 hover:text-(--signal) transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        {/* Perspective Toggle */}
                        {mounted && (
                            <button
                                onClick={toggleMode}
                                className={cn(
                                    "relative flex items-center justify-between w-20 h-8 p-1 rounded-full cursor-pointer transition-colors border",
                                    "bg-(--signal)/10 border-(--signal)/30 text-(--signal)"
                                )}
                                title={`Switch to ${mode === "pm" ? "Developer" : "Product Manager"} view`}
                                aria-label={`Switch to ${mode === "pm" ? "Developer" : "Product Manager"} view`}
                            >
                                <div className="z-10 w-full flex justify-between px-1 pointer-events-none">
                                    <Briefcase className={cn("w-4 h-4", mode !== "pm" && "opacity-50")} />
                                    <Code2 className={cn("w-4 h-4", mode !== "dev" && "opacity-50")} />
                                </div>
                                <motion.div
                                    className={cn(
                                        "absolute top-1 bottom-1 w-8 rounded-full shadow-sm",
                                        "bg-(--signal)/25"
                                    )}
                                    initial={false}
                                    animate={{
                                        left: mode === "pm" ? "4px" : "calc(100% - 36px)",
                                    }}
                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                />
                            </button>
                        )}

                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="p-2 rounded-full hover:bg-accent/50 transition-colors focus:outline-none"
                            aria-label="Toggle theme"
                        >
                            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" style={{ marginTop: "-20px" }} />
                        </button>
                    </div>

                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border/40 overflow-hidden"
                    >
                        <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-foreground block px-3 py-2.5 rounded-md font-mono text-sm uppercase tracking-[0.12em] hover:bg-accent hover:text-(--signal)"
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <div className="mt-4 px-3 py-4 border-t border-border/10 flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-foreground/80">Perspective</span>
                                    {mounted && (
                                        <button
                                            onClick={toggleMode}
                                            className={cn(
                                                "relative flex items-center justify-between w-20 h-8 p-1 rounded-full cursor-pointer transition-colors border",
                                                "bg-(--signal)/10 border-(--signal)/30 text-(--signal)"
                                            )}
                                            aria-label={`Switch to ${mode === "pm" ? "Developer" : "Product Manager"} view`}
                                        >
                                            <div className="z-10 w-full flex justify-between px-1 pointer-events-none">
                                                <Briefcase className={cn("w-4 h-4", mode !== "pm" && "opacity-50")} />
                                                <Code2 className={cn("w-4 h-4", mode !== "dev" && "opacity-50")} />
                                            </div>
                                            <motion.div
                                                className={cn(
                                                    "absolute top-1 bottom-1 w-8 rounded-full shadow-sm",
                                                    "bg-(--signal)/25"
                                                )}
                                                initial={false}
                                                animate={{
                                                    left: mode === "pm" ? "4px" : "calc(100% - 36px)",
                                                }}
                                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                            />
                                        </button>
                                    )}
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-foreground/80">Appearance</span>
                                    {mounted && (
                                        <div
                                            className={cn(
                                                "w-16 h-8 rounded-full p-1 cursor-pointer transition-colors duration-500 relative bg-muted",
                                                "ring-1 ring-border"
                                            )}
                                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                        >
                                            <motion.div
                                                className={cn(
                                                    "w-6 h-6 rounded-full shadow-sm flex items-center justify-center absolute top-1",
                                                    "bg-card text-(--signal)"
                                                )}
                                                animate={{
                                                    x: theme === "dark" ? 32 : 0,
                                                    rotate: theme === "dark" ? 360 : 0
                                                }}
                                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                            >
                                                {theme === "dark" ? (
                                                    <Moon className="w-4 h-4" />
                                                ) : (
                                                    <Sun className="w-4 h-4" fill="currentColor" />
                                                )}
                                            </motion.div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
