"use client"

import { useState, useRef } from "react"
import emailjs from "@emailjs/browser"
import { Send, Loader2, Copy, Check, ClipboardList } from "lucide-react"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { StatusMark } from "@/components/ui/StatusMark"
import { EMAIL, profiles } from "@/data/contact"

const fieldClass =
    "board-cell w-full px-3 py-3 font-sans text-[15px] text-(--flap-ink) placeholder:text-(--flap-dim) outline-none ring-0 transition-shadow focus:shadow-[0_0_0_2px_var(--signal)]"

export function Contact() {
    const formRef = useRef<HTMLFormElement>(null)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [copied, setCopied] = useState(false)

    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const copyEmail = () => {
        navigator.clipboard.writeText(EMAIL).then(() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError(false)
        setSuccess(false)

        const SERVICE_ID = "service_q8445zo" // e.g., service_gmail
        const TEMPLATE_ID = "template_g7uvlqs" // e.g., template_portfolio
        const PUBLIC_KEY = "gXXUWOBgsONuJeMtt"   // e.g., user_12345abcde

        emailjs
            .send(
                SERVICE_ID,
                TEMPLATE_ID,
                {
                    from_name: form.name,
                    to_name: "Karam",
                    from_email: form.email,
                    to_email: EMAIL, // Your email (from screenshot)
                    reply_to: form.email,
                    message: form.message,
                },
                PUBLIC_KEY
            )
            .then(
                () => {
                    setLoading(false)
                    setSuccess(true)
                    setForm({ name: "", email: "", message: "" })
                },
                (error) => {
                    setLoading(false)
                    setError(true)
                    console.error("EmailJS Error:", error)

                    const errorMessage = error?.text || JSON.stringify(error)
                    const isPyloadEmpty = errorMessage === "{}" || errorMessage === ""

                    if (isPyloadEmpty) {
                        alert("Failed to send: The request was blocked or failed silently. Please disable AdBlocker and try again, or check your Internet connection.")
                    } else {
                        alert(`Failed to send message: ${errorMessage}. Check console for details.`)
                    }
                }
            )
    }

    return (
        <section id="contact" className="relative py-24 md:py-32 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    index="07"
                    label="Check-in"
                    title="Let's build the next one"
                    subtitle="Have a product to ship, or a team that needs an engineer who thinks like a PM? Tell me what you're working on."
                />

                <div className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start">
                    {/* Desk details */}
                    <div className="board reveal rounded-2xl p-3 sm:p-4 font-mono">
                        <p className="pb-3 pl-1 text-[11px] uppercase tracking-[0.22em] text-(--flap-ink)">Desk</p>
                        <dl className="space-y-1.5">
                            <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-1">
                                <dt className="board-cell flex items-center px-3 py-2.5 text-[10px] uppercase tracking-[0.18em] text-(--flap-dim)">Base</dt>
                                <dd className="board-cell px-3 py-2.5 text-xs uppercase tracking-[0.06em]">RUH · Riyadh, Saudi Arabia</dd>
                            </div>
                            <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-1">
                                <dt className="board-cell flex items-center px-3 py-2.5 text-[10px] uppercase tracking-[0.18em] text-(--flap-dim)">Status</dt>
                                <dd className="board-cell px-3 py-2.5 text-xs uppercase tracking-[0.06em]">
                                    <StatusMark status="live" className="inline-flex" />
                                    <span className="ml-2 text-(--flap-ink)">Full-time &amp; freelance</span>
                                </dd>
                            </div>
                            <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-1">
                                <dt className="board-cell flex items-center px-3 py-2.5 text-[10px] uppercase tracking-[0.18em] text-(--flap-dim)">Email</dt>
                                <dd className="board-cell flex items-center justify-between gap-2 px-3 py-1.5">
                                    <a href={`mailto:${EMAIL}`} className="truncate text-xs hover:text-(--signal) focus-visible:outline-2 focus-visible:outline-ring">{EMAIL}</a>
                                    <button
                                        type="button"
                                        onClick={copyEmail}
                                        aria-label={copied ? "Email copied" : "Copy email address"}
                                        className="shrink-0 rounded p-1.5 text-(--flap-dim) transition-colors hover:text-(--signal) focus-visible:outline-2 focus-visible:outline-ring"
                                    >
                                        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                                    </button>
                                </dd>
                            </div>
                            <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-1">
                                <dt className="board-cell flex items-center px-3 py-2.5 text-[10px] uppercase tracking-[0.18em] text-(--flap-dim)">Profiles</dt>
                                <dd className="board-cell flex flex-wrap gap-1 px-1.5 py-1.5">
                                    {profiles.map((profile) => (
                                        <a
                                            key={profile.name}
                                            href={profile.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title={profile.label}
                                            className="inline-flex items-center gap-1.5 rounded px-2 py-1.5 text-[11px] uppercase tracking-[0.08em] transition-colors hover:bg-(--flap-hover) hover:text-(--signal) focus-visible:outline-2 focus-visible:outline-ring"
                                        >
                                            <profile.icon className="size-3.5" aria-hidden="true" />
                                            {profile.name}
                                            <span className="sr-only">({profile.label}, opens in a new tab)</span>
                                        </a>
                                    ))}
                                </dd>
                            </div>
                        </dl>
                        <p className="pt-3 pl-1 text-[11px] uppercase leading-relaxed tracking-[0.1em]" aria-live="polite">
                            {copied ? "Copied to clipboard" : "Phone and WhatsApp are in the footer"}
                        </p>
                    </div>

                    {/* Check-in form */}
                    <form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className="board reveal rounded-2xl p-3 sm:p-5 font-mono"
                    >
                        <p className="flex items-center gap-2 pb-4 pl-1 text-[11px] uppercase tracking-[0.22em] text-(--flap-ink)">
                            <ClipboardList className="w-3.5 h-3.5" aria-hidden="true" />
                            Check-in
                        </p>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-1.5">
                                <label htmlFor="contact-name" className="pl-1 text-[10px] uppercase tracking-[0.18em]">Name</label>
                                <input
                                    id="contact-name"
                                    type="text"
                                    name="name"
                                    autoComplete="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    className={fieldClass}
                                    placeholder="Your name"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label htmlFor="contact-email" className="pl-1 text-[10px] uppercase tracking-[0.18em]">Email</label>
                                <input
                                    id="contact-email"
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    className={fieldClass}
                                    placeholder="you@company.com"
                                />
                            </div>
                            <div className="space-y-1.5 sm:col-span-2">
                                <label htmlFor="contact-message" className="pl-1 text-[10px] uppercase tracking-[0.18em]">Message</label>
                                <textarea
                                    id="contact-message"
                                    rows={5}
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                    className={`${fieldClass} resize-none`}
                                    placeholder="What are you building, and where can I help?"
                                />
                            </div>
                        </div>

                        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                            <p className="pl-1 text-[11px] uppercase tracking-[0.1em]" aria-live="polite">
                                {success && <span className="text-emerald-700 dark:text-emerald-400">Received. I&apos;ll get back to you soon.</span>}
                                {error && <span className="text-destructive">Something went wrong. Please try again.</span>}
                            </p>
                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex h-12 items-center gap-2 rounded-full bg-(--signal) px-6 text-xs font-semibold uppercase tracking-[0.12em] text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="size-4 animate-spin" aria-hidden="true" /> Sending
                                    </>
                                ) : success ? (
                                    "Message sent"
                                ) : (
                                    <>
                                        Send message <Send className="size-4" aria-hidden="true" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}
