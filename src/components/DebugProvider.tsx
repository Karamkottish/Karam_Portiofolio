"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { Bug, Terminal as TerminalIcon, X } from "lucide-react"

export type LogEvent = {
    id: string
    timestamp: Date
    type: "click" | "render" | "state" | "network"
    message: string
}

type DebugContextType = {
    isDebugMode: boolean
    toggleDebugMode: () => void
    logs: LogEvent[]
    addLog: (type: LogEvent["type"], message: string) => void
    clearLogs: () => void
}

const DebugContext = createContext<DebugContextType | undefined>(undefined)

export function DebugProvider({ children }: { children: React.ReactNode }) {
    const [isDebugMode, setIsDebugMode] = useState(false)
    const [mounted, setMounted] = useState(false)
    const [logs, setLogs] = useState<LogEvent[]>([])
    const [showConsole, setShowConsole] = useState(true)

    useEffect(() => {
        setMounted(true)
        const savedMode = localStorage.getItem("debug_mode") === "true"
        setIsDebugMode(savedMode)
    }, [])

    useEffect(() => {
        if (!mounted) return
        localStorage.setItem("debug_mode", isDebugMode.toString())

        if (isDebugMode) {
            document.body.classList.add("debug-mode-active")
            addLog("state", "Developer Debug Mode Enabled.")
        } else {
            document.body.classList.remove("debug-mode-active")
        }
    }, [isDebugMode, mounted])

    const toggleDebugMode = () => setIsDebugMode(prev => !prev)

    const addLog = (type: LogEvent["type"], message: string) => {
        setLogs(prev => {
            const newLogs = [{ id: Math.random().toString(), timestamp: new Date(), type, message }, ...prev]
            return newLogs.slice(0, 50)
        })
    }

    const clearLogs = () => setLogs([])

    // Capture clicks
    useEffect(() => {
        if (!isDebugMode) return

        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            // Ensure we don't log clicks inside our own debug console
            if (target.closest("#debug-console-wrapper")) return

            let name = target.tagName.toLowerCase()
            if (target.id) name += `#${target.id}`
            if (target.className && typeof target.className === "string") {
                const firstClass = target.className.split(" ")[0]
                if (firstClass) name += `.${firstClass}`
            }
            addLog("click", `UI Interaction <${name}>`)
        }

        window.addEventListener("click", handleClick, true)
        return () => window.removeEventListener("click", handleClick, true)
    }, [isDebugMode])

    return (
        <DebugContext.Provider value={{ isDebugMode, toggleDebugMode, logs, addLog, clearLogs }}>
            {children}

            {/* The Debug Console UI */}
            {mounted && (
                <div id="debug-console-wrapper" className="fixed bottom-4 right-4 z-9999 flex flex-col gap-2 pointer-events-none items-end">
                    {/* Console View */}
                    {isDebugMode && showConsole && (
                        <div className="w-80 h-64 bg-black/95 text-green-400 font-mono text-xs rounded-xl border border-green-500/30 overflow-hidden shadow-2xl flex flex-col pointer-events-auto backdrop-blur-xl">
                            <div className="flex justify-between items-center p-3 border-b border-green-500/30 bg-black/50">
                                <div className="flex items-center gap-2">
                                    <TerminalIcon className="w-4 h-4 text-green-500" />
                                    <span className="font-bold tracking-widest uppercase">Dev Console</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button onClick={clearLogs} className="hover:text-white transition-colors uppercase text-[10px]">Clear</button>
                                    <button onClick={() => setShowConsole(false)} className="hover:text-white transition-colors bg-white/10 p-1 rounded-full"><X className="w-3 h-3" /></button>
                                </div>
                            </div>
                            <div className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-thin scrollbar-thumb-green-500/50">
                                {logs.map(log => (
                                    <div key={log.id} className="flex gap-3">
                                        <span className="text-gray-500 shrink-0 select-none">[{log.timestamp.toLocaleTimeString()}]</span>
                                        <span className={log.type === "click" ? "text-cyan-400" : log.type === "network" ? "text-purple-400" : "text-yellow-400"}>
                                            <span className="text-gray-600 mr-2">{`>`}</span>
                                            {log.message}
                                        </span>
                                    </div>
                                ))}
                                {logs.length === 0 && <span className="text-green-500/50 italic animate-pulse">Listening for system events...</span>}
                            </div>
                        </div>
                    )}

                    {/* Console Toggle Button */}
                    <div className="pointer-events-auto flex gap-2">
                        {isDebugMode && !showConsole && (
                            <button
                                onClick={() => setShowConsole(true)}
                                className="px-4 py-2 bg-black/90 hover:bg-black text-green-400 font-mono text-xs rounded-full shadow-lg transition-transform hover:scale-105 border border-green-500/30 backdrop-blur-md flex items-center gap-2"
                            >
                                <TerminalIcon className="w-4 h-4" /> Expand Console
                            </button>
                        )}
                        <button
                            onClick={toggleDebugMode}
                            className={`p-3 rounded-full shadow-lg transition-transform hover:scale-110 border backdrop-blur-md ${isDebugMode
                                    ? "bg-red-600/90 hover:bg-red-500 text-white border-red-400/30"
                                    : "bg-white/10 hover:bg-white/20 text-muted-foreground border-white/20"
                                }`}
                            title={isDebugMode ? "Disable Debug Mode" : "Enable Debug Mode"}
                        >
                            <Bug className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}
        </DebugContext.Provider>
    )
}

export const useDebug = () => {
    const context = useContext(DebugContext)
    if (context === undefined) {
        throw new Error("useDebug must be used within a DebugProvider")
    }
    return context
}
