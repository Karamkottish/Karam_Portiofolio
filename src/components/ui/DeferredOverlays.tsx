"use client"

import dynamic from "next/dynamic"

// Floating overlays that are never part of the first paint — load them
// after hydration so framer-motion + the GitHub fetch stay off the critical path.
const AIAssistant = dynamic(
    () => import("./AIAssistant").then((m) => m.AIAssistant),
    { ssr: false }
)
const CodingStatusWidget = dynamic(
    () => import("./CodingStatusWidget").then((m) => m.CodingStatusWidget),
    { ssr: false }
)

export function DeferredOverlays() {
    return (
        <>
            <CodingStatusWidget />
            <AIAssistant />
        </>
    )
}
