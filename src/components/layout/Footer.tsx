"use client"

import { useState } from "react"
import { Phone, Mail, Copy, Check, ArrowUpRight } from "lucide-react"
import { EMAIL, profiles } from "@/data/contact"
import { Logo } from "@/components/ui/Logo"

// WhatsApp Icon Component (Custom SVG for better brand accuracy)
function WhatsAppIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
            aria-hidden="true"
        >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
    )
}

const socialLinks = [
    { name: "Call", label: "+963 99 660 5715", icon: Phone, href: "tel:+963996605715" },
    { name: "WhatsApp", label: "Start a chat", icon: WhatsAppIcon, href: "https://wa.me/966597733571" },
    ...profiles,
]

const tileClass =
    "board-cell group flex items-center gap-3 px-3 py-3 text-left transition-colors hover:bg-(--flap-hover) focus-visible:outline-2 focus-visible:outline-ring"

export function Footer() {
    const [copied, setCopied] = useState(false)

    const copyEmail = () => {
        navigator.clipboard.writeText(EMAIL).then(() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        })
    }

    return (
        <footer className="relative bg-background pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="board rounded-2xl p-3 sm:p-4 font-mono">
                    <div className="grid gap-6 p-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:items-center">
                        <div className="space-y-4">
                            <a href="#hero" aria-label="Karam Kottish, back to top" className="inline-block rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
                                <Logo size="lg" />
                            </a>
                            <p className="max-w-md font-sans text-sm leading-relaxed text-(--flap-ink)">
                                Full-stack engineer and product manager. I build web and mobile products with Flutter, React Native, Next.js and FastAPI.
                            </p>
                        </div>

                        <ul className="grid gap-1.5 sm:grid-cols-2">
                            <li className="sm:col-span-2">
                                <button type="button" onClick={copyEmail} className={`${tileClass} w-full`}>
                                    {copied ? <Check className="size-4 shrink-0 text-(--signal)" /> : <Mail className="size-4 shrink-0 text-(--flap-dim)" />}
                                    <span className="min-w-0 flex-1">
                                        <span className="block text-[10px] uppercase tracking-[0.18em] text-(--flap-dim)">Email</span>
                                        <span className="block truncate text-xs" aria-live="polite">{copied ? "Copied to clipboard" : EMAIL}</span>
                                    </span>
                                    <Copy className="size-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-60" aria-hidden="true" />
                                </button>
                            </li>
                            {socialLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        {...(link.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                                        className={tileClass}
                                    >
                                        <link.icon className="size-4 shrink-0 text-(--flap-dim)" />
                                        <span className="min-w-0 flex-1">
                                            <span className="block text-[10px] uppercase tracking-[0.18em] text-(--flap-dim)">{link.name}</span>
                                            <span className="block truncate text-xs">{link.label}</span>
                                        </span>
                                        <ArrowUpRight className="size-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-60" aria-hidden="true" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-3 flex flex-col items-center justify-between gap-2 border-t border-(--flap) px-2 pt-3 text-[11px] uppercase tracking-[0.14em] sm:flex-row">
                        <p>© 2027 Karam Portfolio. All rights reserved.</p>
                        <p>End of board · Thanks for stopping by</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
