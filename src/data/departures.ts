import { formatDate } from "@/lib/utils"
import { SAMA_BTU_APP_ID, SAMA_BTU_APP_STORE_URL, appStoreListing } from "@/data/app-store"

export type DepartureStatus = "live" | "boarding" | "in-flight" | "landed"

export type Departure = {
    product: string
    year: string
    /** YYYY-MM. Compared against the visitor's last visit for "new since". */
    shipped: string
    status: DepartureStatus
    /** Read to screen readers after the status. */
    statusNote?: string
    /** A project card anchor ("#project-…") morphs into that card; anything else opens in a new tab. */
    href: string
    external?: boolean
    /** Public proof for structured data: store listing or live site. */
    liveUrl?: string
    /** Engineering face: what was built. */
    dev: { stack: string[]; platform: string[] }
    /** Product face: who ran it and what it moved. */
    pm: { role: string[]; impact: string[] }
    /** First line of the release notes, shown when the row is hovered or focused. Keep under ~40 characters. */
    notes: string
    /** Hidden below the sm breakpoint so phones show three rows. */
    desktopOnly?: boolean
}

export const statusLabels: Record<DepartureStatus, string> = {
    live: "Live",
    boarding: "Boarding",
    "in-flight": "In flight",
    landed: "Landed",
}

function firstLine(text: string) {
    return text.split("\n").map((line) => line.trim()).find(Boolean) ?? text
}

// Pulled from the App Store at build time (scripts/fetch-app-store.mjs); undefined only if never fetched
const samaBtu = appStoreListing(SAMA_BTU_APP_ID)

// Hand-curated from the Experience and Projects sections. Every row must link to proof.
export const departures: Departure[] = [
    {
        product: "Sama BTU",
        year: samaBtu?.released.slice(0, 4) ?? "2026",
        shipped: samaBtu?.released.slice(0, 7) ?? "2026-10",
        status: "live",
        statusNote: "on the App Store",
        href: "#project-sama-btu",
        liveUrl: samaBtu?.url ?? SAMA_BTU_APP_STORE_URL,
        dev: { stack: ["React", "Vite"], platform: ["Web", samaBtu ? `iOS v${samaBtu.version}` : "iOS"] },
        pm: { role: ["Full-stack dev"], impact: ["Automated billing"] },
        notes: samaBtu?.releaseNotes
            ? firstLine(samaBtu.releaseNotes)
            : samaBtu
                ? `v${samaBtu.version} on the App Store since ${formatDate(new Date(samaBtu.released))}`
                : "Property and energy billing platform",
    },
    {
        product: "Kol Shei",
        year: "2026",
        shipped: "2026-10",
        status: "boarding",
        statusNote: "live in demo mode until payments are connected",
        href: "#project-kol-shei",
        liveUrl: "https://kol-shei.com/",
        dev: { stack: ["Next.js", "NestJS"], platform: ["Web", "API"] },
        pm: { role: ["Full-stack dev"], impact: ["VIN-checked orders"] },
        notes: "VIN check, 50% deposit, 4-stage tracking",
    },
    {
        product: "Paws Pal Connect",
        year: "2025",
        shipped: "2025-09",
        status: "boarding",
        statusNote: "Android version coming soon",
        href: "#project-paws-pal-connect",
        liveUrl: "https://www.pawspalconnect.com/",
        dev: { stack: ["Flutter", "FastAPI"], platform: ["Web", "Android"] },
        pm: { role: ["PM", "Team of 4"], impact: ["+32% engagement"] },
        notes: "Pet-care app built from scratch in Flutter",
    },
    {
        product: "Tariquk",
        year: "2026",
        shipped: "2026-08",
        status: "in-flight",
        statusNote: "product management ongoing",
        href: "https://tariquk.com/",
        external: true,
        liveUrl: "https://tariquk.com/",
        dev: { stack: ["Web platform"], platform: ["tariquk.com"] },
        pm: { role: ["Product manager"], impact: ["Leads team of 6"] },
        notes: "Leading a product team of 6, remotely",
        desktopOnly: true,
    },
    {
        product: "Cosmic Journey",
        year: "2026",
        shipped: "2026-01",
        status: "landed",
        href: "#project-cosmic-journey",
        dev: { stack: ["Three.js", "React"], platform: ["Web", "3D"] },
        pm: { role: ["Frontend dev"], impact: ["Live NASA data"] },
        notes: "Scroll-driven solar system, Kepler orbits",
        desktopOnly: true,
    },
    {
        product: "BustaniPlus",
        year: "2025",
        shipped: "2025-06",
        status: "landed",
        href: "#project-bustaniplus",
        dev: { stack: ["React Native"], platform: ["Mobile"] },
        pm: { role: ["React Native dev"], impact: ["Agritourism"] },
        notes: "Book farm tours and cultural experiences",
        desktopOnly: true,
    },
]

export const departuresTotal = "10+"
