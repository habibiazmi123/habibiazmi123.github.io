"use client"

import { useState } from "react"
import { MapPin, FolderOpen, ChevronDown } from "lucide-react"
import { SectionHeader } from "@/components/section-header"
import { Badge } from "@/components/reui/badge"
import { experiences } from "@/lib/portfolio"
import { cn } from "@/lib/utils"

function Highlights({ items }: { items: string[] }) {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? items : items.slice(0, 3)

  if (items.length <= 3) {
    return (
      <ul className="mt-4 space-y-2">
        {items.map((h) => (
          <li
            key={h}
            className="relative pl-4 text-sm leading-relaxed text-muted-foreground before:absolute before:top-2 before:left-0 before:size-2 before:bg-cobalt"
          >
            {h}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div>
      <ul className="mt-4 space-y-2">
        {visible.map((h) => (
          <li
            key={h}
            className="relative pl-4 text-sm leading-relaxed text-muted-foreground before:absolute before:top-2 before:left-0 before:size-2 before:bg-cobalt"
          >
            {h}
          </li>
        ))}
      </ul>
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-2 flex items-center gap-1 text-xs font-bold text-cobalt transition-colors hover:bg-chartreuse"
      >
        {expanded ? "Show less" : `Show more (${items.length - 3})`}
        <ChevronDown
          className={cn(
            "size-3 transition-transform",
            expanded && "rotate-180"
          )}
        />
      </button>
    </div>
  )
}

export function Experience() {
  return (
    <section
      id="experience"
      className="mx-auto max-w-5xl px-5 py-16 sm:py-24"
      aria-label="Experience timeline"
    >
      <SectionHeader
        eyebrow="03 / Experience"
        title="Seven years across telecom, SaaS, and HR tech."
        description="From freelance Laravel systems to enterprise IAM serving 40,000+ users — a timeline of the places I've built."
      />

      <div className="relative mt-10 pl-8 sm:pl-10">
        <div
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-0 w-0.5 bg-foreground"
        />

        <div className="flex flex-col gap-y-8">
          {experiences.map((exp) => {
            return (
              <div key={exp.id} className="relative" data-animate>
                <div
                  aria-hidden="true"
                  className="absolute top-8 left-0 size-3 -translate-x-[calc(100%+14px)] border-2 border-foreground bg-chartreuse sm:size-3.5 sm:-translate-x-[calc(100%+18px)]"
                />

                <div className="w-full max-w-3xl">
                  <article className="border-2 border-foreground bg-card p-6 shadow-[4px_4px_0_var(--ink)] transition-transform duration-200 hover:-translate-y-1">
                    <time
                      dateTime={exp.period}
                      className="font-mono text-xs font-bold text-cobalt"
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
                    <Highlights items={exp.highlights} />
                    {exp.projects?.length ? (
                      <div className="mt-5">
                        <p className="flex items-center gap-1.5 text-[0.65rem] font-bold tracking-[0.2em] text-cobalt uppercase">
                          <FolderOpen className="size-3" aria-hidden="true" />
                          Projects
                        </p>
                        <ul className="mt-2.5 space-y-1.5">
                          {exp.projects.map((p) => (
                            <li
                              key={p.name}
                              className="flex flex-wrap items-baseline gap-x-2 border-2 border-foreground bg-muted px-3 py-2 text-sm"
                            >
                              {p.href ? (
                                <a
                                  href={p.href}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="font-bold text-foreground hover:bg-chartreuse"
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
