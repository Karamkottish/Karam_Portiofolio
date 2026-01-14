"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial, OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei"
import * as THREE from "three"
import { useTheme } from "next-themes"

function Globe({ isDark }: { isDark: boolean }) {
    const meshRef = useRef<any>(null)

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.05
        }
    })

    return (
        <group rotation={[0, 0, Math.PI / 6]}>
            {/* Wireframe Globe */}
            <points ref={meshRef}>
                <sphereGeometry args={[2.5, 64, 64]} />
                <pointsMaterial
                    color={isDark ? "#3b82f6" : "#2563eb"}
                    size={0.02}
                    transparent
                    opacity={0.4}
                    sizeAttenuation
                />
            </points>

            {/* Inner Core Glow */}
            <mesh>
                <sphereGeometry args={[2.4, 32, 32]} />
                <meshBasicMaterial color={isDark ? "#1e40af" : "#93c5fd"} transparent opacity={0.05} />
            </mesh>

            {/* Outer Atmosphere */}
            <mesh scale={1.2}>
                <sphereGeometry args={[2.5, 32, 32]} />
                <meshBasicMaterial color={isDark ? "#60a5fa" : "#3b82f6"} transparent opacity={0.05} side={THREE.BackSide} />
            </mesh>
        </group>
    )
}

function Satellites({ isDark }: { isDark: boolean }) {
    const group = useRef<any>(null)

    useFrame((state) => {
        if (group.current) {
            group.current.rotation.y = state.clock.elapsedTime * 0.2
            group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
        }
    })

    return (
        <group ref={group}>
            {/* Ring 1 */}
            <mesh rotation={[Math.PI / 3, 0, 0]}>
                <torusGeometry args={[3.5, 0.01, 16, 100]} />
                <meshBasicMaterial color={isDark ? "#a855f7" : "#d8b4fe"} transparent opacity={0.3} />
            </mesh>
            {/* Ring 2 */}
            <mesh rotation={[-Math.PI / 3, 0, 0]}>
                <torusGeometry args={[4, 0.01, 16, 100]} />
                <meshBasicMaterial color={isDark ? "#2dd4bf" : "#99f6e4"} transparent opacity={0.3} />
            </mesh>
        </group>
    )
}


export default function ContactCanvas() {
    const { resolvedTheme } = useTheme()
    const isDark = resolvedTheme === "dark"

    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none fade-in">
            <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />

                <Globe isDark={isDark} />
                <Satellites isDark={isDark} />

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    rotateSpeed={0.5}
                    autoRotate
                    autoRotateSpeed={0.5}
                />
            </Canvas>
        </div>
    )
}
