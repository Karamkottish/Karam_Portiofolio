"use client"

import { useSyncExternalStore } from "react"

const STORAGE_KEY = "departures_last_visit"

// undefined until first read; read once per page load, then today's visit is recorded
let previousVisit: string | null | undefined

function readPreviousVisit() {
    if (previousVisit === undefined) {
        try {
            previousVisit = localStorage.getItem(STORAGE_KEY)
            localStorage.setItem(STORAGE_KEY, new Date().toISOString().slice(0, 10))
        } catch {
            // Storage blocked (private mode, disabled site data): treat as a first visit
            previousVisit = null
        }
    }
    return previousVisit
}

const subscribe = () => () => {}

type SinceLastVisitProps = {
    items: { product: string; shipped: string }[]
    /** Shown on first visits, or when nothing shipped since the last one. */
    children: React.ReactNode
}

/** Tells returning visitors which products shipped since they last came by. */
export function SinceLastVisit({ items, children }: SinceLastVisitProps) {
    const lastVisit = useSyncExternalStore(subscribe, readPreviousVisit, () => null)
    const lastMonth = lastVisit?.slice(0, 7)
    const fresh = lastMonth ? items.filter((item) => item.shipped > lastMonth).map((item) => item.product) : []

    if (fresh.length === 0) return <>{children}</>

    return (
        <span className="text-(--flap-ink)">
            New since your last visit: {fresh.join(", ")}
        </span>
    )
}
