import type { CSSProperties, ReactNode } from "react"
import { cn } from "@/lib/utils"

type FlapProps = {
    dev: ReactNode
    /** With a product face the tile becomes a split-flap that turns when the perspective changes. */
    pm?: string
    /** Stagger in ms, so a board flips as a wave rather than all at once. */
    delay?: number
    className?: string
}

/** A board tile. Shared by the departures board and the toolchain board; styles live in globals.css. */
export function Flap({ dev, pm, delay = 0, className }: FlapProps) {
    if (pm === undefined) {
        return (
            <span className={cn("flap", className)}>
                <span className="flap-text">{dev}</span>
            </span>
        )
    }

    return (
        <span className={cn("flap", className)} data-flap style={{ "--d": `${delay}ms` } as CSSProperties}>
            <span className="flap-half flap-upper"><span className="flap-text">{pm}</span></span>
            <span className="flap-half flap-lower"><span className="flap-text">{dev}</span></span>
            <span className="flap-leaf">
                <span className="flap-face"><span className="flap-text">{dev}</span></span>
                <span className="flap-face flap-face-back"><span className="flap-text">{pm}</span></span>
            </span>
        </span>
    )
}
