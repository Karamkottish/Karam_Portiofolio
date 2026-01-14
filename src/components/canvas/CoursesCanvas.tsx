"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Instance, Instances } from "@react-three/drei"
import * as THREE from "three"
import { useRef, useState } from "react"
import { useTheme } from "next-themes"

function FloatingShapes({ count = 30, isDark }: { count?: number, isDark: boolean }) {
    const mesh = useRef<any>(null)
    const [dummy] = useState(() => new THREE.Object3D())
    const [data] = useState(() =>
        new Array(count).fill(0).map(() => ({
            position: [
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 5
            ],
            rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
            scale: Math.random() * 0.5 + 0.2,
            speed: Math.random() * 0.2
        }))
    )

    useFrame((state, delta) => {
        data.forEach((d, i) => {
            d.rotation[0] += d.speed * delta
            d.rotation[1] += d.speed * delta

            dummy.position.set(d.position[0], d.position[1], d.position[2])
            dummy.rotation.set(d.rotation[0], d.rotation[1], d.rotation[2])
            dummy.scale.setScalar(d.scale)
            dummy.updateMatrix()
            mesh.current.setMatrixAt(i, dummy.matrix)
        })
        mesh.current.instanceMatrix.needsUpdate = true
    })

    return (
        <Instances range={count} ref={mesh}>
            <dodecahedronGeometry args={[0.5, 0]} />
            <meshStandardMaterial
                color={isDark ? "#c084fc" : "#60a5fa"}
                roughness={0.1}
                metalness={0.8}
                transparent
                opacity={0.3}
                wireframe={true}
            />
            {data.map((_, i) => (
                <Instance key={i} />
            ))}
        </Instances>
    )
}

export default function CoursesCanvas() {
    const { resolvedTheme } = useTheme()
    const isDark = resolvedTheme === "dark"

    return (
        <div className="w-full h-full absolute inset-0 -z-10 opacity-50">
            <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
                    <FloatingShapes isDark={isDark} />
                </Float>
            </Canvas>
        </div>
    )
}
