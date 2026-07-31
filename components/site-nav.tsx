"use client"

import * as React from "react"
import { Scrollspy } from "@/components/reui/scrollspy"
import { cn } from "@/lib/utils"
import { navItems, profile } from "@/lib/portfolio"

export function SiteNav() {
  const [scrolled, setScrolled] = React.useState(false)
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
          ? "border-b border-border/60 bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
        <a
          href="#top"
          className="font-mono text-sm font-semibold tracking-tight"
        >
          {profile.name.split(" ").slice(-1)[0]}
          <span className="text-brand">.</span>
        </a>

        <Scrollspy className="hidden items-center gap-1 md:flex" offset={80} targetRef={documentRef} history={false}>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              data-scrollspy-anchor={item.id}
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground data-[active=true]:bg-muted data-[active=true]:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </Scrollspy>

        <a
          href="#contact"
          className="hidden rounded-full bg-brand px-4 py-1.5 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90 md:inline-flex"
        >
          Get in touch
        </a>
      </nav>
    </header>
  )
}