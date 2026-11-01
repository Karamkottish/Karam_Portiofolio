"use client"

import { useEffect } from "react"

const NAME = "departure"

/**
 * "Boarding": clicking a board row that points at a project card morphs the row into that card
 * with a same-document View Transition. Without support, or with reduced motion, it is a plain jump.
 * External rows and modified clicks (new tab, etc.) are left to the browser.
 */
export function BoardingTransitions() {
    useEffect(() => {
        const board = document.querySelector<HTMLElement>("[data-departures]")
        if (!board) return

        const onClick = (e: MouseEvent) => {
            if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
            const row = (e.target as Element).closest<HTMLAnchorElement>("a.dep-row")
            const hash = row?.getAttribute("href")
            if (!row || !hash?.startsWith("#")) return
            const card = document.getElementById(hash.slice(1))
            if (!card) return
            e.preventDefault()

            const land = () => {
                // Skip the card's own scroll-in fade so the morph lands on a visible card
                card.dataset.arrived = "true"
                card.scrollIntoView({ block: "start", behavior: "instant" })
                history.pushState(null, "", hash)
                card.setAttribute("tabindex", "-1")
                card.focus({ preventScroll: true })
            }

            const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
            if (typeof document.startViewTransition !== "function" || reduced) {
                land()
                return
            }

            row.style.viewTransitionName = NAME
            const transition = document.startViewTransition(() => {
                row.style.viewTransitionName = ""
                card.style.viewTransitionName = NAME
                land()
            })
            transition.finished.finally(() => {
                card.style.viewTransitionName = ""
            })
        }

        board.addEventListener("click", onClick)
        return () => board.removeEventListener("click", onClick)
    }, [])

    return null
}
