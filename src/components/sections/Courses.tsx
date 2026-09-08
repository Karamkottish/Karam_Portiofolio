"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { motion as m, AnimatePresence } from "framer-motion"
import { Award, X, Download, ShieldCheck, ExternalLink } from "lucide-react"
import { InViewport } from "@/components/canvas/InViewport"

export type Course = {
    title: string
    issuer: string
    date: string
    image?: string
    skills?: string[]
}

const CoursesScene = dynamic(() => import("@/components/canvas/CoursesScene"), { ssr: false })

const courses: Course[] = [
    // To show the certificate image: save the screenshot as
    // public/images/courses/vica-frontend-development.png then add
    //   image: "/images/courses/vica-frontend-development.png"
    { title: "Frontend Development Training", issuer: "Vica Web Solutions", date: "Oct 2025 - Jan 2026", skills: ["React.js", "TypeScript", "Tailwind CSS", "96.2 / 100 · Excellent", "Top 4 in Company"] },
    { title: "AWS Certifications", issuer: "Manara", date: "Dec 2025", skills: ["Cloud Computing", "AWS Services"], image: "/images/courses/AWS-LV1.webp" },
    { title: "Innovating with Google Cloud AI", issuer: "Simplilearn", date: "Jan 2025" },
    { title: "Scaling with Google Cloud Operations", issuer: "Simplilearn", date: "Dec 2024" },
    { title: "Master Flutter App Architectures", issuer: "Udemy", date: "Nov 2025", skills: ["Flutter", "Clean Architecture", "MVVM"] },
    { title: "Frontend Engineering with React", issuer: "Manara", date: "Jul 2025 - Aug 2025", skills: ["React.js", "GitHub"] },
    { title: "Modern Javascript", issuer: "Manara", date: "Sep 2025", skills: ["JavaScript", "API"] },
    { title: "Flutter - Advanced", issuer: "Focal X Agency", date: "Feb 2024 - Jun 2024", skills: ["Flutter", "Dart"] },
    { title: "Flutter - Beginner", issuer: "Merit Center Mcet", date: "Oct 2023 - Jan 2024", skills: ["Mobile Dev"] },
    { title: "Python Programming", issuer: "Google Community in Saudi Arabia", date: "May 2021" },
    { title: "Intro to Database & SQL", issuer: "Google Community in Saudi Arabia", date: "Jun 2021" },
    { title: "Agile Methodology", issuer: "Edraak", date: "Sep 2025", skills: ["Agile"], image: "/images/courses/Agile%20Methodology.pdf" },
    { title: "Product Management Core Skills and Concepts", issuer: "Udemy", date: "Oct 2025 - Dec 2025", image: "/images/courses/Project%20Mnagament.pdf" },
    { title: "The Complete Manager", issuer: "Udemy", date: "Feb 2026", skills: ["Management", "Leadership", "Mentoring"], image: "/images/courses/Manager%20Certification.pdf" },
    { title: "User Experience Design", issuer: "Edraak", date: "Jul 2025 - Aug 2025", image: "/images/courses/uiuxen.pdf" },
    { title: "User Experience Research", issuer: "Edraak", date: "Jul 2025 - Aug 2025" },
    { title: "Ui/Ux", issuer: "Vica Web Solutions", date: "Aug 2024 - Dec 2024" },
    { title: "Intro to Cryptography", issuer: "Univ. of Leeds", date: "Feb 2025" },
    { title: "Introduction to Computational Thinking", issuer: "The Open University - OpenLearn", date: "Jan 2025" },
    { title: "GIT Training", issuer: "Simplilearn", date: "Jan 2025" },
    { title: "Ethical hacking 101", issuer: "Simplilearn", date: "Dec 2024" },
    { title: "Cisco Certified Network Associate", issuer: "Hadara", date: "Mar 2023 - May 2023" },
    { title: "Product Management Foundation", issuer: "Edraak", date: "Sep 2025", image: "/images/courses/Product%20Mnagament.webp" },
    { title: "Delegation & Mentoring", issuer: "Edraak", date: "Sep 2025", image: "/images/courses/DelegaationCounchingMentoringSkillsEng.pdf" }
]



function CertificationModal({ course, onClose }: { course: Course, onClose: () => void }) {
    return (
        <AnimatePresence>
            {course && (
                <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
                >
                    <m.div
                        initial={{ scale: 0.9, rotateX: 10, y: 50, opacity: 0 }}
                        animate={{ scale: 1, rotateX: 0, y: 0, opacity: 1 }}
                        exit={{ scale: 0.9, rotateX: -10, y: 50, opacity: 0 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-2xl bg-white/10 dark:bg-zinc-900/90 border border-white/20 dark:border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden"
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        {/* Background Glow */}
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

                        {/* Top Bar */}
                        <div className="flex justify-between items-start mb-8 relative z-10">
                            <div>
                                <m.h2
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-400"
                                >
                                    {course.title}
                                </m.h2>
                                <p className="text-muted-foreground flex items-center gap-2 mt-2">
                                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                                    Verified Certification by {course.issuer}
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors group"
                            >
                                <X className="w-6 h-6 text-muted-foreground group-hover:text-white transition-colors" />
                            </button>
                        </div>

                        {/* Certificate Preview */}
                        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-linear-to-br from-gray-800 to-gray-900 border border-white/5 shadow-inner mb-8 group flex items-center justify-center">
                            {course.image ? (() => {
                                const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
                                const src = course.image!.startsWith('http') ? course.image! : `${basePath}${course.image}`
                                return course.image!.endsWith('.pdf') ? (
                                    <iframe src={src + "#view=FitH"} loading="lazy" className="w-full h-full border-none" />
                                ) : (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={src} alt={course.title} loading="lazy" decoding="async" className="w-full h-full object-contain" />
                                )
                            })() : (
                                <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">
                                    <Award className="w-16 h-16 text-white/20 group-hover:scale-110 transition-transform duration-500" />
                                    <p className="text-white/40 font-mono text-sm uppercase tracking-widest">Certificate Preview</p>
                                </div>
                            )}
                            {/* Animated Scan Line (only if no image or strictly decorative) */}
                            {!course.image && (
                                <div className="absolute inset-0 w-full h-[2px] bg-linear-to-r from-transparent via-blue-500/50 to-transparent opacity-50 animate-scan" />
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4">
                            <button className="flex-1 py-4 rounded-xl bg-linear-to-r from-blue-600 to-purple-600 font-bold text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                                <Download className="w-5 h-5" /> Download PDF
                            </button>
                            <button className="flex-1 py-4 rounded-xl bg-white/5 border border-white/10 font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                                <ExternalLink className="w-5 h-5" /> Verify Credential
                            </button>
                        </div>
                    </m.div>
                </m.div>
            )}
        </AnimatePresence>
    )
}
export function Courses() {
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

    return (
        <section id="courses" className="h-screen w-full relative overflow-hidden bg-background">
            <div className="absolute top-10 w-full text-center z-10 pointer-events-none">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
                    Certified <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-violet-500">Expertise</span>
                </h2>
                <p className="text-muted-foreground text-sm md:text-base">Drag to explore certifications</p>
            </div>

            <InViewport rootMargin="400px" className="absolute inset-0 z-0">
                <CoursesScene courses={courses} onSelect={setSelectedCourse} />
            </InViewport>

            {/* Gradient overlays for depth */}
            <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-background to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-background to-transparent pointer-events-none" />

            {/* Modal Layer */}
            <CertificationModal course={selectedCourse!} onClose={() => setSelectedCourse(null)} />
        </section>
    )
}
