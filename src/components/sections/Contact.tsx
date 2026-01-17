"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import emailjs from "@emailjs/browser"
import { Send, Loader2, Mail, User, MessageSquare } from "lucide-react"
import ContactCanvas from "@/components/canvas/ContactCanvas"
import { cn } from "@/lib/utils"

export function Contact() {
    const formRef = useRef<HTMLFormElement>(null)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
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
                    to_email: "karamkottish@gmail.com", // Your email (from screenshot)
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
        <section id="contact" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
            <ContactCanvas />

            <div className="relative z-10 container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20">

                {/* Left Side: Text & Info */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="flex-1 text-center md:text-left pointer-events-none" // Pointer events none so it doesn't block canvas interaction
                >
                    <div className="pointer-events-auto"> {/* Re-enable pointer events for text selection */}
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
                            Let's <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-cyan-400">
                                Connect
                            </span>
                        </h2>
                        <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto md:mx-0">
                            Have a project in mind? Looking for a uniquely trendy 2027 web experience? Send me a message and let's build the future together.
                        </p>

                        <div className="flex flex-col gap-4 items-center md:items-start text-sm text-muted-foreground/80">
                            <p>Based in Riyadh, Saudi Arabia </p>
                            <p>Available for Freelance & Full-time</p>
                        </div>
                    </div>
                </motion.div>

                {/* Right Side: Holographic Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="flex-[1.2] w-full max-w-lg"
                >
                    <form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className="relative p-8 rounded-3xl bg-white/5 dark:bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.1)] dark:shadow-[0_0_40px_rgba(59,130,246,0.1)] group"
                    >
                        {/* Glowing Border Animation */}
                        <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-blue-500/30 transition-colors duration-500 pointer-events-none" />

                        <h3 className="text-2xl font-bold mb-6 text-foreground">Send Message</h3>

                        <div className="space-y-6">
                            {/* Name Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground ml-1">Your Name</label>
                                <div className="relative group/input">
                                    <User className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground group-focus-within/input:text-blue-500 transition-colors" />
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-foreground focus:outline-hidden focus:border-blue-500/50 focus:bg-white/10 transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>

                            {/* Email Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground ml-1">Your Email</label>
                                <div className="relative group/input">
                                    <Mail className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground group-focus-within/input:text-blue-500 transition-colors" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-foreground focus:outline-hidden focus:border-blue-500/50 focus:bg-white/10 transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            {/* Message Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground ml-1">Your Message</label>
                                <div className="relative group/input">
                                    <MessageSquare className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground group-focus-within/input:text-blue-500 transition-colors" />
                                    <textarea
                                        rows={4}
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-foreground focus:outline-hidden focus:border-blue-500/50 focus:bg-white/10 transition-all resize-none"
                                        placeholder="Hi, I'd like to talk about..."
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg shadow-lg hover:shadow-cyan-500/25 transform hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                                    </>
                                ) : success ? (
                                    "Message Sent!"
                                ) : (
                                    <>
                                        Send Message <Send className="w-5 h-5" />
                                    </>
                                )}
                            </button>

                            {success && (
                                <p className="text-green-500 text-sm text-center mt-2 animate-pulse">
                                    Thank you! I'll get back to you soon.
                                </p>
                            )}
                            {error && (
                                <p className="text-red-500 text-sm text-center mt-2">
                                    Something went wrong. Please try again.
                                </p>
                            )}
                        </div>
                    </form>
                </motion.div>
            </div>
        </section>
    )
}
