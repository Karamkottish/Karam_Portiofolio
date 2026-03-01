"use client"

import { useEffect, useState } from "react"
import { GitBranch, GitCommit, GitPullRequest, Activity, ExternalLink } from "lucide-react"

type GitHubEvent = {
    id: string
    type: string
    created_at: string
    repo: {
        name: string
    }
    payload: Record<string, unknown>
}

export function CodingStatusWidget() {
    const [latestEvent, setLatestEvent] = useState<GitHubEvent | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchGitHubStatus() {
            try {
                // Using generic fetch to get latest public events
                const res = await fetch("https://api.github.com/users/Karamkottish/events/public?per_page=10")
                if (res.ok) {
                    const data: GitHubEvent[] = await res.json()
                    // Filter out meaningless events if desired, or just take the most recent push/pr
                    const meaningfulEvent = data.find(e => ["PushEvent", "PullRequestEvent", "CreateEvent"].includes(e.type))
                    if (meaningfulEvent) {
                        setLatestEvent(meaningfulEvent)
                    } else if (data.length > 0) {
                        setLatestEvent(data[0]) // Fallback to whatever
                    }
                }
            } catch (e) {
                console.error("Failed to fetch coding status", e)
            } finally {
                setLoading(false)
            }
        }
        fetchGitHubStatus()

        // Refresh every 5 minutes
        const interval = setInterval(fetchGitHubStatus, 5 * 60 * 1000)
        return () => clearInterval(interval)
    }, [])

    if (loading || !latestEvent) return null

    const timeAgo = (date: string) => {
        const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000)
        let interval = seconds / 31536000
        if (interval > 1) return Math.floor(interval) + "y ago"
        interval = seconds / 2592000
        if (interval > 1) return Math.floor(interval) + "mo ago"
        interval = seconds / 86400
        if (interval > 1) return Math.floor(interval) + "d ago"
        interval = seconds / 3600
        if (interval > 1) return Math.floor(interval) + "h ago"
        interval = seconds / 60
        if (interval > 1) return Math.floor(interval) + "m ago"
        return "Just now"
    }

    const actionText = () => {
        switch (latestEvent.type) {
            case "PushEvent": return "Pushed to"
            case "PullRequestEvent": return "Opened PR in"
            case "CreateEvent": return "Created branch in"
            case "WatchEvent": return "Starred"
            default: return "Active in"
        }
    }

    const icon = () => {
        switch (latestEvent.type) {
            case "PushEvent": return <GitCommit className="w-4 h-4 text-emerald-400" />
            case "PullRequestEvent": return <GitPullRequest className="w-4 h-4 text-emerald-400" />
            default: return <GitBranch className="w-4 h-4 text-emerald-400" />
        }
    }

    return (
        <a
            href={`https://github.com/${latestEvent.repo.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-4 left-4 z-40 hidden lg:flex items-center gap-3 p-3 rounded-xl bg-black/50 dark:bg-zinc-900/50 backdrop-blur-md border border-white/10 hover:border-emerald-500/50 hover:bg-black/80 transition-all group shadow-2xl"
        >
            <div className="relative flex items-center justify-center p-2 rounded-lg bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
                {icon()}
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
            </div>
            <div className="flex flex-col">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 uppercase tracking-wider">
                        <Activity className="w-3 h-3" />
                        Live Status
                    </span>
                    <span className="text-[10px] text-muted-foreground/80 font-mono tracking-tighter">({timeAgo(latestEvent.created_at)})</span>
                </div>
                <div className="text-sm font-medium text-foreground mt-0.5 group-hover:text-emerald-300 transition-colors line-clamp-1 max-w-[200px]">
                    {actionText()} <span className="font-bold">{latestEvent.repo.name.split("/")[1]}</span>
                </div>
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity ml-2 shrink-0" />
        </a>
    )
}
