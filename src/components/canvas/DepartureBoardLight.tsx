"use client"

import { Component, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { InViewport } from "@/components/canvas/InViewport"

const DepartureBoardCanvas = dynamic(() => import("@/components/canvas/DepartureBoardCanvas"), { ssr: false })

function canRenderLight() {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
    if (!finePointer || saveData) return false
    if ("gpu" in navigator) return true
    try {
        return !!document.createElement("canvas").getContext("webgl2")
    } catch {
        return false
    }
}

/** The light layer is decoration: if the GPU setup fails, drop it and keep the page. */
class LightBoundary extends Component<{ children: React.ReactNode }, { failed: boolean }> {
    state = { failed: false }

    static getDerivedStateFromError() {
        return { failed: true }
    }

    render() {
        return this.state.failed ? null : this.props.children
    }
}

/**
 * Gate for the board's material layer. Touch screens, Save-Data and browsers with neither WebGPU
 * nor WebGL2 never load it; everyone else gets it after the page has loaded and gone idle, so it
 * never competes with LCP. InViewport also skips it for reduced motion and unmounts it once the
 * hero is scrolled away.
 */
export function DepartureBoardLight() {
    const [allowed, setAllowed] = useState(false)

    useEffect(() => {
        let idleId = 0
        let timeoutId = 0
        const start = () => {
            if (!canRenderLight()) return
            // Typed as always present, but older Safari lacks it
            const requestIdle = window.requestIdleCallback as typeof window.requestIdleCallback | undefined
            if (requestIdle) {
                idleId = requestIdle(() => setAllowed(true), { timeout: 2500 })
            } else {
                timeoutId = window.setTimeout(() => setAllowed(true), 1200)
            }
        }

        if (document.readyState === "complete") start()
        else window.addEventListener("load", start, { once: true })

        return () => {
            window.removeEventListener("load", start)
            if (idleId) window.cancelIdleCallback(idleId)
            window.clearTimeout(timeoutId)
        }
    }, [])

    if (!allowed) return null

    return (
        <InViewport rootMargin="200px" className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-[inherit]">
            <LightBoundary>
                <DepartureBoardCanvas />
            </LightBoundary>
        </InViewport>
    )
}
