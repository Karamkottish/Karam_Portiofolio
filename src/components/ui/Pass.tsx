import type { ReactNode } from "react"
import { Plane } from "lucide-react"
import { cn } from "@/lib/utils"
import { StatusMark } from "@/components/ui/StatusMark"
import type { DepartureStatus } from "@/data/departures"

export type PassField = { label: string; value: ReactNode; title?: string }
export type PassLink = { label: string; href: string; icon: ReactNode }

type PassProps = {
    /** "01", "02"…: the pass's place in the logbook */
    serial: string
    /** Small line above the title, e.g. "Full-time" */
    kicker: string
    title: string
    status: DepartureStatus
    /** Short route labels like "APR 26" and "NOW" */
    from?: string
    to: string
    duration?: string
    /** The route in words for screen readers, e.g. "April 2026 to now, 7 months" */
    routeLabel: string
    fields: PassField[]
    tags?: string[]
    links?: PassLink[]
    children?: ReactNode
    className?: string
}

function RoutePoint({ label, value, align = "left" }: { label: string; value: string; align?: "left" | "right" }) {
    return (
        <div className={cn(align === "right" && "text-right")}>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
            <p className="mt-1 font-mono text-2xl sm:text-3xl font-semibold uppercase tracking-tight text-foreground">{value}</p>
        </div>
    )
}

/**
 * A boarding-pass card: header, route (from → to with duration), a strip of fields, free body
 * content, then a tear line and a stub for tags and links. Used by the logbook and education.
 */
export function Pass({ serial, kicker, title, status, from, to, duration, routeLabel, fields, tags, links, children, className }: PassProps) {
    const hasStub = Boolean(tags?.length || links?.length)

    return (
        <article className={cn("pass reveal", className)}>
            <header className="flex items-start justify-between gap-4 px-5 pt-5 sm:px-6 sm:pt-6">
                <div className="min-w-0">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                        <span className="text-(--signal)">{serial}</span> · {kicker}
                    </p>
                    <h3 className="mt-1.5 font-display text-3xl sm:text-4xl font-extrabold uppercase leading-[0.9] tracking-tight text-foreground">
                        {title}
                    </h3>
                </div>
                <span className="shrink-0 h-7 rounded bg-muted px-2.5 font-mono text-[11px] uppercase tracking-[0.08em]">
                    <StatusMark status={status} />
                </span>
            </header>

            <p className="sr-only">{routeLabel}</p>
            <div className="mt-5 grid grid-cols-[auto_minmax(0,1fr)_auto] items-end gap-3 px-5 sm:px-6" aria-hidden="true">
                <RoutePoint label="From" value={from ?? "—"} />
                <div className="relative mb-3 flex items-center">
                    <span className="h-0 flex-1 border-t border-dashed border-border" />
                    <Plane className="mx-2 size-4 rotate-45 text-(--signal)" />
                    <span className="h-0 flex-1 border-t border-dashed border-border" />
                    {duration && (
                        <span className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                            {duration}
                        </span>
                    )}
                </div>
                <RoutePoint label="To" value={to} align="right" />
            </div>

            <dl className="mx-5 mt-5 grid grid-cols-3 overflow-hidden rounded-lg border border-border sm:mx-6">
                {fields.map((field, i) => (
                    <div key={field.label} className={cn("min-w-0 px-3 py-2.5", i > 0 && "border-l border-border")}>
                        <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{field.label}</dt>
                        <dd className="mt-1 truncate font-mono text-[13px] uppercase text-foreground" title={field.title}>
                            {field.value}
                        </dd>
                    </div>
                ))}
            </dl>

            {children && <div className="flex-1 space-y-5 px-5 py-5 sm:px-6">{children}</div>}

            {hasStub && (
                <>
                    <div className="pass-perf mt-auto" aria-hidden="true" />
                    <footer className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-6">
                        {tags && tags.length > 0 && (
                            <ul className="flex flex-wrap gap-1.5" aria-label="Skills">
                                {tags.map((tag) => (
                                    <li key={tag} className="rounded bg-muted px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-foreground">
                                        {tag}
                                    </li>
                                ))}
                            </ul>
                        )}
                        {links && links.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {links.map((link) => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex h-8 items-center gap-1.5 rounded border border-border px-3 font-mono text-[11px] uppercase tracking-[0.08em] text-foreground transition-colors hover:border-(--signal) hover:text-(--signal) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                                    >
                                        {link.icon}
                                        {link.label}
                                        <span className="sr-only">(opens in a new tab)</span>
                                    </a>
                                ))}
                            </div>
                        )}
                    </footer>
                </>
            )}
        </article>
    )
}
