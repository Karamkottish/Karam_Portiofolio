"use client"

import { useEffect, useState } from "react"
import { motion as m, AnimatePresence } from "framer-motion"
import { Award, X, ExternalLink, PlaneLanding, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { StatusMark } from "@/components/ui/StatusMark"
import { parseMonth, shortMonth, toIndex } from "@/lib/route"

export type Course = {
    title: string
    issuer: string
    date: string
    image?: string
    skills?: string[]
}

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

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""
const INITIAL_ROWS = 8

/** When a course "landed": the end of its date range. */
function arrival(course: Course) {
    const parts = course.date.split(" - ")
    return parseMonth(parts[parts.length - 1])
}

// Newest arrivals first, like a live board
const arrivals = courses
    .map((course) => ({ course, landed: arrival(course) }))
    .sort((a, b) => (b.landed ? toIndex(b.landed) : 0) - (a.landed ? toIndex(a.landed) : 0))

function fileUrl(image: string) {
    return image.startsWith("http") ? image : `${basePath}${image}`
}

function CertificationModal({ course, onClose }: { course: Course | null; onClose: () => void }) {
    useEffect(() => {
        if (!course) return
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [course, onClose])

    return (
        <AnimatePresence>
            {course && (
                <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
                >
                    <m.div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="certificate-title"
                        initial={{ y: 24, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 24, opacity: 0 }}
                        transition={{ type: "spring", damping: 26, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                        className="board relative w-full max-w-3xl rounded-2xl p-3 sm:p-4 font-mono"
                    >
                        <div className="flex items-start justify-between gap-4 pb-3 pl-1">
                            <div className="min-w-0">
                                <p className="text-[11px] uppercase tracking-[0.18em] text-(--flap-dim)">Certificate · {course.issuer}</p>
                                <h3 id="certificate-title" className="mt-1 font-display text-3xl font-extrabold uppercase leading-[0.95] tracking-tight text-(--flap-ink)">
                                    {course.title}
                                </h3>
                            </div>
                            <button
                                type="button"
                                onClick={onClose}
                                autoFocus
                                aria-label="Close"
                                className="board-cell shrink-0 p-2 transition-colors hover:text-(--signal) focus-visible:outline-2 focus-visible:outline-ring"
                            >
                                <X className="size-5" />
                            </button>
                        </div>

                        <div className="board-cell relative flex aspect-video w-full items-center justify-center overflow-hidden">
                            {course.image ? (
                                course.image.endsWith(".pdf") ? (
                                    <iframe src={fileUrl(course.image) + "#view=FitH"} title={course.title} loading="lazy" className="h-full w-full border-none" />
                                ) : (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={fileUrl(course.image)} alt={course.title} loading="lazy" decoding="async" className="h-full w-full object-contain" />
                                )
                            ) : (
                                <Award className="size-14 text-(--flap-dim)" aria-hidden="true" />
                            )}
                        </div>

                        {course.image && (
                            <div className="flex justify-end pt-3">
                                <a
                                    href={fileUrl(course.image)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex h-10 items-center gap-2 rounded-full bg-(--signal) px-5 text-xs font-semibold uppercase tracking-[0.1em] text-background transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                                >
                                    Open file <ExternalLink className="size-4" aria-hidden="true" />
                                </a>
                            </div>
                        )}
                    </m.div>
                </m.div>
            )}
        </AnimatePresence>
    )
}

export function Courses() {
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
    const [showAll, setShowAll] = useState(false)
    const rows = showAll ? arrivals : arrivals.slice(0, INITIAL_ROWS)
    const certified = courses.filter((course) => course.image).length

    return (
        <section id="courses" className="relative py-24 md:py-32 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    index="05"
                    label="Arrivals"
                    title="What I've learned"
                    subtitle="The other side of the board: courses and certificates that landed, newest first."
                    meta={`${courses.length} courses · ${certified} certificates on file`}
                />

                <div className="board reveal rounded-2xl p-3 sm:p-4 font-mono">
                    <div className="flex items-center justify-between gap-3 pb-3 pl-1">
                        <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-(--flap-ink)">
                            <PlaneLanding className="w-3.5 h-3.5" aria-hidden="true" />
                            Arrivals
                        </p>
                        <p className="text-[11px] uppercase tracking-[0.14em]">{rows.length} of {courses.length}</p>
                    </div>

                    <div className="hidden md:grid grid-cols-[5.5rem_minmax(0,1fr)_minmax(0,15rem)_8rem] gap-1 pb-1.5 text-[10px] uppercase tracking-[0.18em]" aria-hidden="true">
                        <span className="px-3">Landed</span>
                        <span className="px-3">Course</span>
                        <span className="px-3">From</span>
                        <span className="px-3">Status</span>
                    </div>

                    <ol className="space-y-2.5 md:space-y-1.5">
                        {rows.map(({ course, landed }) => (
                            <li
                                key={course.title}
                                className="grid grid-cols-[5.5rem_minmax(0,1fr)] md:grid-cols-[5.5rem_minmax(0,1fr)_minmax(0,15rem)_8rem] gap-1"
                            >
                                <span className="board-cell flex items-center px-3 py-2 text-xs uppercase tabular-nums text-(--flap-dim)">
                                    {landed ? shortMonth(landed) : "—"}
                                </span>
                                <div className="board-cell px-3 py-2">
                                    <p className="font-sans text-sm font-semibold leading-snug">{course.title}</p>
                                    {/* On phones the issuer rides along under the title instead of taking its own row */}
                                    <p className="mt-1 text-[11px] uppercase tracking-[0.06em] md:hidden">{course.issuer}</p>
                                    {course.skills && course.skills.length > 0 && (
                                        <p className="mt-1 text-[10px] uppercase tracking-[0.1em] text-(--flap-dim)">{course.skills.join(" · ")}</p>
                                    )}
                                </div>
                                <span className="board-cell hidden md:flex items-center px-3 py-2 text-[11px] uppercase tracking-[0.06em]">
                                    {course.issuer}
                                </span>
                                {course.image ? (
                                    <button
                                        type="button"
                                        onClick={() => setSelectedCourse(course)}
                                        className="board-cell col-span-2 md:col-span-1 flex items-center justify-between gap-2 px-3 py-2 text-[11px] uppercase tracking-[0.08em] text-(--signal) transition-colors hover:bg-(--flap-hover) focus-visible:outline-2 focus-visible:outline-ring"
                                    >
                                        View cert
                                        <Award className="size-3.5" aria-hidden="true" />
                                        <span className="sr-only">for {course.title}</span>
                                    </button>
                                ) : (
                                    <span className="board-cell hidden md:flex items-center px-3 py-2 text-[11px] uppercase tracking-[0.08em]">
                                        <StatusMark status="landed" />
                                    </span>
                                )}
                            </li>
                        ))}
                    </ol>

                    {arrivals.length > INITIAL_ROWS && (
                        <div className="flex justify-center pt-3">
                            <button
                                type="button"
                                onClick={() => setShowAll((value) => !value)}
                                aria-expanded={showAll}
                                className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-(--flap-ink) transition-colors hover:text-(--signal) focus-visible:outline-2 focus-visible:outline-ring"
                            >
                                {showAll ? "Show fewer" : `Show all ${arrivals.length} arrivals`}
                                <ChevronDown className={cn("size-3.5 transition-transform", showAll && "rotate-180")} aria-hidden="true" />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <CertificationModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
        </section>
    )
}
