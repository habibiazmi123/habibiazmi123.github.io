import { profile } from "@/lib/portfolio"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-5 py-8 text-xs text-muted-foreground sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <p className="font-mono">
          Built with Next.js, shadcn/ui &amp; GSAP.
        </p>
      </div>
    </footer>
  )
}