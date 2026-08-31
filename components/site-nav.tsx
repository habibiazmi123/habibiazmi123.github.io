"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import Image from "next/image"
import { useTheme } from "next-themes"
import { Scrollspy } from "@/components/reui/scrollspy"
import { cn } from "@/lib/utils"
import { navItems, profile } from "@/lib/portfolio"

export function SiteNav() {
  const [scrolled, setScrolled] = React.useState(false)
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
  const { resolvedTheme, setTheme } = useTheme()
  const documentRef = React.useRef<Document | null>(null)

  React.useEffect(() => {
    documentRef.current = document
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b-2 border-foreground bg-background shadow-[0_4px_0_var(--ink)]"
          : "border-b-2 border-foreground bg-background"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
        <a href="#top" className="font-mono text-sm font-bold tracking-tight">
          <Image src="/logo.webp" alt={profile.name} width={36} height={36} />
        </a>

        <Scrollspy
          className="hidden items-center gap-1 md:flex"
          offset={80}
          targetRef={documentRef}
          history={false}
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              data-scrollspy-anchor={item.id}
              className="rounded-sm px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-chartreuse hover:text-foreground data-[active=true]:bg-cobalt data-[active=true]:text-primary-foreground"
            >
              {item.label}
            </a>
          ))}
        </Scrollspy>

        <div className="flex items-center gap-3">
          {mounted ? (
            <button
              type="button"
              aria-label={
                resolvedTheme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
              className="grid size-9 place-items-center border-2 border-foreground bg-chartreuse text-foreground shadow-[4px_4px_0_var(--ink)] transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none focus-visible:ring-3 focus-visible:ring-cobalt/50"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="size-4" aria-hidden="true" />
              ) : (
                <Moon className="size-4" aria-hidden="true" />
              )}
              <span className="sr-only">
                {resolvedTheme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"}
              </span>
            </button>
          ) : (
            <span
              aria-hidden="true"
              className="size-9 border-2 border-transparent"
            />
          )}

          <a
            href="#contact"
            className="hidden border-2 border-foreground bg-cobalt px-4 py-1.5 text-sm font-bold text-primary-foreground shadow-[4px_4px_0_var(--ink)] transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none md:inline-flex"
          >
            Get in touch
          </a>
        </div>
      </nav>
    </header>
  )
}
