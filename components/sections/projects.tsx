import Image from "next/image"
import { Bookmark, ExternalLink, FolderOpen, ArrowUpRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { projects } from "@/lib/portfolio"

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
      <div data-animate>
        <p className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/50 px-3.5 py-1.5 text-xs font-medium text-blue-400">
          <FolderOpen className="size-3.5" />
          SELECTED WORKS
        </p>
        <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          <span className="text-foreground">Featured</span>{" "}
          <span className="bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Projects.
          </span>
        </h2>
      </div>

      <div
        className="mt-8 flex items-end justify-between gap-6"
        data-animate
      >
        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          A selection of platforms across IAM, SaaS, HR tech, healthcare, and
          civic tech.
        </p>
        <a
          href="#projects"
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          View All Projects <ArrowUpRight className="size-4" />
        </a>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Card
            key={p.name}
            data-animate
            className={cn(
              "group relative flex flex-col overflow-hidden rounded-2xl border-border/60 bg-card/40 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]",
              p.href && "cursor-pointer"
            )}
          >
            {p.href ? (
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${p.name} (opens new tab)`}
                className="absolute inset-0 z-10"
              />
            ) : null}
            {/* index chip */}
            <span className="absolute left-4 top-4 z-20 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 font-mono text-[0.6rem] text-white/70 backdrop-blur">
              {String(i + 1).padStart(2, "0")}
            </span>
            {/* thumbnail — project screenshot or accent placeholder */}
            <div
              className="relative grid aspect-[16/10] place-items-center overflow-hidden"
              style={p.image ? undefined : { backgroundColor: p.accent }}
            >
              {p.image ? (
                <Image
                  src={p.image}
                  alt={`${p.name} preview`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <span className="font-mono text-4xl font-semibold tracking-tighter text-white/15 select-none">
                  {p.name.slice(0, 2).toUpperCase()}
                </span>
              )}
              {/* bottom gradient wash for legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            </div>
            <CardContent className="flex flex-1 flex-col px-6 py-6">
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                {p.name}
              </h3>
              {p.period ? (
                <p className="mt-1 font-mono text-xs text-muted-foreground">
                  {p.period}
                </p>
              ) : null}
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {p.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center rounded-full border border-border/60 bg-muted/40 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-end gap-2 border-t border-border/40 pt-4">
                <span className="grid size-8 place-items-center rounded-xl border border-border/60 bg-card/60 text-muted-foreground transition-colors group-hover:bg-card group-hover:text-foreground">
                  <Bookmark className="size-4" />
                </span>
                {p.href ? (
                  <span className="grid size-8 place-items-center rounded-xl border border-border/60 bg-card/60 text-muted-foreground transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
                    <ExternalLink className="size-4" />
                  </span>
                ) : null}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}