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
      <DialogContent className="!max-w-2xl overflow-hidden p-0">
        <div className="flex max-h-[92vh] flex-col overflow-hidden">
          <div className="shrink-0">
            <BrowserFrame className="rounded-none border-0 border-b-2 shadow-none">
              {project.image ? (
                <div className="relative aspect-[16/9] max-h-[34vh]">
                  <Image
                    src={project.image}
                    alt={`${project.name} preview`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top"
                  />
                </div>
              ) : (
                <div
                  className="grid h-full min-h-[200px] place-items-center text-white/25"
                  style={{ backgroundColor: project.accent }}
                >
                  <span className="font-mono text-5xl font-bold tracking-tighter select-none">
                    {project.name.slice(0, 2).toUpperCase()}
                  </span>
                </div>
              )}
            </BrowserFrame>
          </div>

          <div className="flex flex-1 flex-col overflow-hidden p-5 sm:p-6">
            <DialogHeader className="text-left">
              <DialogTitle className="text-xl font-black tracking-tight sm:text-2xl">
                {project.name}
              </DialogTitle>
              {project.period ? (
                <DialogDescription className="font-mono text-xs text-muted-foreground dark:text-white">
                  {project.period}
                </DialogDescription>
              ) : null}
            </DialogHeader>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base dark:text-white">
              {project.description}
            </p>

            {project.details && project.details.length > 0 ? (
              <div className="mt-4">
                <h4 className="font-mono text-xs tracking-[0.15em] text-foreground uppercase">
                  What I did
                </h4>
                <ul className="mt-2 space-y-1.5">
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

            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <ProjectTag key={t} label={t} accent={project.accent} />
              ))}
            </div>

            {project.href ? (
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex w-fit items-center gap-2 border-2 border-foreground bg-cobalt px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-[4px_4px_0_var(--ink)] transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
              >
                View project <ArrowUpRight className="size-4" />
              </a>
            ) : null}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
