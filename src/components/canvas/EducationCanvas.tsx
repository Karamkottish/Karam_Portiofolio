"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial, Float } from "@react-three/drei"
import * as THREE from "three"
import { useTheme } from "next-themes"

function Helix({ isDark }: { isDark: boolean }) {
    const ref = useRef<any>(null)

    // Generate DNA Helix points
    const points = useMemo(() => {
        const temp = []
        const count = 100
        const radius = 2
        const height = 10

        // Strand 1
        for (let i = 0; i < count; i++) {
            const t = i / count
            const angle = t * Math.PI * 10
            const y = (t - 0.5) * height
            const x = Math.cos(angle) * radius
            const z = Math.sin(angle) * radius
            temp.push(x, y, z)
        }

        // Strand 2 (Offset by PI)
        for (let i = 0; i < count; i++) {
            const t = i / count
            const angle = t * Math.PI * 10 + Math.PI
            const y = (t - 0.5) * height
            const x = Math.cos(angle) * radius
            const z = Math.sin(angle) * radius
            temp.push(x, y, z)
        }

        // Random scattered particles for "Dust"
        for (let i = 0; i < 50; i++) {
            temp.push(
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 8
            )
        }

        return new Float32Array(temp)
    }, [])

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * 0.2
            ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
        }
    })

    return (
        <group rotation={[0, 0, Math.PI / 6]}>
            <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color={isDark ? "#2dd4bf" : "#3b82f6"}
                    size={0.15}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={isDark ? 0.8 : 0.6}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    )
}

function Connections({ isDark }: { isDark: boolean }) {
    const ref = useRef<any>(null)

    // Create lines connecting strands
    const lineGeo = useMemo(() => {
        const geometry = new THREE.BufferGeometry()
        const vertices = []
        const count = 50 // Fewer connections than points
        const radius = 2
        const height = 10

        for (let i = 0; i < count; i++) {
            const t = i / count
            const y = (t - 0.5) * height

            // Point on Strand 1
            const angle1 = t * Math.PI * 10
            vertices.push(
                Math.cos(angle1) * radius, y, Math.sin(angle1) * radius
            )

            // Point on Strand 2
            const angle2 = angle1 + Math.PI
            vertices.push(
                Math.cos(angle2) * radius, y, Math.sin(angle2) * radius
            )
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
        return geometry
    }, [])

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * 0.2
            ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
        }
    })

    return (
        <group rotation={[0, 0, Math.PI / 6]}>
            <lineSegments ref={ref} geometry={lineGeo}>
                <lineBasicMaterial
                    color={isDark ? "#e879f9" : "#a855f7"}
                    transparent
                    opacity={0.2}
                />
            </lineSegments>
        </group>
    )
}

export default function EducationCanvas() {
    const { resolvedTheme } = useTheme()
    const isDark = resolvedTheme === "dark"

    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none opacity-60">
            <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
                <ambientLight intensity={0.5} />
                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <Helix isDark={isDark} />
                    <Connections isDark={isDark} />
                </Float>
            </Canvas>
        </div>
    )
}
