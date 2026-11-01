import { ArrowRight, PlaneTakeoff } from "lucide-react"
import { cn } from "@/lib/utils"
import { Flap } from "@/components/ui/Flap"
import { StatusMark } from "@/components/ui/StatusMark"
import { Swap } from "@/components/ui/Swap"
import { PerspectiveSwitch } from "@/components/ui/PerspectiveSwitch"
import { SinceLastVisit } from "@/components/ui/SinceLastVisit"
import { BoardingTransitions } from "@/components/ui/BoardingTransitions"
import { DepartureBoardLight } from "@/components/canvas/DepartureBoardLight"
import { type Departure, departuresTotal, statusLabels } from "@/data/departures"

// Rows flip top to bottom, and the two flipping cells in a row a beat apart
const ROW_STAGGER_MS = 70
const CELL_STAGGER_MS = 45

function spoken(departure: Departure, face: "dev" | "pm") {
    const [first, second] = face === "dev"
        ? [departure.dev.stack, departure.dev.platform]
        : [departure.pm.role, departure.pm.impact]
    const status = [statusLabels[departure.status], departure.statusNote].filter(Boolean).join(", ")
    const opens = departure.external ? " (opens in a new tab)" : ""
    return `${departure.product}: ${first.join(", ")}; ${second.join(", ")}; ${departure.year}. Status: ${status}. Notes: ${departure.notes}.${opens}`
}

function DepartureRow({ departure, index }: { departure: Departure; index: number }) {
    const rowDelay = (index + 1) * ROW_STAGGER_MS

    return (
        <li className={cn(departure.desktopOnly && "hidden sm:block")}>
            <a
                href={departure.href}
                className="dep-row"
                {...(departure.external && { target: "_blank", rel: "noopener noreferrer" })}
            >
                <span className="sr-only pm:hidden">{spoken(departure, "dev")}</span>
                <span className="sr-only dev:hidden">{spoken(departure, "pm")}</span>
                <span className="dep-cells" aria-hidden="true">
                    <Flap className="dep-product font-semibold" dev={departure.product} />
                    <Flap
                        className="dep-a"
                        dev={departure.dev.stack.join(" · ")}
                        pm={departure.pm.role.join(" · ")}
                        delay={rowDelay}
                    />
                    <Flap
                        className="dep-b"
                        dev={departure.dev.platform.join(" · ")}
                        pm={departure.pm.impact.join(" · ")}
                        delay={rowDelay + CELL_STAGGER_MS}
                    />
                    <Flap className="dep-year hidden sm:block text-(--flap-dim)" dev={departure.year} />
                    <Flap className="dep-status" dev={<StatusMark status={departure.status} />} />
                    {/* Release notes drop down over the two flipping cells on hover or focus */}
                    <span className="dep-note" data-drop>
                        <span className="flap-text">
                            <span className="dep-note-label">Notes</span>
                            {departure.notes}
                        </span>
                    </span>
                </span>
            </a>
        </li>
    )
}

export function DepartureBoard({ departures }: { departures: Departure[] }) {
    return (
        <div data-departures className="board relative rounded-2xl p-3 sm:p-4 font-mono">
            <div className="flex items-center justify-between gap-3 pb-3 pl-1">
                <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-(--flap-ink)">
                    <PlaneTakeoff className="w-3.5 h-3.5" aria-hidden="true" />
                    Departures
                </p>
                <PerspectiveSwitch />
            </div>

            <div className="dep-cells hidden sm:grid pb-1.5 text-[10px] uppercase tracking-[0.18em]" aria-hidden="true">
                <span className="dep-product px-2">Product</span>
                <Swap className="dep-a px-2" dev="Stack" pm="Role" />
                <Swap className="dep-b px-2" dev="Platform" pm="Impact" />
                <span className="dep-year px-2">Year</span>
                <span className="dep-status px-2">Status</span>
            </div>

            <ol aria-label="Shipped products" className="space-y-2.5 sm:space-y-1.5">
                {departures.map((departure, index) => (
                    <DepartureRow key={departure.product} departure={departure} index={index} />
                ))}
            </ol>

            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 pt-3 pl-1 text-[11px] uppercase tracking-[0.14em]">
                <SinceLastVisit items={departures.map(({ product, shipped }) => ({ product, shipped }))}>
                    {departuresTotal} products shipped since 2023
                </SinceLastVisit>
                <a
                    href="#projects"
                    className="group inline-flex items-center gap-1.5 text-(--flap-ink) rounded-sm hover:underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                    All projects
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </a>
            </div>

            <BoardingTransitions />
            <DepartureBoardLight />
        </div>
    )
}
