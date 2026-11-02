import { cn } from "@/lib/utils"

// The split-flap K: a 64x64 tile cut by the hinge, with the K's arms meeting exactly at the cut.
// public/images/logo*.svg are drawn from the same geometry.
const TILE_TOP = "M2 31V16A14 14 0 0 1 16 2H48A14 14 0 0 1 62 16V31Z"
const TILE_BOTTOM = "M2 33H62V48A14 14 0 0 1 48 62H16A14 14 0 0 1 2 48Z"
const K_TOP = "M17 15H25V28L35.5 15H45L32.39 31H17Z"
const K_BOTTOM = "M17 33H33.16L45.5 49H36L25 35.5V49H17Z"

/** The mark alone. Colours come from CSS: the tile follows the theme, the dot follows the perspective. */
export function LogoMark({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 64 64" className={cn("logo-mark", className)} aria-hidden="true" focusable="false">
            {/* The top flap clacks when the logo is hovered (see .logo-flap in globals.css) */}
            <g className="logo-flap">
                <path d={TILE_TOP} className="logo-tile-top" />
                <path d={K_TOP} className="logo-ink" />
                <circle cx="51" cy="13" r="3" className="logo-dot" />
            </g>
            <path d={TILE_BOTTOM} className="logo-tile" />
            <path d={K_BOTTOM} className="logo-ink" />
        </svg>
    )
}

/**
 * Mark plus the name as live text in the display face. The optical size is pinned to the condensed
 * signage cut, which the font would otherwise only use at large sizes.
 */
export function Logo({ className, size = "md" }: { className?: string; size?: "md" | "lg" }) {
    return (
        <span className={cn("logo inline-flex items-center", size === "lg" ? "gap-3" : "gap-2.5", className)}>
            <LogoMark className={cn("shrink-0", size === "lg" ? "size-12" : "size-8")} />
            <span
                className={cn(
                    "font-display font-extrabold uppercase leading-none tracking-[0.03em] text-foreground [font-variation-settings:'opsz'_72]",
                    size === "lg" ? "text-4xl" : "text-2xl"
                )}
            >
                Karam Kottish
            </span>
        </span>
    )
}
