import data from "./app-store.json"

/** One App Store listing, as written by scripts/fetch-app-store.mjs at build time. */
export type AppStoreListing = {
    name: string
    version: string
    /** ISO date of the current version */
    released: string
    firstReleased: string
    releaseNotes: string | null
    url: string
    minimumOsVersion: string
    genre: string
    rating: number | null
    ratingCount: number
}

export const SAMA_BTU_APP_ID = "6819293132"
export const SAMA_BTU_APP_STORE_URL = "https://apps.apple.com/sa/app/sama-btu/id6819293132"

export function appStoreListing(id: string): AppStoreListing | undefined {
    return (data.apps as Record<string, AppStoreListing | undefined>)[id]
}
