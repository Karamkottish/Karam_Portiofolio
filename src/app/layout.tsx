import type { Metadata } from "next";
import { Big_Shoulders, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { PerspectiveProvider } from "@/components/PerspectiveProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DebugProvider } from "@/components/DebugProvider";
import { Analytics } from "@/components/Analytics";
import { DeferredOverlays } from "@/components/ui/DeferredOverlays";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Display face for headings; the optical-size axis gives the tight signage cut at large sizes
const bigShoulders = Big_Shoulders({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  axes: ["opsz"],
});

// metadata.icons URLs are not prefixed with basePath, so add it for GitHub Pages
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""

// Restores the saved perspective before first paint so CSS-driven UI never flashes the wrong mode
const perspectiveScript = `try{document.documentElement.dataset.perspective=localStorage.getItem("perspective_mode")==="pm"?"pm":"dev"}catch(e){}`

export const metadata: Metadata = {
  title: "Karam Kottish — Full-Stack Software Engineer & Product Manager",
  description:
    "Karam Kottish is a Full-Stack Software Engineer and Product Manager in Riyadh with 3+ years building scalable web and mobile products in Flutter, React Native, Next.js, TypeScript and FastAPI. Available for full-time and freelance work.",
  keywords: [
    "Karam Kottish",
    "Full-Stack Software Engineer",
    "Product Manager",
    "Flutter Developer",
    "React Native Developer",
    "Next.js",
    "TypeScript",
    "FastAPI",
    "Riyadh",
    "Saudi Arabia",
  ],
  authors: [{ name: "Karam Kottish" }],
  openGraph: {
    title: "Karam Kottish — Full-Stack Software Engineer & Product Manager",
    description:
      "3+ years building scalable web and mobile products in Flutter, React Native, Next.js and FastAPI. Led frontend teams and shipped 10+ products to production.",
    type: "website",
    locale: "en_US",
  },
  // The split-flap K as SVG; iOS needs a PNG for the home-screen icon
  icons: {
    icon: [{ url: `${basePath}/images/logo-mark.svg`, type: "image/svg+xml" }],
    apple: `${basePath}/images/apple-touch-icon.png`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The font variables live on <html> because the theme's --font-* tokens are resolved on :root;
    // on <body> they were undefined there and every font fell back to the system stack
    <html
      lang="en"
      data-perspective="dev"
      className={`${geistSans.variable} ${geistMono.variable} ${bigShoulders.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: perspectiveScript }} />
      </head>
      <body className="antialiased bg-background text-foreground">
        <Analytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <DebugProvider>
            <PerspectiveProvider>
              <DeferredOverlays />
              <Navbar />
              <main className="min-h-screen">
                {children}
              </main>
              <Footer />
            </PerspectiveProvider>
          </DebugProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
