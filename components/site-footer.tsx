import { profile } from "@/lib/portfolio"

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-foreground">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-5 py-8 text-xs text-muted-foreground sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <p className="font-mono font-bold tracking-wider uppercase">
          Built with ❤️ CumiDev
        </p>
      </div>
    </footer>
  )
}
