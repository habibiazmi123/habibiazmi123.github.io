"use client"

import { useState } from "react"
import Image from "next/image"
import { ExternalLink, ArrowUpRight } from "lucide-react"
import { SectionHeader } from "@/components/section-header"
import { projects } from "@/lib/portfolio"
import { cn } from "@/lib/utils"
import { ProjectModal } from "@/components/project-modal"

export function ProjectTag({ label, accent }: { label: string; accent: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/40 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
      <span
        className="size-1.5 rounded-full"
        style={{ backgroundColor: accent }}
      />
      {label}
    </span>
  )
}

export function BrowserFrame({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm",
        className
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-border/40 bg-muted/50 px-3 py-2">
        <span className="size-2 rounded-full bg-red-400/80" />
        <span className="size-2 rounded-full bg-amber-400/80" />
        <span className="size-2 rounded-full bg-emerald-400/80" />
      </div>
      <div className="relative flex-1 overflow-hidden bg-background">
        {children}
      </div>
    </div>
  )
}

function ProjectImage({
  project,
  className,
  objectPosition = "center",
}: {
  project: (typeof projects)[number]
  className?: string
  objectPosition?: "center" | "top"
}) {
  return (
    <BrowserFrame className={className}>
      {project.image ? (
        <Image
          src={project.image}
          alt={`${project.name} preview`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={cn(
            "object-cover transition-transform duration-700 group-hover:scale-105",
            objectPosition === "top" ? "object-top" : "object-center"
          )}
        />
      ) : (
        <div
          className="grid h-full place-items-center text-white/25"
          style={{ backgroundColor: project.accent }}
        >
          <span className="font-mono text-4xl font-bold tracking-tighter select-none">
            {project.name.slice(0, 2).toUpperCase()}
          </span>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />
    </BrowserFrame>
  )
}

function ProjectCard({
  project,
  featured = false,
  onClick,
}: {
  project: (typeof projects)[number]
  featured?: boolean
  onClick?: () => void
}) {
  if (featured) {
    return (
      <article
        className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border/60 bg-card/40 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)]"
        data-animate
        onClick={onClick}
      >
        <div className="lg:grid lg:grid-cols-2">
          <ProjectImage
            project={project}
            className="aspect-video lg:aspect-auto lg:min-h-[22rem]"
            objectPosition="center"
          />
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">
              Featured Project
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {project.name}
            </h3>
            {project.period ? (
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                {project.period}
              </p>
            ) : null}
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
              {project.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <ProjectTag key={t} label={t} accent={project.accent} />
              ))}
            </div>
            {project.href ? (
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-md bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90"
              >
                View project <ArrowUpRight className="size-4" />
              </a>
            ) : null}
          </div>
        </div>
      </article>
    )
  }

  return (
    <article
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-border/60 border-l-[3px] bg-card/40 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)]"
      style={{ borderLeftColor: project.accent }}
      data-animate
      onClick={onClick}
    >
      <ProjectImage
        project={project}
        className="aspect-[16/10]"
        objectPosition="center"
      />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              {project.name}
            </h3>
            {project.period ? (
              <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                {project.period}
              </p>
            ) : null}
          </div>
          {project.href ? (
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${project.name}`}
              onClick={(e) => e.stopPropagation()}
              className="grid size-8 shrink-0 place-items-center rounded-xl border border-border/60 bg-card/60 text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
            >
              <ExternalLink className="size-4" />
            </a>
          ) : null}
        </div>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <ProjectTag key={t} label={t} accent={project.accent} />
          ))}
        </div>
      </div>
    </article>
  )
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[number] | null
  >(null)
  const [featured, ...rest] = projects

  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
      <SectionHeader
        eyebrow="03 / Projects"
        title="Selected work across enterprise, SaaS, and civic tech."
        description="A few platforms I've built or shaped — from identity systems serving 40,000+ users to crowdfunding and civic apps."
      />

      <div className="mt-10">
        <ProjectCard
          project={featured}
          featured
          onClick={() => setSelectedProject(featured)}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((project) => (
          <ProjectCard
            key={project.name}
            project={project}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  )
}
