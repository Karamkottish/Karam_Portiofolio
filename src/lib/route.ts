// Helpers that turn "Apr 2026 - Present" style periods and "Damascus, Syria - Onsite" locations
// into the route, duration and base code a pass card shows.

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

/** A calendar month; m is 0-11. */
export type YearMonth = { y: number; m: number }

export function currentMonth(date = new Date()): YearMonth {
    return { y: date.getUTCFullYear(), m: date.getUTCMonth() }
}

export function parseMonth(text: string): YearMonth | null {
    const [month, year] = text.trim().split(/\s+/)
    const m = MONTHS.indexOf((month ?? "").slice(0, 3).toLowerCase())
    if (m < 0 || !year) return null
    return { y: Number(year), m }
}

export type Period = { start: YearMonth | null; end: YearMonth | null; present: boolean }

export function parsePeriod(period: string, now: YearMonth): Period {
    const [first, second] = period.split(" - ")
    const present = /present/i.test(second ?? "")
    return {
        start: parseMonth(first),
        end: present ? now : parseMonth(second ?? first),
        present,
    }
}

export const toIndex = (ym: YearMonth) => ym.y * 12 + ym.m

/** "APR 26" */
export function shortMonth(ym: YearMonth) {
    return `${MONTHS[ym.m].toUpperCase()} ${String(ym.y).slice(2)}`
}

/** "April 2026" */
export function longMonth(ym: YearMonth) {
    return `${MONTH_NAMES[ym.m]} ${ym.y}`
}

/** Inclusive month count, the way CVs count it: Aug 2025 to Aug 2026 is 13 months. */
export function monthsBetween(start: YearMonth, end: YearMonth) {
    return toIndex(end) - toIndex(start) + 1
}

/** "1 YR 1 MO" for the card, "1 year 1 month" for screen readers */
export function formatSpan(months: number, spoken = false) {
    const years = Math.floor(months / 12)
    const rest = months % 12
    const parts = spoken
        ? [years && `${years} year${years > 1 ? "s" : ""}`, rest && `${rest} month${rest > 1 ? "s" : ""}`]
        : [years && `${years} YR`, rest && `${rest} MO`]
    return parts.filter(Boolean).join(" ")
}

// Airport codes stand in for cities, the way a pass prints them
const BASES: [RegExp, string][] = [
    [/damascus/i, "DAM"],
    [/riyadh/i, "RUH"],
    [/bengaluru|bangalore/i, "BLR"],
    [/chicago/i, "ORD"],
]

export type Base = { code: string; city: string; place: string; mode?: string }

export function parseLocation(location?: string): Base | null {
    if (!location) return null
    const [place, mode] = location.split(" - ").map((part) => part.trim())
    const code = BASES.find(([pattern]) => pattern.test(place))?.[1] ?? place.slice(0, 3).toUpperCase()
    return { code, city: place.split(",")[0], place, mode }
}
