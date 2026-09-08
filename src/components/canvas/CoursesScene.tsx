"use client"

import * as THREE from "three"
import { useRef, useState, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Html, OrbitControls, useCursor } from "@react-three/drei"
import { useTheme } from "next-themes"
import { Award, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Course } from "@/components/sections/Courses"

function Card({ course, index, count, radius, onSelect }: { course: Course, index: number, count: number, radius: number, onSelect: (c: Course) => void }) {
    const angle = (index / count) * Math.PI * 2
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius

    const [hovered, setHovered] = useState(false)
    useCursor(hovered)

    return (
        <group position={[x, 0, z]} rotation={[0, angle, 0]}>
            <Html
                transform
                distanceFactor={1.5}
                position={[0, 0, 0]}
                style={{
                    transition: "all 0.2s",
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

function Carousel({ courses, radius = 8, onSelect }: { courses: Course[], radius?: number, onSelect: (c: Course) => void }) {
    const group = useRef<THREE.Group>(null)

    useFrame((_, delta) => {
        if (group.current) {
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
                    count={courses.length}
                    radius={radius}
                    onSelect={onSelect}
                />
            ))}
        </group>
    )
}

const PARTICLE_COUNT = 300

function Particles({ isDark }: { isDark: boolean }) {
    const mesh = useRef<any>(null)

    const dummy = useMemo(() => new THREE.Object3D(), [])
    const [particles] = useState(() => {
        const temp = []
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const t = Math.random() * 100
            const factor = 20 + Math.random() * 100
            const speed = 0.01 + Math.random() / 200
            const xFactor = -50 + Math.random() * 100
            const yFactor = -50 + Math.random() * 100
            const zFactor = -50 + Math.random() * 100
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
        }
        return temp
    })

    useFrame(() => {
        particles.forEach((particle, i) => {
            let { t } = particle
            const { factor, speed, xFactor, yFactor, zFactor } = particle
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
        <instancedMesh ref={mesh} args={[undefined, undefined, PARTICLE_COUNT]}>
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

export default function CoursesScene({ courses, onSelect }: { courses: Course[], onSelect: (c: Course) => void }) {
    const { resolvedTheme } = useTheme()
    const isDark = resolvedTheme === "dark"

    return (
        <Canvas camera={{ position: [0, 1.0, 10.5], fov: 60 }} dpr={[1, 1.5]}>
            <fog attach="fog" args={[isDark ? "#000" : "#fff", 15, 25]} />
            <ambientLight intensity={isDark ? 1.5 : 0.5} />
            <pointLight position={[10, 10, 10]} intensity={isDark ? 2 : 1} color={isDark ? "#818cf8" : "blue"} />

            <group position={[0, -1, 0]}>
                <Carousel courses={courses} radius={8} onSelect={onSelect} />
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
    )
}
