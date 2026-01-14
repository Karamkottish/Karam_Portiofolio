"use client"

import * as THREE from "three"
import { useRef, useState, useMemo, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, Image, Html, Float, Environment, OrbitControls, useCursor } from "@react-three/drei"
import { motion } from "framer-motion-3d"
import { motion as m, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { Award, Calendar, BookOpen, X, Download, ShieldCheck, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

type Course = {
    title: string
    issuer: string
    date: string
    image?: string
    skills?: string[]
}

const courses: Course[] = [
    { title: "AWS Certifications", issuer: "Manara", date: "Dec 2025", skills: ["Cloud Computing", "AWS Services"], image: "/images/courses/AWS-LV1.png" },
    { title: "Innovating with Google Cloud AI", issuer: "Simplilearn", date: "Jan 2025" },
    { title: "Scaling with Google Cloud Operations", issuer: "Google Cloud", date: "Dec 2024" },
    { title: "Master Flutter App Architectures", issuer: "Udemy", date: "Nov 2025", skills: ["Flutter", "Clean Architecture", "MVVM"] },
    { title: "Frontend Engineering with React", issuer: "Manara", date: "Aug 2025", skills: ["React.js", "GitHub"] },
    { title: "Modern Javascript", issuer: "Manara", date: "Sep 2025", skills: ["JavaScript", "API"] },
    { title: "Flutter - Beginner", issuer: "Merit Center", date: "Jan 2024", skills: ["Mobile Dev"] },
    { title: "Python Programming", issuer: "Google Cloud", date: "May 2021" },
    { title: "Intro to Database & SQL", issuer: "Google Cloud", date: "Jun 2021" },
    { title: "Agile Methodology", issuer: "Edraak", date: "Sep 2025", skills: ["Agile"], image: "/images/courses/Agile Methodology.pdf" },
    { title: "Project Management Core", issuer: "Udemy", date: "Dec 2025", image: "/images/courses/ProjectEN.pdf" },
    { title: "UI UX", issuer: "Edraak", date: "Sep 2025", image: "/images/courses/uiuxen.pdf" },
    { title: "Intro to Cryptography", issuer: "Univ. of Leeds", date: "Feb 2025" },
    { title: "Ethical hacking 101", issuer: "Simplilearn", date: "Dec 2024" },
    { title: "Cisco Certified Network Associate", issuer: "Hadara", date: "May 2023" },
    { title: "Product Management Foundation", issuer: "Edraak", date: "Sep 2025", image: "/images/courses/Product Mnagament.jpg" },
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
                            {course.image ? (
                                course.image.endsWith('.pdf') ? (
                                    <iframe src={course.image + "#view=FitH"} className="w-full h-full border-none" />
                                ) : (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={course.image} alt={course.title} className="w-full h-full object-contain" />
                                )
                            ) : (
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

function Card({ course, index, count, radius, onSelect }: { course: Course, index: number, count: number, radius: number, onSelect: (c: Course) => void }) {
    const angle = (index / count) * Math.PI * 2
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius
    const rotY = Math.atan2(x, z) // Face outward? or inward?

    // Actually, simple circular arrangement facing center or tangent?
    // Let's face outward from center: rotation = angle

    const [hovered, setHovered] = useState(false)
    useCursor(hovered)

    return (
        <group
            position={[x, 0, z]}
            rotation={[0, angle, 0]}
        >
            <Html
                transform
                occlude
                distanceFactor={1.5}
                position={[0, 0, 0]}
                style={{
                    transition: 'all 0.2s',
                    opacity: 1,
                    transform: `scale(${hovered ? 1.1 : 1})`,
                }}
            >
                <div
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                    onClick={() => onSelect(course)}
                    className={cn(
                        "w-64 p-5 rounded-2xl backdrop-blur-md border border-white/20 shadow-xl select-none transition-colors duration-300 cursor-pointer",
                        "bg-white/80 dark:bg-zinc-900/90 dark:border-white/20"
                    )}
                >
                    <div className="w-10 h-10 mb-4 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                        <Award className="text-white w-5 h-5" />
                    </div>

                    <h3 className="text-lg font-bold leading-tight mb-2 text-gray-900 dark:text-white">
                        {course.title}
                    </h3>

                    <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
                        <span className="font-semibold text-blue-600 dark:text-blue-400">
                            {course.issuer}
                        </span>
                        <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {course.date}
                        </span>
                    </div>

                    {course.skills && (
                        <div className="flex flex-wrap gap-1">
                            {course.skills.map(s => (
                                <span key={s} className="px-2 py-0.5 text-[10px] rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300">
                                    {s}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </Html>
        </group>
    )
}

function Carousel({ radius = 8, count = courses.length, onSelect }: { radius?: number, count?: number, onSelect: (c: Course) => void }) {
    const group = useRef<any>(null)

    useFrame((state, delta) => {
        if (group.current) {
            // Constant subtle Rotation
            group.current.rotation.y += delta * 0.05
        }
    })

    return (
        <group ref={group}>
            {courses.map((course, i) => (
                <Card
                    key={i}
                    course={course}
                    index={i}
                    count={count}
                    radius={radius}
                    onSelect={onSelect}
                />
            ))}
        </group>
    )
}

function Particles({ isDark }: { isDark: boolean }) {
    const mesh = useRef<any>(null)
    const count = 1000

    const dummy = useMemo(() => new THREE.Object3D(), [])
    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100
            const factor = 20 + Math.random() * 100
            const speed = 0.01 + Math.random() / 200
            const xFactor = -50 + Math.random() * 100
            const yFactor = -50 + Math.random() * 100
            const zFactor = -50 + Math.random() * 100
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
        }
        return temp
    }, [count])

    useFrame((state, delta) => {
        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle
            t = particle.t += speed / 2
            const a = Math.cos(t) + Math.sin(t * 1) / 10
            const b = Math.sin(t) + Math.cos(t * 2) / 10
            const s = Math.cos(t)

            dummy.position.set(
                (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
            )
            dummy.scale.setScalar(s)
            dummy.rotation.set(s * 5, s * 5, s * 5)
            dummy.updateMatrix()
            mesh.current.setMatrixAt(i, dummy.matrix)
        })
        mesh.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <dodecahedronGeometry args={[0.2, 0]} />
            <meshStandardMaterial
                color={isDark ? "#c4b5fd" : "#8b5cf6"}
                roughness={isDark ? 0.2 : 0.5}
                metalness={isDark ? 0.8 : 0.5}
                transparent
                opacity={isDark ? 0.6 : 0.4}
            />
        </instancedMesh>
    )
}

export function Courses() {
    const { resolvedTheme } = useTheme()
    const isDark = resolvedTheme === "dark"
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

    return (
        <section id="courses" className="h-screen w-full relative overflow-hidden bg-background">
            <div className="absolute top-10 w-full text-center z-10 pointer-events-none">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
                    Certified <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-violet-500">Expertise</span>
                </h2>
                <p className="text-muted-foreground text-sm md:text-base">Drag to explore certifications</p>
            </div>

            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 1.0, 10.5], fov: 60 }} dpr={[1, 2]}>
                    <fog attach="fog" args={[isDark ? '#000' : '#fff', 15, 25]} />
                    <ambientLight intensity={isDark ? 1.5 : 0.5} />
                    <pointLight position={[10, 10, 10]} intensity={isDark ? 2 : 1} color={isDark ? "#818cf8" : "blue"} />

                    <group position={[0, -1, 0]}>
                        <Carousel radius={8} onSelect={setSelectedCourse} />
                    </group>

                    <Particles isDark={isDark} />

                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        minPolarAngle={Math.PI / 2 - 0.1}
                        maxPolarAngle={Math.PI / 2 + 0.1}
                        rotateSpeed={0.5}
                    />
                </Canvas>
            </div>

            {/* Gradient overlays for depth */}
            <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-background to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-background to-transparent pointer-events-none" />

            {/* Modal Layer */}
            <CertificationModal course={selectedCourse!} onClose={() => setSelectedCourse(null)} />
        </section>
    )
}
