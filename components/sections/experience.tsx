import { MapPin, FolderOpen } from "lucide-react"
import { SectionHeader } from "@/components/section-header"
import { Badge } from "@/components/reui/badge"
import { experiences } from "@/lib/portfolio"
import { cn } from "@/lib/utils"

export function Experience() {
  return (
    <section
      id="experience"
      className="mx-auto max-w-5xl px-5 py-16 sm:py-20"
      aria-label="Experience timeline"
    >
      <SectionHeader
        eyebrow="02 / Experience"
        title="Seven years across telecom, SaaS, and HR tech."
        description="From freelance Laravel systems to enterprise IAM serving 40,000+ users — a timeline of the places I've built."
      />

      <div className="relative mt-14">
        {/* Center vertical line — desktop only */}
        <div
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-1/2 hidden w-0.5 -translate-x-1/2 bg-border/60 md:block"
        />
        {/* Right vertical line — mobile only */}
        <div
          aria-hidden="true"
          className="absolute top-0 bottom-0 right-0 block w-0.5 bg-border/60 md:hidden"
        />

        <div className="flex flex-col gap-y-10 md:gap-y-14">
          {experiences.map((exp, i) => {
            const isLeft = i % 2 === 0
            return (
              <div key={exp.id} className="relative" data-animate>
                {/* Dot marker — desktop (center line) */}
                <div
                  aria-hidden="true"
                  className="absolute top-1/2 left-1/2 z-10 hidden size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-background bg-brand md:block"
                />
                {/* Dot marker — mobile (right line) */}
                <div
                  aria-hidden="true"
                  className="absolute top-1/2 right-0 z-10 block size-4 -translate-y-1/2 translate-x-1/2 rounded-full border-4 border-background bg-brand md:hidden"
                />

                <div
                  className={cn(
                    "w-full",
                    isLeft
                      ? "md:ml-0 md:mr-auto md:w-1/2 md:pr-12"
                      : "md:ml-auto md:mr-0 md:w-1/2 md:pl-12"
                  )}
                >
                  <article className="rounded-xl border border-border/60 bg-card/50 p-6 transition-colors duration-200 hover:border-brand/40 hover:bg-card/70">
                    <time
                      dateTime={exp.period}
                      className="font-mono text-xs text-brand"
                    >
                      {exp.period}
                    </time>
                    <h3 className="mt-1 text-lg font-semibold text-foreground">
                      {exp.role}
                      <span className="ml-2 text-muted-foreground">
                        · {exp.company}
                      </span>
                    </h3>
                    <span className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="size-3" aria-hidden="true" />
                      {exp.location}
                    </span>
                    <p className="mt-4 text-sm text-muted-foreground">
                      {exp.summary}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {exp.highlights.map((h) => (
                        <li
                          key={h}
                          className="relative pl-4 text-sm leading-relaxed text-muted-foreground before:absolute before:left-0 before:top-2 before:size-1.5 before:rounded-full before:bg-brand/60"
                        >
                          {h}
                        </li>
                      ))}
                    </ul>
                    {exp.projects?.length ? (
                      <div className="mt-5">
                        <p className="flex items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-brand">
                          <FolderOpen className="size-3" aria-hidden="true" />
                          Projects
                        </p>
                        <ul className="mt-2.5 space-y-1.5">
                          {exp.projects.map((p) => (
                            <li
                              key={p.name}
                              className="flex flex-wrap items-baseline gap-x-2 rounded-lg border border-border/50 bg-card/30 px-3 py-2 text-sm"
                            >
                              {p.href ? (
                                <a
                                  href={p.href}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="font-medium text-foreground hover:text-brand"
                                >
                                  {p.name}
                                </a>
                              ) : (
                                <span className="font-medium text-foreground">
                                  {p.name}
                                </span>
                              )}
                              {p.period ? (
                                <span className="font-mono text-[0.65rem] text-muted-foreground">
                                  {p.period}
                                </span>
                              ) : null}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {exp.tags.map((t) => (
                        <Badge key={t} variant="outline" size="xs">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </article>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
