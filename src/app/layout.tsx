import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { PerspectiveProvider } from "@/components/PerspectiveProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DebugProvider } from "@/components/DebugProvider";
import { DeferredOverlays } from "@/components/ui/DeferredOverlays";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
  icons: {
    icon: "/images/karam-logo.png",
    shortcut: "/images/karam-logo.png",
    apple: "/images/karam-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
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
