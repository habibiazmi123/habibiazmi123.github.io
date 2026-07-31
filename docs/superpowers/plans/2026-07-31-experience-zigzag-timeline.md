# Experience Zigzag Timeline — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the left-aligned ReUI `Timeline` in the Experience section with a custom zigzag CSS layout: cards alternate left/right, vertical timeline line in the center on desktop, stacked-left with line on right on mobile.

**Architecture:** Single component rewrite of `components/sections/experience.tsx`. The outer wrapper is a `position: relative` container holding an absolute-positioned vertical line element. Inside, a vertical flex stack of row wrappers, each row is a horizontal flex with the card pushed to one side via `mr-auto`/`ml-auto` based on index parity. Each row also has an absolute-positioned dot at the center (desktop) or right (mobile). Content markup is preserved from the current component; only the layout shell changes.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind v4, lucide-react, existing `SectionHeader` and `Badge` components.

## Global Constraints

- Content from `lib/portfolio.ts` must NOT change
- `components/reui/timeline.tsx` stays in place (other potential uses)
- `components/section-header.tsx` stays unchanged
- Dark-only; no light variant
- No new dependencies
- Visual change only — no behavior, data, or routing changes

---

### Task 1: Rewrite Experience component to zigzag layout

**Files:**
- Modify: `components/sections/experience.tsx` (entire file rewrite)

**Interfaces:**
- Consumes: `experiences` array from `@/lib/portfolio` (unchanged), `SectionHeader` from `@/components/section-header`, `Badge` from `@/components/reui/badge`
- Produces: `<section id="experience">` with zigzag timeline DOM structure

- [ ] **Step 1: Replace imports**

In `components/sections/experience.tsx`, replace the import block (lines 1-14) with:

```tsx
import { MapPin, FolderOpen } from "lucide-react"
import { SectionHeader } from "@/components/section-header"
import { Badge } from "@/components/reui/badge"
import { experiences } from "@/lib/portfolio"
import { cn } from "@/lib/utils"
```

- [ ] **Step 2: Replace the component body**

Replace the entire `Experience` function body (the `return` statement and the `function Experience()` wrapper) with:

```tsx
export function Experience() {
  return (
    <section
      id="experience"
      className="mx-auto max-w-5xl px-5 py-24 sm:py-28"
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
              <div key={exp.id} className="relative">
                {/* Dot marker on the line, vertically centered with the card */}
                <div
                  aria-hidden="true"
                  className={cn(
                    "absolute top-1/2 z-10 size-4 -translate-y-1/2 rounded-full border-4 border-background bg-brand",
                    "left-1/2 -translate-x-1/2 hidden md:block",
                    "right-0 translate-x-1/2 block md:hidden"
                  )}
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
```

- [ ] **Step 3: Verify typecheck passes**

Run: `npm run typecheck`
Expected: exit 0, no errors.

If errors mention missing imports or type issues, fix and re-run.

- [ ] **Step 4: Verify lint passes**

Run: `npm run lint`
Expected: exit 0, no warnings about the experience file.

- [ ] **Step 5: Verify production build passes**

Run: `npm run build`
Expected: exit 0, build succeeds.

- [ ] **Step 6: Commit**

```bash
git add components/sections/experience.tsx
git commit -m "feat(experience): replace timeline with zigzag layout"
```

---

### Task 2: Visual verification at three breakpoints

**Files:**
- Read: `components/sections/experience.tsx` (no changes)

**Interfaces:**
- None (verification only)

- [ ] **Step 1: Start dev server if not running**

Check if dev server is running:
```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
```

If output is `000`, start the server:
```bash
cd /Users/azmi/Documents/Learning/Next/habibiazmi.com && npm run dev &
```

Wait for it to return `200` before proceeding.

- [ ] **Step 2: Verify desktop zigzag layout (≥ 768px)**

Use the Pencil browser to load the page:
- Action: `browser({ action: "load-page", url: "http://localhost:3000/#experience" })`
- Action: `browser({ action: "return-screenshot", target: "query", querySelector: "#experience" })`

Verify visually:
- [ ] Cards alternate left/right (Telkom left, VOX right, CNT fullstack left, CNT freelance right)
- [ ] Vertical line is visible in the center, full height of the section content
- [ ] 4 teal dots are visible on the line, one per card
- [ ] Each dot is at the vertical middle of its card
- [ ] No card content is cut off or overflowing

- [ ] **Step 3: Verify mobile layout (< 768px)**

In Pencil browser, resize viewport to 375px width, then:
- Action: `browser({ action: "return-screenshot", target: "query", querySelector: "#experience" })`

Verify visually:
- [ ] All 4 cards stack vertically, full width, aligned to the left
- [ ] Vertical line is on the right edge of the section, full height
- [ ] 4 teal dots are visible on the line, one per card
- [ ] No card content is cut off or overflowing
- [ ] Tap targets are large enough on touch (badges, links)

- [ ] **Step 4: Verify tablet transition (768px boundary)**

Resize viewport to 768px and re-screenshot. The layout should be at the desktop variant. Cards should already be in zigzag with line in center.

- [ ] **Step 5: Final commit if any visual fixes were needed**

If adjustments were made in Steps 2-4, commit them:
```bash
git add components/sections/experience.tsx
git commit -m "fix(experience): visual adjustments from breakpoint verification"
```

If no fixes were needed, skip this step.

---

### Task 3: Stop dev server

**Files:** None

- [ ] **Step 1: Stop the dev server**

```bash
pkill -f "next dev"
```

Verify:
```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
```

Expected: `000` (server stopped).

## Self-Review

- **Spec coverage:**
  - Zigzag cards alternating left/right → Task 1 Step 2 (isLeft logic, w-1/2 + ml-auto/mr-auto)
  - Center vertical line on desktop → Task 1 Step 2 (left-1/2 line, md:block)
  - Mobile: stack left, line on right → Task 1 Step 2 (right-0 line, md:hidden)
  - Card styling (border, bg, rounded, hover) → Task 1 Step 2 (article class)
  - Dot marker (brand fill, ring border) → Task 1 Step 2 (dot div with border-4 border-background bg-brand)
  - Content unchanged (period, role, company, location, summary, highlights, projects, tags) → Task 1 Step 2 (card body)
  - Accessibility (aria-label, time element, aria-hidden on icons/dots/line) → Task 1 Step 2
  - No animation → Task 1 (no GSAP/data-animate added)
  - Verification → Task 2 (visual at 3 breakpoints) + Task 1 Steps 3-5 (typecheck/lint/build)

- **Placeholder scan:** No TBD/TODO. All code blocks complete.

- **Type consistency:** `exp.period` used as `dateTime` and as display text — matches existing `Experience` type. `cn` utility imported from `@/lib/utils` (project standard).
