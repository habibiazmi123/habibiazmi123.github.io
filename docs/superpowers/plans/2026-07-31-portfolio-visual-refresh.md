# Portfolio Bento-Grid Visual Refresh — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current stacked-section portfolio layout with a modern bento-grid + glassmorphism design across all seven sections, keeping content from `lib/portfolio.ts` unchanged.

**Architecture:** New `GlowOrb` component for background depth accents. CSS-only glass effects and dot-grid background via `globals.css`. Each section component rewritten to use asymmetric CSS grid layouts (bento tiles of varying sizes). ReUI Timeline stays for experience but gets glass-styled cards. All sections retain existing `[data-animate]` GSAP scroll reveals.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind v4, shadcn/ui v4 (radix-nova), ReUI blocks, GSAP + ScrollTrigger, lucide-react, Geist + Geist Mono fonts.

## Global Constraints

- Content data in `lib/portfolio.ts` must NOT be modified
- shadcn primitives (`components/ui/*`) stay unchanged
- ReUI blocks (`components/reui/*`) stay unchanged
- GSAP `[data-animate]` system stays unchanged
- ThemeProvider (`components/theme-provider.tsx`) and GsapProvider (`components/gsap-provider.tsx`) stay unchanged
- `app/page.tsx` imports stay unchanged
- Dark-only; light theme not in scope
- Respect `prefers-reduced-motion` (existing behavior)

---

### Task 1: CSS foundation — dot-grid background, glass utilities, secondary accent tokens

**Files:**
- Modify: `app/globals.css`

**Interfaces:**
- Produces: CSS utility classes `.dot-grid`, `.glass`, `.glass-hover`, CSS variables `--violet`, `--cyan`, `--violet-glow`, `--cyan-glow`, keyframe `drift`

- [ ] **Step 1: Add secondary accent CSS variables to `.dark` block**

In `app/globals.css`, inside the `.dark {}` block, append after the `--invert-foreground` line:

```css
    --violet: oklch(0.65 0.2 280);
    --cyan: oklch(0.7 0.15 200);
    --glass-bg: oklch(1 0 0 / 4%);
    --glass-border: oklch(1 0 0 / 8%);
    --glass-bg-hover: oklch(1 0 0 / 7%);
```

Also add corresponding `@theme inline` entries after the existing `--color-invert-foreground` line:

```css
    --color-violet: var(--violet);
    --color-cyan: var(--cyan);
```

- [ ] **Step 2: Add dot-grid background pattern**

Replace the `@layer base` block's body rule to include the dot grid:

```css
@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
    background-image: radial-gradient(circle, oklch(1 0 0 / 6%) 1px, transparent 1px);
    background-size: 24px 24px;
  }
  html {
    @apply font-sans;
  }
}
```

- [ ] **Step 3: Add glass utility classes and drift keyframe**

Append after the existing `.marquee-row:hover` rule at the end of the file:

```css
.glass {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
.glass-hover:hover {
  background: var(--glass-bg-hover);
  border-color: oklch(1 0 0 / 15%);
}
@keyframes drift {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(1%, -1%) scale(1.05); }
  50% { transform: translate(-0.5%, -2%) scale(0.97); }
  75% { transform: translate(-1%, 0.5%) scale(1.03); }
}
.animate-drift { animation: drift 12s ease-in-out infinite; }
```

- [ ] **Step 4: Verify**

```bash
npx tailwindcss --help > /dev/null 2>&1  # ensures tailwind v4 parses without error
```

- [ ] **Step 5: Commit**

```bash
git add app/globals.css
git commit -m "feat: add dot-grid bg, glass utilities, violet/cyan accent tokens"
```

---

### Task 2: GlowOrb component

**Files:**
- Create: `components/glow-orb.tsx`

**Interfaces:**
- Produces: `<GlowOrb color="emerald" | "violet" | "cyan" size="sm" | "md" | "lg" className? />`

- [ ] **Step 1: Create `components/glow-orb.tsx`**

```tsx
import { cn } from "@/lib/utils"

const colorMap = {
  emerald: "bg-emerald-500/12",
  violet: "bg-violet-500/12",
  cyan: "bg-cyan-500/12",
} as const

const sizeMap = {
  sm: "h-40 w-40 blur-[80px]",
  md: "h-72 w-72 blur-[100px]",
  lg: "h-96 w-96 blur-[130px]",
} as const

export function GlowOrb({
  color = "emerald",
  size = "md",
  className,
}: {
  color?: keyof typeof colorMap
  size?: keyof typeof sizeMap
  className?: string
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none animate-drift rounded-full",
        colorMap[color],
        sizeMap[size],
        className
      )}
    />
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/glow-orb.tsx
git commit -m "feat: add GlowOrb component for ambient background depth"
```

---

### Task 3: Hero — 3-column bento grid

**Files:**
- Modify: `components/sections/hero.tsx`

**Interfaces:**
- Consumes: `GlowOrb` from Task 2, `profile` from `lib/portfolio.ts`
- Produces: same `<Hero />` export

- [ ] **Step 1: Rewrite `hero.tsx`**

```tsx
import Image from "next/image"
import { ArrowRight, Download } from "lucide-react"
import { profile } from "@/lib/portfolio"
import { GlowOrb } from "@/components/glow-orb"

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-5 pt-16">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <GlowOrb color="emerald" size="lg" className="absolute right-[10%] top-[10%]" />
        <GlowOrb color="violet" size="md" className="absolute left-[5%] top-[40%]" />
        <GlowOrb color="cyan" size="sm" className="absolute right-[30%] bottom-[20%]" />
      </div>

      <div className="mx-auto grid max-w-6xl auto-rows-min grid-cols-1 gap-4 py-28 md:grid-cols-3 md:gap-5 lg:py-32">
        {/* Name + tagline tile (2-col span) */}
        <div
          data-animate
          className="glass rounded-2xl p-8 md:col-span-2 md:p-10"
        >
          {profile.available ? (
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs text-emerald-400">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              Available for new projects
            </p>
          ) : null}
          <h1 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="text-foreground">Hi, I&apos;m</span>{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
              {profile.shortName}.
            </span>
          </h1>
          <p className="mt-6 max-w-[46ch] text-base leading-[1.8] text-muted-foreground sm:text-lg">
            A{" "}
            <span className="font-medium text-foreground">{profile.role}</span>{" "}
            based in Indonesia. I craft scalable backends, modern web
            applications, and AI-enabled platforms used by 40,000+ people.
          </p>
        </div>

        {/* Portrait tile */}
        <div data-animate className="glass relative overflow-hidden rounded-2xl p-4">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl">
            <Image
              src="/me.png"
              alt={profile.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-top"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        </div>

        {/* Stats tile */}
        <div data-animate className="glass flex items-center gap-6 rounded-2xl p-6">
          <div className="text-center">
            <p className="font-mono text-2xl font-bold text-emerald-400">7+</p>
            <p className="mt-1 text-xs text-muted-foreground">Years</p>
          </div>
          <div className="h-8 w-px bg-border/40" />
          <div className="text-center">
            <p className="font-mono text-2xl font-bold text-violet-400">40k+</p>
            <p className="mt-1 text-xs text-muted-foreground">Users</p>
          </div>
        </div>

        {/* Bio tile */}
        <div data-animate className="glass rounded-2xl p-6">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Full Stack Engineer crafting scalable backends, modern web apps,
            and AI platforms. Currently at Telkom Indonesia.
          </p>
        </div>

        {/* CTAs tile */}
        <div data-animate className="glass flex flex-col gap-3 rounded-2xl p-6">
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-[0_0_28px_-6px_var(--brand)]"
          >
            Contact Me <ArrowRight className="size-4" />
          </a>
          <a
            href="/cv.pdf"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border/40 px-6 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:border-border"
          >
            Download CV <Download className="size-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | tail -5
```

Expected: successful build, no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/hero.tsx
git commit -m "feat: redesign hero as 3-col bento grid with glass tiles"
```

---

### Task 4: Technologies — bento tech category cards

**Files:**
- Modify: `components/sections/technologies.tsx`

**Interfaces:**
- Consumes: `techStack`, `techColors` from `lib/portfolio.ts`
- Produces: same `<Technologies />` export

- [ ] **Step 1: Rewrite `technologies.tsx`**

```tsx
import { techStack, techColors } from "@/lib/portfolio"
import { Cpu, Globe, Server, Database, Cloud, Sparkles } from "lucide-react"

const categoryIcons: Record<string, React.ReactNode> = {
  Languages: <Cpu className="size-5" />,
  Frontend: <Globe className="size-5" />,
  Backend: <Server className="size-5" />,
  Database: <Database className="size-5" />,
  "DevOps & Cloud": <Cloud className="size-5" />,
  "AI & Tools": <Sparkles className="size-5" />,
}

export function Technologies() {
  return (
    <section id="technologies" className="mx-auto max-w-6xl px-5 py-24 sm:py-28">
      <div data-animate className="mb-14">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Technological Foundation
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          The modern tools I use to bring products to life.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {techStack.map((cat, i) => (
          <div
            key={cat.title}
            data-animate
            className="glass rounded-2xl p-6 transition-all hover:border-emerald-500/30"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl border border-border/60 bg-card/60 text-emerald-400">
                {categoryIcons[cat.title]}
              </span>
              <h3 className="font-semibold text-foreground">{cat.title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {cat.items.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-card/60 px-3 py-1.5 text-xs text-foreground/80"
                >
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: techColors[item] ?? "#71717A" }}
                  />
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/technologies.tsx
git commit -m "feat: redesign technologies as bento grid of category cards"
```

---

### Task 5: About — asymmetric bento

**Files:**
- Modify: `components/sections/about.tsx`

**Interfaces:**
- Consumes: `profile` from `lib/portfolio.ts`, `SectionHeader` from `components/section-header.tsx`
- Produces: same `<About />` export

- [ ] **Step 1: Rewrite `about.tsx`**

```tsx
import { MapPin } from "lucide-react"
import { SectionHeader } from "@/components/section-header"
import { profile } from "@/lib/portfolio"
import { GlowOrb } from "@/components/glow-orb"

const statColors = ["text-emerald-400", "text-violet-400", "text-cyan-400", "text-emerald-400"]

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-5 py-24 sm:py-28">
      <GlowOrb color="violet" size="md" className="absolute right-[10%] top-[20%]" />
      <GlowOrb color="emerald" size="sm" className="absolute left-[5%] bottom-[10%]" />

      <SectionHeader
        eyebrow="01 / About"
        title="Engineering software that holds up at scale."
        description={profile.bio}
      />

      <div className="mt-14 grid gap-5 md:grid-cols-5">
        {/* Bio card (3-col) */}
        <div
          data-animate
          className="glass relative overflow-hidden rounded-2xl p-8 md:col-span-3"
        >
          <div className="absolute left-0 top-6 h-12 w-1 rounded-r-full bg-emerald-400" />
          <div className="space-y-4 pl-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            <p>
              I&apos;m a Full Stack Software Engineer based in {profile.location},
              currently building identity, access management, and AI-powered document
              platforms at Telkom Indonesia. My work spans scalable backend
              services, modern web apps, and LLM-powered automation across
              telecommunications, healthcare, and HR technology.
            </p>
            <p>
              I care about software quality, security, system integration, and the
              kind of design decisions that show up as business impact — not just
              clean diffs.
            </p>
          </div>
          <div className="mt-6 flex items-center gap-2 pl-4 text-sm text-muted-foreground">
            <MapPin className="size-4 text-emerald-400" />
            {profile.location}
          </div>
        </div>

        {/* Stats grid (2-col) */}
        <div className="grid grid-cols-2 gap-4 md:col-span-2">
          {profile.stats.map((s, i) => (
            <div
              key={s.label}
              data-animate
              className="glass flex flex-col items-center justify-center rounded-2xl p-6 text-center"
            >
              <p className={`font-mono text-3xl font-bold ${statColors[i]}`}>
                {s.value}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/about.tsx
git commit -m "feat: redesign about as asymmetric bento with glass cards"
```

---

### Task 6: Experience — glass cards with ReUI timeline

**Files:**
- Modify: `components/sections/experience.tsx`

**Interfaces:**
- Consumes: `experiences` from `lib/portfolio.ts`, `SectionHeader`, ReUI `Timeline` + subcomponents, `Badge` from ReUI
- Produces: same `<Experience />` export

- [ ] **Step 1: Rewrite `experience.tsx`**

```tsx
import { MapPin, FolderOpen } from "lucide-react"
import { SectionHeader } from "@/components/section-header"
import { Badge } from "@/components/reui/badge"
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/reui/timeline"
import { experiences } from "@/lib/portfolio"
import { GlowOrb } from "@/components/glow-orb"

const companyColors: Record<string, string> = {
  "Telkom Indonesia": "bg-emerald-400",
  "VOX Asia / PT Indo Online Mitra Usaha": "bg-violet-400",
  "PT Citra Niaga Teknologi": "bg-cyan-400",
}

export function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-5xl px-5 py-24 sm:py-28">
      <GlowOrb color="cyan" size="md" className="absolute left-[20%] top-[50%]" />

      <SectionHeader
        eyebrow="02 / Experience"
        title="Seven years across telecom, SaaS, and HR tech."
        description="From freelance Laravel systems to enterprise IAM serving 40,000+ users — a timeline of the places I've built."
      />

      <Timeline className="mt-14" orientation="vertical">
        {experiences.map((exp, i) => (
          <TimelineItem key={exp.id} step={i + 1}>
            <TimelineHeader>
              <TimelineDate className="font-mono text-xs text-emerald-400">
                {exp.period}
              </TimelineDate>
              <TimelineTitle className="text-lg font-semibold">
                {exp.role}
                <span className="ml-2 inline-flex items-center gap-1.5 text-muted-foreground">
                  <span
                    className={`inline-block size-2 rounded-full ${companyColors[exp.company] ?? "bg-muted-foreground"}`}
                  />
                  {exp.company}
                </span>
              </TimelineTitle>
              <span className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="size-3" />
                {exp.location}
              </span>
            </TimelineHeader>
            <TimelineIndicator className="border-emerald-400/40 bg-emerald-400/10 text-emerald-400" />
            <TimelineSeparator />
            <TimelineContent className="glass rounded-2xl p-6">
              <p className="text-sm text-muted-foreground">{exp.summary}</p>
              <ul className="mt-4 space-y-2">
                {exp.highlights.map((h) => (
                  <li
                    key={h}
                    className="relative pl-4 text-sm leading-relaxed text-muted-foreground before:absolute before:left-0 before:top-2 before:size-1.5 before:rounded-full before:bg-emerald-400/60"
                  >
                    {h}
                  </li>
                ))}
              </ul>
              {exp.projects?.length ? (
                <div className="mt-5">
                  <p className="flex items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-emerald-400">
                    <FolderOpen className="size-3" />
                    Projects
                  </p>
                  <ul className="mt-2.5 space-y-1.5">
                    {exp.projects.map((p) => (
                      <li
                        key={p.name}
                        className="flex flex-wrap items-baseline gap-x-2 rounded-lg border border-border/50 bg-card/40 px-3 py-2 text-sm"
                      >
                        {p.href ? (
                          <a
                            href={p.href}
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium text-foreground hover:text-emerald-400"
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
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </section>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/experience.tsx
git commit -m "feat: redesign experience with glass cards and company color dots"
```

---

### Task 7: Projects — bento showcase grid

**Files:**
- Modify: `components/sections/projects.tsx`

**Interfaces:**
- Consumes: `projects` from `lib/portfolio.ts`
- Produces: same `<Projects />` export

- [ ] **Step 1: Rewrite `projects.tsx`**

```tsx
import Image from "next/image"
import { Bookmark, ExternalLink, FolderOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import { projects } from "@/lib/portfolio"
import { GlowOrb } from "@/components/glow-orb"

export function Projects() {
  const [featured, ...rest] = projects
  const medium = rest.slice(0, 4)
  const compact = rest.slice(4)

  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-5 py-24 sm:py-32">
      <GlowOrb color="violet" size="lg" className="absolute right-[5%] top-[30%]" />

      <div data-animate>
        <p className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/50 px-3.5 py-1.5 text-xs font-medium text-emerald-400">
          <FolderOpen className="size-3.5" />
          SELECTED WORKS
        </p>
        <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          <span className="text-foreground">Featured</span>{" "}
          <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
            Projects.
          </span>
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          A selection of platforms across IAM, SaaS, HR tech, healthcare, and civic tech.
        </p>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Featured — 2x2 */}
        {featured && (
          <div
            data-animate
            className="glass group relative flex flex-col overflow-hidden rounded-2xl sm:col-span-2 sm:row-span-2"
          >
            {featured.href ? (
              <a
                href={featured.href}
                target="_blank"
                rel="noreferrer"
                className="absolute inset-0 z-10"
                aria-label={`${featured.name} (opens new tab)`}
              />
            ) : null}
            <div className="relative aspect-[16/9] overflow-hidden">
              {featured.image ? (
                <Image
                  src={featured.image}
                  alt={`${featured.name} preview`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div
                  className="flex h-full items-center justify-center"
                  style={{ backgroundColor: featured.accent }}
                >
                  <span className="font-mono text-5xl font-bold text-white/15">
                    {featured.name.slice(0, 2).toUpperCase()}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-xl font-semibold">{featured.name}</h3>
              {featured.period ? (
                <p className="mt-1 font-mono text-xs text-muted-foreground">
                  {featured.period}
                </p>
              ) : null}
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {featured.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {featured.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border/60 bg-muted/40 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Medium tiles */}
        {medium.map((p, i) => (
          <div
            key={p.name}
            data-animate
            className="glass group relative flex flex-col overflow-hidden rounded-2xl"
          >
            {p.href ? (
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="absolute inset-0 z-10"
                aria-label={`${p.name} (opens new tab)`}
              />
            ) : null}
            <span className="absolute left-4 top-4 z-20 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 font-mono text-[0.6rem] text-white/70 backdrop-blur">
              {String(i + 2).padStart(2, "0")}
            </span>
            <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl">
              {p.image ? (
                <Image
                  src={p.image}
                  alt={`${p.name} preview`}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div
                  className="flex h-full items-center justify-center"
                  style={{ backgroundColor: p.accent }}
                >
                  <span className="font-mono text-3xl font-bold text-white/15">
                    {p.name.slice(0, 2).toUpperCase()}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-semibold">{p.name}</h3>
              <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
                {p.tags.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border/60 bg-muted/40 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Compact tiles */}
        {compact.map((p, i) => (
          <div
            key={p.name}
            data-animate
            className="glass group relative flex flex-col items-center justify-center gap-3 rounded-2xl p-5 text-center transition-all hover:border-emerald-500/30"
          >
            {p.href ? (
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="absolute inset-0 z-10 rounded-2xl"
                aria-label={`${p.name} (opens new tab)`}
              />
            ) : null}
            <span
              className="grid size-10 place-items-center rounded-xl text-lg font-bold text-white/20"
              style={{ backgroundColor: p.accent }}
            >
              {p.name.slice(0, 2).toUpperCase()}
            </span>
            <div>
              <h3 className="text-sm font-semibold">{p.name}</h3>
              {p.period ? (
                <p className="mt-0.5 font-mono text-[0.6rem] text-muted-foreground">
                  {p.period}
                </p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/projects.tsx
git commit -m "feat: redesign projects as bento showcase with featured 2x2 tile"
```

---

### Task 8: Certifications + Contact

**Files:**
- Modify: `components/sections/certifications.tsx`
- Modify: `components/sections/contact.tsx`

**Interfaces:**
- Consumes: `certifications` + `profile` from `lib/portfolio.ts`, `SectionHeader`
- Produces: same `<Certifications />` and `<Contact />` exports

- [ ] **Step 1: Rewrite `certifications.tsx`**

```tsx
import { SectionHeader } from "@/components/section-header"
import { ArrowUpRight, CheckCircle } from "lucide-react"
import { certifications } from "@/lib/portfolio"

export function Certifications() {
  return (
    <section id="certifications" className="mx-auto max-w-5xl px-5 py-24 sm:py-28">
      <SectionHeader
        eyebrow="04 / Certifications"
        title="Continuously sharpening the tools."
        description="A few credentials and courses I've earned along the way."
      />

      <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((c) => (
          <div key={c.name} data-animate className="glass group relative rounded-2xl">
            <a
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-3 p-5"
            >
              <CheckCircle className="size-4 shrink-0 text-emerald-400/60" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-snug truncate">{c.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {c.issuer}{c.year ? ` · ${c.year}` : ""}
                </p>
              </div>
              <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Rewrite `contact.tsx`**

```tsx
import { ArrowUpRight, Mail, MapPin } from "lucide-react"
import { profile } from "@/lib/portfolio"
import { GlowOrb } from "@/components/glow-orb"

export function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-5xl px-5 py-24 sm:py-28">
      <GlowOrb color="emerald" size="lg" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      <GlowOrb color="violet" size="sm" className="absolute right-[10%] bottom-[10%]" />

      <div
        data-animate
        className="glass relative overflow-hidden rounded-3xl p-10 text-center sm:p-16"
      >
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-400">
          05 / Contact
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
          Let&apos;s build something.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
          I&apos;m open to roles, collaborations, and interesting problems.
          The fastest way to reach me is email.
        </p>

        <div className="mt-8 flex flex-col items-center gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-[0_0_28px_-6px_var(--brand)]"
          >
            <Mail className="size-4" /> {profile.email}
          </a>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5" /> {profile.location}
            </span>
            {profile.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
              >
                {s.label} <ArrowUpRight className="size-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 4: Commit**

```bash
git add components/sections/certifications.tsx components/sections/contact.tsx
git commit -m "feat: redesign certifications and contact with glass cards"
```

---

### Task 9: Nav + Footer glass update

**Files:**
- Modify: `components/site-nav.tsx`
- Modify: `components/site-footer.tsx`

- [ ] **Step 1: Update nav glass style**

In `site-nav.tsx`, change the scrolled header classes to use the `.glass` utility:

```tsx
// Change line 22-23 from:
//   scrolled
//     ? "border-b border-border/60 bg-background/70 backdrop-blur-xl"
//     : "border-b border-transparent"

// To:
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "glass border-b border-border/60"
          : "border-b border-transparent"
      )}
```

- [ ] **Step 2: Update footer style**

In `site-footer.tsx`, wrap footer in glass style:

```tsx
import { profile } from "@/lib/portfolio"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-5 py-8 text-xs text-muted-foreground sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <p className="font-mono">
          Built with Next.js, shadcn/ui &amp; GSAP.
        </p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 4: Commit**

```bash
git add components/site-nav.tsx components/site-footer.tsx
git commit -m "feat: update nav and footer with glass styling"
```

---

### Task 10: Final verification

- [ ] **Step 1: Run type check**

```bash
npm run typecheck
```
Expected: zero errors.

- [ ] **Step 2: Run lint**

```bash
npm run lint
```
Expected: zero errors or warnings.

- [ ] **Step 3: Run production build**

```bash
npm run build
```
Expected: successful build with no errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: final verification after visual refresh"
```
