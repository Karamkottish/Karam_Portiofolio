"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export type PerspectiveMode = "pm" | "dev"

interface PerspectiveContextType {
    mode: PerspectiveMode
    setMode: (mode: PerspectiveMode) => void
    toggleMode: () => void
}

const PerspectiveContext = createContext<PerspectiveContextType | undefined>(undefined)

export function PerspectiveProvider({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState<PerspectiveMode>("dev") // Defaulting to dev initially

    useEffect(() => {
        const savedMode = localStorage.getItem("perspective_mode") as PerspectiveMode
        if (savedMode === "pm" || savedMode === "dev") {
            setMode(savedMode)
        }
    }, [])

    const handleSetMode = (newMode: PerspectiveMode) => {
        setMode(newMode)
        localStorage.setItem("perspective_mode", newMode)
    }

    const toggleMode = () => {
        handleSetMode(mode === "pm" ? "dev" : "pm")
    }

    return (
        <PerspectiveContext.Provider value={{ mode, setMode: handleSetMode, toggleMode }}>
            {children}
        </PerspectiveContext.Provider>
    )
}

export function usePerspective() {
    const context = useContext(PerspectiveContext)
    if (context === undefined) {
        throw new Error("usePerspective must be used within a PerspectiveProvider")
    }
    return context
}
