"use client"

import { motion } from "framer-motion"
import { Phone, Mail, Linkedin, Copy, ExternalLink, Heart } from "lucide-react"
import { cn } from "@/lib/utils"

// WhatsApp Icon Component (Custom SVG for better brand accuracy)
function WhatsAppIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
        >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
    )
}

const socialLinks = [
    {
        name: "Call Me",
        value: "+966 59 773 3571",
        label: "+966 59 773 3571",
        icon: Phone,
        color: "hover:bg-green-500/10 hover:text-green-500 hover:border-green-500/20",
        action: () => window.open("tel:+966597733571")
    },
    {
        name: "WhatsApp",
        value: "Chat on WhatsApp",
        label: "Start Chat",
        icon: WhatsAppIcon,
        color: "hover:bg-emerald-500/10 hover:text-emerald-500 hover:border-emerald-500/20",
        action: () => window.open("https://wa.me/966597733571", "_blank")
    },
    {
        name: "Email",
        value: "karamkottish@gmail.com",
        label: "Copy Email",
        icon: Mail,
        color: "hover:bg-blue-500/10 hover:text-blue-500 hover:border-blue-500/20",
        action: () => {
            navigator.clipboard.writeText("karamkottish@gmail.com")
            alert("Email copied to clipboard!")
        }
    },
    {
        name: "LinkedIn",
        value: "Karam Hesham Kottish",
        label: "View Profile",
        icon: Linkedin,
        color: "hover:bg-blue-600/10 hover:text-blue-600 hover:border-blue-600/20",
        action: () => window.open("https://www.linkedin.com/in/karam-kottish/", "_blank") // Using predicted handle, user can update
    }
]

export function Footer() {
    return (
        <footer className="relative pt-20 pb-10 overflow-hidden bg-background">
            {/* Top Gradient Line */}
            <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-foreground/20 to-transparent" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-20">

                    {/* Brand Section */}
                    <div className="space-y-6 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="flex justify-center lg:justify-start"
                        >
                            <img
                                src="/Karam_Portiofolio/images/karam-logo.png"
                                alt="Karam Kottish Logo"
                                className="h-16 md:h-20 w-auto object-contain"
                            />
                        </motion.div>

                        <p className="text-muted-foreground text-lg max-w-md mx-auto lg:mx-0">
                            Building the future with code, creativity, and a touch of 3D magic. Based in Riyadh, Saudi Arabia.
                        </p>
                    </div>

                    {/* Contact Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {socialLinks.map((link, index) => (
                            <motion.button
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                onClick={link.action}
                                className={cn(
                                    "flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-secondary/5 transition-all duration-300 group",
                                    link.color
                                )}
                            >
                                <div className="p-3 rounded-lg bg-background shadow-xs group-hover:scale-110 transition-transform">
                                    <link.icon className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-0.5">
                                        {link.name}
                                    </p>
                                    <p className="font-semibold text-sm md:text-base flex items-center gap-2">
                                        {link.label}
                                        {link.name !== "Email" && link.name !== "Call Me" && (
                                            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                                        )}
                                        {link.name === "Email" && (
                                            <Copy className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                                        )}
                                    </p>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-border/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                    <p>© 2027 Karam Portfolio. All rights reserved.</p>
                    <p className="flex items-center gap-1">
                        Made with <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" /> in Next.js
                    </p>
                </div>
            </div>
        </footer>
    )
}
