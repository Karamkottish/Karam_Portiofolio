"use client"

import { useRef, useMemo, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, OrbitControls, FlyControls } from "@react-three/drei"
import * as THREE from "three"
import { useTheme } from "next-themes"

const WHITE = new THREE.Color("#fff")

function Word({ children, position, color }: { children: string, position: THREE.Vector3, color: string }) {
    const colorRef = useMemo(() => new THREE.Color(color), [color])
    const ref = useRef<any>(null)
    const [hovered, setHovered] = useState(false)

    // Animate color based on hover
    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.material.color.lerp(
                hovered ? WHITE : colorRef,
                delta * 5
            )
            // Gently float
            ref.current.position.y += Math.sin(state.clock.elapsedTime * 2 + position.x) * 0.005
        }
    })

    return (
        <Text
            ref={ref}
            position={position}
            onPointerOver={(e) => {
                e.stopPropagation()
                setHovered(true)
                document.body.style.cursor = 'pointer'
            }}
            onPointerOut={() => {
                setHovered(false)
                document.body.style.cursor = 'auto'
            }}
            onClick={() => {
                // Could expand to show projects that use this skill
                console.log("Clicked:", children)
            }}
            fontSize={hovered ? 1.2 : 0.8}
            lineHeight={1}
            letterSpacing={0.02}
            textAlign="center"
            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf"
            color={colorRef}
            anchorX="center"
            anchorY="middle"
        >
            {children}
        </Text>
    )
}

function Cloud({ mode, isDark }: { mode: "pm" | "dev", isDark: boolean }) {
    // Generate random positions on a sphere
    const words = useMemo(() => {
        const devSkills = [
            "Flutter", "React Native", "TypeScript", "Next.js", "Three.js", "Python",
            "PHP", "MySQL", "PostgreSQL", "Firebase", "AWS", "Docker", "GetX", "Tailwind",
            "Git", "FastAPI", "React", "Node.js", "Supabase", "UI/UX", "REST API", "GraphQL"
        ]
        const pmSkills = [
            "Agile", "Scrum", "Roadmapping", "User Research", "A/B Testing", "Data Analysis",
            "Stakeholder Mgmt", "Jira", "Vision Strategy", "Product KPIs", "Market Research",
            "Wireframing", "Figma", "Go-To-Market", "Sprint Planning", "Risk Management",
            "Prioritization", "Growth Metrics", "Customer Journey", "Value Prep"
        ]

        const currentSkills = mode === "dev" ? devSkills : pmSkills
        const count = currentSkills.length

        const pmColor = isDark ? "#c084fc" : "#9333ea" // Purple for PM
        const devColor = isDark ? "#38bdf8" : "#0284c7" // Blue for Dev

        // Spherical distribution
        const temp = []
        const spherical = new THREE.Spherical()
        const phiSpan = Math.PI / (Math.sqrt(count))
        const thetaSpan = (Math.PI * 2) / Math.sqrt(count)

        for (let i = 0; i < count; i++) {
            // Randomize slightly for organic look
            const phi = Math.acos(-1 + (2 * i) / count)
            const theta = Math.sqrt(count * Math.PI) * phi

            const position = new THREE.Vector3().setFromSphericalCoords(
                Math.max(6, Math.random() * 10), // variable radius
                phi,
                theta
            )

            // Randomize color slightly based on the base color
            const hsl = {} as any
            new THREE.Color(mode === "pm" ? pmColor : devColor).getHSL(hsl)

            const color = new THREE.Color().setHSL(
                hsl.h + (Math.random() * 0.1 - 0.05),
                hsl.s,
                Math.max(0.4, Math.random() * 0.8)
            ).getStyle()

            temp.push({
                word: currentSkills[i],
                position,
                color
            })
        }
        return temp
    }, [mode, isDark])

    const groupRef = useRef<THREE.Group>(null)

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.x -= delta * 0.05
            groupRef.current.rotation.y -= delta * 0.05
        }
    })

    return (
        <group ref={groupRef}>
            {words.map((w, i) => (
                <Word key={i} position={w.position} color={w.color}>
                    {w.word}
                </Word>
            ))}
        </group>
    )
}

export default function SkillsCanvas({ mode }: { mode: "pm" | "dev" }) {
    const { resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const isDark = mounted && resolvedTheme === "dark"

    return (
        <div className="w-full h-[600px] md:h-[800px] relative cursor-grab active:cursor-grabbing">
            <Canvas camera={{ position: [0, 0, 15], fov: 60 }} dpr={[1, 1.5]}>
                <fog attach="fog" args={[isDark ? '#09090b' : '#ffffff', 10, 25]} />
                <ambientLight intensity={isDark ? 0.8 : 0.5} />
                <Cloud mode={mode} isDark={isDark} />
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={1}
                />
            </Canvas>
        </div>
    )
}
