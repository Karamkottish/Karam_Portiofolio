import type { ComponentType } from "react"
import { FaGithub, FaGitlab, FaInstagram, FaLinkedin } from "react-icons/fa"

export const EMAIL = "karamkottish@gmail.com"

export type Profile = {
    name: string
    /** Handle or display name shown under the network name */
    label: string
    href: string
    icon: ComponentType<{ className?: string }>
}

// Public profiles, shown in the contact desk and the footer, and listed as sameAs in structured data
export const profiles: Profile[] = [
    { name: "GitHub", label: "Karamkottish", href: "https://github.com/Karamkottish", icon: FaGithub },
    { name: "GitLab", label: "KaramKottish01", href: "https://gitlab.com/KaramKottish01", icon: FaGitlab },
    { name: "LinkedIn", label: "Karam Hesham Kottish", href: "https://www.linkedin.com/in/karam-kottish/", icon: FaLinkedin },
    { name: "Instagram", label: "@eng.karamkottish", href: "https://www.instagram.com/eng.karamkottish/", icon: FaInstagram },
]
