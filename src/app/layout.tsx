import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { PerspectiveProvider } from "@/components/PerspectiveProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DebugProvider } from "@/components/DebugProvider";
import { CodingStatusWidget } from "@/components/ui/CodingStatusWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Karam Kottish | Product Manager & Full Stack Developer",
  description: "Portfolio of Karam Kottish, a Product Manager and Full Stack Developer.",
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
              <CodingStatusWidget />
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
