"use client"

import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { BrowserFrame, ProjectTag } from "@/components/sections/projects"
import type { Project } from "@/lib/portfolio"

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null

  return (
    <Dialog open={!!project} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold tracking-tight sm:text-2xl">
            {project.name}
          </DialogTitle>
          {project.period ? (
            <DialogDescription className="font-mono text-xs text-muted-foreground">
              {project.period}
            </DialogDescription>
          ) : null}
        </DialogHeader>

        <div className="mt-4">
          <BrowserFrame className="overflow-hidden rounded-lg">
            {project.image ? (
              <div className="relative aspect-video">
                <Image
                  src={project.image}
                  alt={`${project.name} preview`}
                  fill
                  sizes="(max-width: 768px) 100vw, 672px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div
                className="grid aspect-video place-items-center text-white/25"
                style={{ backgroundColor: project.accent }}
              >
                <span className="font-mono text-5xl font-bold tracking-tighter select-none">
                  {project.name.slice(0, 2).toUpperCase()}
                </span>
              </div>
            )}
          </BrowserFrame>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {project.description}
        </p>

        {project.details && project.details.length > 0 ? (
          <div className="mt-5">
            <h4 className="font-mono text-xs uppercase tracking-[0.15em] text-foreground">
              What I did
            </h4>
            <ul className="mt-3 space-y-2">
              {project.details.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                >
                  <span
                    className="mt-1.5 size-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: project.accent }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <ProjectTag key={t} label={t} accent={project.accent} />
          ))}
        </div>

        {project.href ? (
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex w-fit items-center gap-2 rounded-md bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90"
          >
            View project <ArrowUpRight className="size-4" />
          </a>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
