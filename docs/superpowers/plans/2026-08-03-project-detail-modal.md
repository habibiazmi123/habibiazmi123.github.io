# Project Detail Modal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a modal that opens when clicking any project card, showing full project details including image, description, role/responsibilities, tags, and action link.

**Architecture:** shadcn Dialog component for the modal, click handlers on existing project cards, new `details` field on the Project type for role/responsibilities bullets.

**Tech Stack:** Next.js, React, shadcn/ui (Radix Dialog), Tailwind CSS, existing GSAP scroll animations unchanged.

## Global Constraints

- shadcn style: `radix-nova`
- Icon library: `lucide`
- Components install path: `npx shadcn@latest add dialog`
- No new dependencies beyond shadcn dialog
- Existing `BrowserFrame` and `ProjectTag` components are reused
- `prefers-reduced-motion` respected (GSAP provider already handles this)

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `lib/portfolio.ts` | Modify | Add `details?: string[]` to `Project` type, populate per project |
| `components/ui/dialog.tsx` | Install | shadcn dialog primitives |
| `components/project-modal.tsx` | Create | Modal content component |
| `components/sections/projects.tsx` | Modify | Add click state + modal rendering |

---

### Task 1: Add `details` field to Project data

**Files:**
- Modify: `lib/portfolio.ts:187-272`

**Interfaces:**
- Consumes: existing `Project` type
- Produces: updated `Project` type with optional `details` field

- [ ] **Step 1: Add `details` to the Project type**

Open `lib/portfolio.ts`, find the `Project` type (line 187):

```ts
export type Project = {
  name: string
  description: string
  tags: string[]
  href?: string
  period?: string
  accent: string
  image?: string
  details?: string[]
}
```

- [ ] **Step 2: Populate `details` for each project**

Add `details` array to each project in the `projects` array. Example for TGKypas:

```ts
{
  name: "TGKypas",
  description:
    "Identity and Access Management platform automating access governance, approval workflows, compliance reviews, and audit trails across the Telkom Group.",
  tags: ["IAM", "Security", "Governance"],
  period: "2022 — Present",
  accent: "#0e7490",
  image: "/kypas.png",
  details: [
    "Co-built IAM platform automating access governance and approval workflows",
    "Designed audit trail system for compliance reviews across the Telkom Group",
    "Integrated with existing enterprise identity providers",
  ],
},
```

Add similar `details` arrays to all 7 projects. Use highlights from the matching experience entries in `experiences` array as reference for what you specifically did.

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add lib/portfolio.ts
git commit -m "feat: add details field to project data"
```

---

### Task 2: Install shadcn Dialog component

**Files:**
- Create: `components/ui/dialog.tsx`

**Interfaces:**
- Consumes: shadcn registry
- Produces: `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogClose` exports

- [ ] **Step 1: Install dialog via shadcn CLI**

Run: `npx shadcn@latest add dialog`
Expected: Creates `components/ui/dialog.tsx`

- [ ] **Step 2: Verify import works**

Check that `components/ui/dialog.tsx` exists and exports the expected components.

- [ ] **Step 3: Commit**

```bash
git add components/ui/dialog.tsx
git commit -m "feat: add shadcn dialog component"
```

---

### Task 3: Create ProjectModal component

**Files:**
- Create: `components/project-modal.tsx`

**Interfaces:**
- Consumes: `Project` type from `lib/portfolio`, `BrowserFrame` from `components/sections/projects.tsx`, `ProjectTag` from `components/sections/projects.tsx`
- Produces: `<ProjectModal project={project} onClose={fn} />`

- [ ] **Step 1: Extract BrowserFrame and ProjectTag to be importable**

Currently `BrowserFrame` and `ProjectTag` are defined inside `components/sections/projects.tsx` but not exported. They need to be exported so `project-modal.tsx` can use them.

Open `components/sections/projects.tsx`:

Change line 7:
```tsx
function ProjectTag({ label, accent }: { label: string; accent: string }) {
```
To:
```tsx
export function ProjectTag({ label, accent }: { label: string; accent: string }) {
```

Change line 19:
```tsx
function BrowserFrame({
```
To:
```tsx
export function BrowserFrame({
```

- [ ] **Step 2: Create the ProjectModal component**

Create `components/project-modal.tsx`:

```tsx
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
import { cn } from "@/lib/utils"

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
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add components/project-modal.tsx components/sections/projects.tsx
git commit -m "feat: add ProjectModal component"
```

---

### Task 4: Wire up click handlers and modal state

**Files:**
- Modify: `components/sections/projects.tsx`

**Interfaces:**
- Consumes: `ProjectModal` from `components/project-modal.tsx`
- Produces: clickable cards that open modal

- [ ] **Step 1: Add state and modal to Projects component**

Open `components/sections/projects.tsx`. The file needs `"use client"` at the top (it's currently a server component with no client hooks).

Add at the top of the file (before imports):

```tsx
"use client"
```

Update the imports to include `useState`:

```tsx
import { useState } from "react"
import Image from "next/image"
import { ExternalLink, ArrowUpRight } from "lucide-react"
import { SectionHeader } from "@/components/section-header"
import { projects } from "@/lib/portfolio"
import { cn } from "@/lib/utils"
import { ProjectModal } from "@/components/project-modal"
```

- [ ] **Step 2: Add modal state to Projects function**

Update the `Projects` component:

```tsx
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
```

- [ ] **Step 3: Add onClick prop to ProjectCard**

Update the `ProjectCard` function signature to accept `onClick`:

```tsx
function ProjectCard({
  project,
  featured = false,
  onClick,
}: {
  project: (typeof projects)[number]
  featured?: boolean
  onClick?: () => void
}) {
```

In the **featured** branch (line 91), add click handler to the `<article>`:

```tsx
<article
  className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border/60 bg-card/40 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)]"
  data-animate
  onClick={onClick}
>
```

In the **regular** branch (line 138), add click handler to the `<article>`:

```tsx
<article
  className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-border/60 border-l-[3px] bg-card/40 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)]"
  style={{ borderLeftColor: project.accent }}
  data-animate
  onClick={onClick}
>
```

- [ ] **Step 4: Make external link icon stop propagation**

In the regular card's external link anchor (around line 161), add `onClick` stop:

```tsx
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
```

- [ ] **Step 5: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 6: Build to verify no runtime errors**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 7: Commit**

```bash
git add components/sections/projects.tsx
git commit -m "feat: wire project cards to open detail modal"
```

---

### Task 5: Final verification

- [ ] **Step 1: Run lint**

Run: `npm run lint`
Expected: No errors

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Manual test**

Run: `npm run dev`
Open browser to `localhost:3000`
- Scroll to Projects section
- Click any project card → modal opens with full details
- Press ESC or click outside → modal closes
- Click external link icon on regular card → opens href in new tab (no modal)
- Verify image renders in modal
- Verify "What I did" section shows if details exist
- Verify tags display correctly
- Verify "View project" button works if href exists
