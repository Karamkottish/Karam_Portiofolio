"use client"

import { useEffect } from "react"
import Script from "next/script"

// Google Analytics 4 Measurement ID ("G-..."), set as NEXT_PUBLIC_GA_ID in .env locally and in the deploy
// workflow. Public by design: it ships in the page source. While unset, nothing loads and no data is sent.
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID ?? ""

declare global {
    interface Window {
        dataLayer: unknown[]
        gtag?: (...args: unknown[]) => void
    }
}

// Outbound and download links worth counting, matched against the link's address
const LINK_EVENTS: [RegExp, string][] = [
    [/\.pdf(\?|$)/i, "cv_download"],
    [/apps\.apple\.com/, "app_store_click"],
    [/sama-tech\.ae/, "sama_btu_site_click"],
    [/kol-shei\.com/, "kol_shei_click"],
    [/tariquk\.com/, "tariquk_click"],
    [/github\.com/, "github_click"],
    [/gitlab\.com/, "gitlab_click"],
    [/linkedin\.com/, "linkedin_click"],
    [/instagram\.com/, "instagram_click"],
    [/^mailto:/, "email_click"],
    [/^tel:/, "phone_click"],
    [/wa\.me/, "whatsapp_click"],
]

function track(name: string, params: Record<string, string> = {}) {
    window.gtag?.("event", name, params)
}

/** Loads GA4 and reports clicks that matter on a portfolio. Renders nothing without a Measurement ID. */
export function Analytics() {
    useEffect(() => {
        if (!GA_MEASUREMENT_ID) return

        const onClick = (e: MouseEvent) => {
            const target = e.target as Element
            const link = target.closest<HTMLAnchorElement>("a[href]")
            if (link) {
                const href = link.getAttribute("href") ?? ""
                if (link.classList.contains("dep-row")) {
                    track("board_row_open", { project: link.querySelector(".dep-product")?.textContent?.trim() ?? href })
                    return
                }
                const match = LINK_EVENTS.find(([pattern]) => pattern.test(link.href) || pattern.test(href))
                if (match) track(match[1], { link_url: link.href })
                return
            }
            const perspective = target.closest<HTMLButtonElement>("[aria-label=Perspective] button")
            if (perspective) track("perspective_switch", { view: perspective.textContent?.trim().toLowerCase() ?? "" })
        }
        const onSubmit = (e: SubmitEvent) => {
            if ((e.target as HTMLElement).closest("#contact")) track("contact_form_submit")
        }

        document.addEventListener("click", onClick)
        document.addEventListener("submit", onSubmit)
        return () => {
            document.removeEventListener("click", onClick)
            document.removeEventListener("submit", onSubmit)
        }
    }, [])

    if (!GA_MEASUREMENT_ID) return null

    return (
        <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
            <Script id="ga4-init" strategy="afterInteractive">
                {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });`}
            </Script>
        </>
    )
}
