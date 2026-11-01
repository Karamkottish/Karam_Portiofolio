import { cn } from "@/lib/utils"
import { type DepartureStatus, statusLabels } from "@/data/departures"

const statusInk: Record<DepartureStatus, string> = {
    live: "text-emerald-700 dark:text-emerald-400",
    boarding: "text-amber-700 dark:text-amber-300",
    "in-flight": "text-teal-700 dark:text-teal-300",
    landed: "text-(--flap-dim)",
}

const statusDot: Record<DepartureStatus, string> = {
    live: "bg-emerald-500",
    boarding: "bg-amber-500",
    "in-flight": "bg-teal-500",
    landed: "bg-stone-400 dark:bg-stone-600",
}

/** Dot and label for a board status (Live, Boarding, In flight, Landed). */
export function StatusMark({ status, className }: { status: DepartureStatus; className?: string }) {
    return (
        <span className={cn("flex h-full items-center gap-1.5", statusInk[status], className)}>
            <span className={cn("size-1.5 shrink-0 rounded-full", statusDot[status])} aria-hidden="true" />
            {statusLabels[status]}
        </span>
    )
}
