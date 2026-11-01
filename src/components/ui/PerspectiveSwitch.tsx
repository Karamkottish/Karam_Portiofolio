"use client"

import { Briefcase, Code2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePerspective } from "@/components/PerspectiveProvider"

const buttonClass =
    "inline-flex items-center gap-1.5 h-8 px-3 rounded-full font-mono text-[11px] uppercase tracking-[0.12em] transition-colors cursor-pointer hover:text-(--flap-ink) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"

/** Segmented Engineer / Product control. Active styling comes from <html data-perspective>, so it is right before hydration. */
export function PerspectiveSwitch() {
    const { mode, setMode } = usePerspective()

    return (
        <div role="group" aria-label="Perspective" className="flex items-center gap-0.5 p-0.5 rounded-full border border-black/5 dark:border-white/10">
            <button
                type="button"
                aria-pressed={mode === "dev"}
                onClick={() => setMode("dev")}
                className={cn(buttonClass, "dev:bg-(--flap) dev:text-(--flap-ink) dev:shadow-sm")}
            >
                <Code2 className="w-3.5 h-3.5" aria-hidden="true" />
                Engineer
            </button>
            <button
                type="button"
                aria-pressed={mode === "pm"}
                onClick={() => setMode("pm")}
                className={cn(buttonClass, "pm:bg-(--flap) pm:text-(--flap-ink) pm:shadow-sm")}
            >
                <Briefcase className="w-3.5 h-3.5" aria-hidden="true" />
                Product
            </button>
        </div>
    )
}
