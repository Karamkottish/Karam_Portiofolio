import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/**
 * Text that changes with the Engineer / Product perspective. Both versions are in the HTML and CSS
 * picks one from <html data-perspective>, so it is right on first paint and never shifts layout.
 */
export function Swap({ dev, pm, className }: { dev: ReactNode; pm: ReactNode; className?: string }) {
    return (
        <span className={cn("persp-swap", className)}>
            <span className="persp-dev">{dev}</span>
            <span className="persp-pm">{pm}</span>
        </span>
    )
}
