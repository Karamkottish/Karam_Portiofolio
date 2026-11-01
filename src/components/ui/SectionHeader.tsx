import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Swap } from "@/components/ui/Swap"

type PerspectiveCopy = ReactNode | { dev: ReactNode; pm: ReactNode }

function copy(value: PerspectiveCopy) {
    if (value && typeof value === "object" && "dev" in value && "pm" in value) {
        return <Swap dev={value.dev} pm={value.pm} />
    }
    return value
}

type SectionHeaderProps = {
    /** Two-digit position on the page, e.g. "02" */
    index: string
    /** The board's name for the section, e.g. "Logbook" */
    label: string
    title: PerspectiveCopy
    subtitle?: PerspectiveCopy
    /** A small mono line of facts under the subtitle, e.g. "9 companies · 13 roles" */
    meta?: ReactNode
    className?: string
}

/** Left-aligned section heading in the board's language: a numbered mono label over a signage title. */
export function SectionHeader({ index, label, title, subtitle, meta, className }: SectionHeaderProps) {
    return (
        <header className={cn("reveal mb-12 md:mb-16 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-end", className)}>
            <div>
                <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
                    <span className="text-(--signal)">{index}</span>
                    <span className="h-px w-8 bg-border" aria-hidden="true" />
                    {label}
                </p>
                <h2 className="mt-4 font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold uppercase leading-[0.88] tracking-tight text-foreground">
                    {copy(title)}
                </h2>
            </div>
            {(subtitle || meta) && (
                <div className="lg:text-right">
                    {subtitle && <p className="text-base md:text-lg leading-relaxed text-muted-foreground">{copy(subtitle)}</p>}
                    {meta && <p className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">{meta}</p>}
                </div>
            )}
        </header>
    )
}
