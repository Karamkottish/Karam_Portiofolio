"use client"

import { useEffect, useRef, useState } from "react"

type InViewportProps = {
    children: React.ReactNode
    className?: string
    /** How far outside the viewport to start mounting (prefetch margin). */
    rootMargin?: string
    /** Keep children mounted once shown (use for above-the-fold canvases). */
    once?: boolean
    /** Rendered while off-screen or when the user prefers reduced motion. */
    fallback?: React.ReactNode
}

/**
 * Mounts heavy children (WebGL canvases) only while their slot is near the
 * viewport, and unmounts them when scrolled away so the GPU context is freed.
 * Renders `fallback` for users with `prefers-reduced-motion: reduce`.
 */
export function InViewport({
    children,
    className,
    rootMargin = "300px",
    once = false,
    fallback = null,
}: InViewportProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [inView, setInView] = useState(false)
    const [reduced, setReduced] = useState(false)

    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
        const sync = () => setReduced(mq.matches)
        sync()
        mq.addEventListener("change", sync)
        return () => mq.removeEventListener("change", sync)
    }, [])

    useEffect(() => {
        const el = ref.current
        if (!el || reduced) return

        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true)
                    if (once) io.disconnect()
                } else if (!once) {
                    setInView(false)
                }
            },
            { rootMargin }
        )
        io.observe(el)
        return () => io.disconnect()
    }, [rootMargin, once, reduced])

    return (
        <div ref={ref} className={className}>
            {inView && !reduced ? children : fallback}
        </div>
    )
}
