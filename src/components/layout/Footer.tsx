export function Footer() {
    return (
        <footer className="py-8 bg-background border-t border-border/40">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <p className="text-muted-foreground text-sm">
                    © {new Date().getFullYear()} Karam Kottish. All rights reserved.
                </p>
            </div>
        </footer>
    )
}
