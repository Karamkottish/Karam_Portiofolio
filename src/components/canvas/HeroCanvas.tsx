"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Stars } from "@react-three/drei"
import { useRef, useState, useEffect } from "react"
import * as THREE from "three"
import { useTheme } from "next-themes"

function AnimatedSphere({ isDark }: { isDark: boolean }) {
    const materialRef = useRef<any>(null)

    useFrame((state, delta) => {
        if (materialRef.current) {
            // Smoothly transition colors and properties
            let targetColor;
            let targetEmissive;

            if (isDark) {
                targetColor = new THREE.Color("#818cf8")
                targetEmissive = new THREE.Color("#312e81")
            } else {
                // Rainbow animation in light mode
                const time = state.clock.elapsedTime
                targetColor = new THREE.Color().setHSL((time * 0.1) % 1, 0.8, 0.6)
                targetEmissive = new THREE.Color().setHSL((time * 0.1) % 1, 0.8, 0.2)
            }

            materialRef.current.color.lerp(targetColor, delta * 2)
            materialRef.current.emissive.lerp(targetEmissive, delta * 2)

            // Smoothly transition numbers
            materialRef.current.metalness = THREE.MathUtils.lerp(
                materialRef.current.metalness,
                isDark ? 0.3 : 0.1, // Less metal in light mode for more popping color
                delta * 2
            )
            materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(
                materialRef.current.emissiveIntensity,
                isDark ? 0.5 : 0.8, // Brighter in light mode
                delta * 2
            )

            // Distort animation (already in material but we can modulate it)
            materialRef.current.distort = THREE.MathUtils.lerp(
                materialRef.current.distort,
                isDark ? 0.6 : 0.4,
                delta
            )
        }
    })

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <Sphere args={[1, 100, 200]} scale={2.4}>
                <MeshDistortMaterial
                    ref={materialRef}
                    color="#4338ca" // Initial color
                    attach="material"
                    distort={0.4}
                    speed={2}
                    roughness={0}
                    metalness={1}
                />
            </Sphere>
        </Float>
    )
}

export default function HeroCanvas() {
    const { resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const isDark = mounted && resolvedTheme === "dark"

    return (
        <div className="w-full h-full relative">
            <Canvas className="w-full h-full" camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
                <ambientLight intensity={isDark ? 0.8 : 0.5} />
                <directionalLight position={[10, 10, 5]} intensity={isDark ? 1.5 : 1} color={isDark ? "#c084fc" : "#ffffff"} />
                <pointLight position={[-10, -10, -10]} intensity={1} color={isDark ? "#2dd4bf" : "#ff00ff"} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={isDark ? 2 : 1} />

                <AnimatedSphere isDark={isDark} />

                <Stars
                    radius={100}
                    depth={50}
                    count={3000}
                    factor={4}
                    saturation={0}
                    fade
                    speed={1}
                />

                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    )
}
