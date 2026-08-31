"use client"

import { useState } from "react"
import Image from "next/image"
import { ExternalLink, ArrowUpRight } from "lucide-react"
import { SectionHeader } from "@/components/section-header"
import { projects } from "@/lib/portfolio"
import { cn } from "@/lib/utils"
import { ProjectModal } from "@/components/project-modal"

export function ProjectTag({
  label,
  accent,
}: {
  label: string
  accent: string
}) {
  return (
    <span className="inline-flex items-center gap-1.5 border-2 border-foreground bg-chartreuse px-2.5 py-1 text-[0.65rem] font-bold tracking-wider text-foreground uppercase">
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
        "relative flex flex-col overflow-hidden border-2 border-foreground bg-card shadow-[4px_4px_0_var(--ink)]",
        className
      )}
    >
      <div className="flex items-center gap-1.5 border-b-2 border-foreground bg-chartreuse px-3 py-2">
        <span className="size-2 border border-foreground bg-coral" />
        <span className="size-2 border border-foreground bg-chartreuse" />
        <span className="size-2 border border-foreground bg-cobalt" />
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
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
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
        className="group relative cursor-pointer overflow-hidden border-2 border-foreground bg-cobalt text-primary-foreground shadow-[6px_6px_0_var(--ink)] transition-transform duration-300 hover:-translate-y-1"
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
            <p className="font-mono text-xs font-bold tracking-[0.2em] text-primary-foreground uppercase">
              Featured Project
            </p>
            {project.outcome ? (
              <p className="mt-2 inline-flex w-fit border border-primary-foreground/20 bg-primary-foreground/10 px-2.5 py-1 font-mono text-[0.65rem] font-bold tracking-widest text-primary-foreground uppercase">
                {project.outcome}
              </p>
            ) : null}
            <h3 className="mt-3 text-2xl font-black tracking-tight text-primary-foreground sm:text-3xl">
              {project.name}
            </h3>
            {project.period ? (
              <p className="mt-1 font-mono text-xs text-primary-foreground/80 dark:text-white">
                {project.period}
              </p>
            ) : null}
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-primary-foreground/90 sm:text-base">
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
                onClick={(e) => e.stopPropagation()}
                className="mt-8 inline-flex w-fit items-center gap-2 border-2 border-foreground bg-chartreuse px-5 py-2.5 text-sm font-bold text-foreground shadow-[3px_3px_0_var(--ink)] transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
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
      className="group relative flex cursor-pointer flex-col overflow-hidden border-2 border-l-[8px] border-foreground bg-card transition-transform duration-300 odd:bg-chartreuse even:bg-coral hover:-translate-y-1 hover:shadow-[4px_4px_0_var(--ink)]"
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
            {project.outcome ? (
              <p className="font-mono text-[0.6rem] font-bold tracking-widest text-cobalt uppercase">
                {project.outcome}
              </p>
            ) : null}
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              {project.name}
            </h3>
            {project.period ? (
              <p className="mt-0.5 font-mono text-xs text-muted-foreground dark:text-white">
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
              className="grid size-8 shrink-0 place-items-center border-2 border-foreground bg-card text-foreground transition-transform hover:translate-x-0.5 hover:translate-y-0.5"
            >
              <ExternalLink className="size-4" />
            </a>
          ) : null}
        </div>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground dark:text-white">
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
    <section id="projects" className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
      <SectionHeader
        eyebrow="02 / Projects"
        title="Selected work — outcomes, not just code."
        description="Platforms I've built or shaped — from IAM for 40,000+ users to SaaS and civic tech."
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
