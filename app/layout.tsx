import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { PostHogProvider } from "@/components/posthog-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { profile } from "@/lib/portfolio"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://habibiazmi123-github-io.vercel.app")

export const metadata: Metadata = {
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s | ${profile.shortName}`,
  },
  description: profile.tagline,
  metadataBase: new URL(baseUrl),
  icons: {
    icon: "/logo.webp",
  },
  alternates: {
    canonical: "/",
  },
  keywords: [
    profile.role,
    "Full Stack Engineer",
    "Software Engineer",
    "Backend Engineer",
    "Frontend Engineer",
    "Next.js",
    "React",
    "TypeScript",
    "Golang",
    "Laravel",
    "Bandung",
    "Indonesia",
  ],
  authors: [{ name: profile.name, url: baseUrl }],
  creator: profile.name,
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
    url: "/",
    siteName: profile.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/kypas.webp",
        width: 1200,
        height: 630,
        alt: "TGKypas — IAM Platform 40k+ users",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
    images: ["/kypas.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body>
        <ThemeProvider>
          <PostHogProvider>
            <div className="relative z-10">{children}</div>
          </PostHogProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
