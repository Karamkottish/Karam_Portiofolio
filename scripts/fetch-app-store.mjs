// Pulls App Store listing data at build time so the hero board shows the live version.
// Runs as `prebuild`. If a lookup fails (offline CI, slow or rate-limited API) the committed
// src/data/app-store.json is kept as is, so the build never breaks over it.
import fs from "node:fs/promises"
import path from "node:path"

const APPS = [{ id: "6819293132", country: "sa" }] // Sama BTU
const OUT = path.join(process.cwd(), "src", "data", "app-store.json")
const TIMEOUT_MS = 30_000
const ATTEMPTS = 2

async function lookup({ id, country }) {
    const res = await fetch(`https://itunes.apple.com/lookup?id=${id}&country=${country}`, {
        signal: AbortSignal.timeout(TIMEOUT_MS),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const app = (await res.json()).results?.[0]
    if (!app) throw new Error("no listing found")
    return {
        name: app.trackName,
        version: app.version,
        released: app.currentVersionReleaseDate,
        firstReleased: app.releaseDate,
        releaseNotes: app.releaseNotes ?? null,
        url: app.trackViewUrl.split("?")[0],
        minimumOsVersion: app.minimumOsVersion,
        genre: app.primaryGenreName,
        rating: app.userRatingCount ? app.averageUserRating : null,
        ratingCount: app.userRatingCount ?? 0,
    }
}

async function lookupWithRetry(app) {
    for (let attempt = 1; ; attempt++) {
        try {
            return await lookup(app)
        } catch (error) {
            if (attempt >= ATTEMPTS) throw error
        }
    }
}

let previous = { apps: {} }
try {
    previous = JSON.parse(await fs.readFile(OUT, "utf8"))
} catch {
    // First run: nothing cached yet
}

const apps = { ...previous.apps }
for (const app of APPS) {
    try {
        apps[app.id] = await lookupWithRetry(app)
        console.log(`app-store: ${apps[app.id].name} v${apps[app.id].version}`)
    } catch (error) {
        console.warn(`app-store: kept cached data for ${app.id} (${error.message})`)
    }
}

// Only touch the file when the listing changed, so builds don't dirty the working tree
const next = JSON.stringify({ apps }, null, 2) + "\n"
if (next !== JSON.stringify(previous, null, 2) + "\n") {
    await fs.writeFile(OUT, next)
    console.log("app-store: updated src/data/app-store.json")
}
