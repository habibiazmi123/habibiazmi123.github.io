# Hobby Instagram Preview Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a responsive Hobby section after Certifications that previews six public Instagram posts from `m.habibiazmi` using Instagram's official embed script.

**Architecture:** Keep post URLs and the existing Instagram profile URL in `lib/portfolio.ts`. Add one client component that renders all six blockquotes and loads/processes Instagram's embed script once. Keep the section itself server-rendered, reuse `SectionHeader`, and render the section between Certifications and Contact.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, existing Lucide icons and portfolio components.

## Global Constraints

- Use Instagram's public embed script; do not add Meta API credentials, server-side Instagram requests, or a third-party widget.
- Preserve the existing neubrutalist borders, shadows, typography, spacing, and theme colors.
- Use canonical Instagram URLs without tracking query parameters.
- Keep the grid responsive: three columns on desktop, two on tablet, and one on mobile.
- Keep normal fallback links inside every embed.
- Position Hobby after Certifications and before Contact.

---

### Task 1: Add Instagram Data and Navigation

**Files:**
- Modify: `lib/portfolio.ts:390-396`

**Interfaces:**
- Produces `instagramPosts: readonly string[]` for the Hobby section.
- Produces a `hobby` item in `navItems` between Certifications and Contact.

- [ ] **Step 1: Add the canonical post list near the other portfolio content**

Add this export after the certifications data:

```ts
export const instagramPosts = [
  "https://www.instagram.com/p/Bxb-GvxlgR8/",
  "https://www.instagram.com/p/CF3H-65n38E/",
  "https://www.instagram.com/reel/DSrLgeeD0Oh/",
  "https://www.instagram.com/reel/CoTW4BoA2tP/",
  "https://www.instagram.com/reel/CuvbmHDgetB/",
  "https://www.instagram.com/p/B7k2BgIlH88/",
] as const
```

- [ ] **Step 2: Add the Hobby scrollspy item**

Change the existing navigation array to:

```ts
export const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "hobby", label: "Hobby" },
  { id: "contact", label: "Contact" },
] as const
```

- [ ] **Step 3: Run the type check**

Run: `npm run typecheck`

Expected: PASS with no TypeScript errors.

### Task 2: Create the Official Instagram Embed Component

**Files:**
- Create: `components/instagram-embeds.tsx`

**Interfaces:**
- Consumes: `permalinks: readonly string[]`.
- Produces: one responsive embed grid and one Instagram embed script load.

- [ ] **Step 1: Create the client component with the browser type declaration**

Create `components/instagram-embeds.tsx`:

```tsx
"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    instgrm?: {
      Embeds?: {
        process: () => void
      }
    }
  }
}

const EMBED_SCRIPT = "https://www.instagram.com/embed.js"

export function InstagramEmbeds({
  permalinks,
}: {
  permalinks: readonly string[]
}) {
  useEffect(() => {
    const processEmbeds = () => window.instgrm?.Embeds?.process()
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${EMBED_SCRIPT}"]`
    )

    if (existingScript) {
      if (window.instgrm) processEmbeds()
      else existingScript.addEventListener("load", processEmbeds)

      return () => existingScript.removeEventListener("load", processEmbeds)
    }

    const script = document.createElement("script")
    script.src = EMBED_SCRIPT
    script.async = true
    script.addEventListener("load", processEmbeds)
    document.body.appendChild(script)

    return () => script.removeEventListener("load", processEmbeds)
  }, [permalinks])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {permalinks.map((permalink) => (
        <div
          key={permalink}
          className="min-w-0 overflow-hidden border-2 border-foreground bg-card shadow-[6px_6px_0_var(--ink)]"
        >
          <blockquote
            className="instagram-media !m-0 !w-full !max-w-none"
            data-instgrm-permalink={permalink}
            data-instgrm-version="14"
          >
            <a href={permalink} target="_blank" rel="noreferrer">
              View this post on Instagram
            </a>
          </blockquote>
        </div>
      ))}
    </div>
  )
}
```

This keeps the script lifecycle in one component, processes existing scripts when the section remounts, and leaves the direct post link available if Instagram cannot process an embed.

- [ ] **Step 2: Run lint and type checking for the new component**

Run: `npm run lint && npm run typecheck`

Expected: PASS with no lint or TypeScript errors.

### Task 3: Add the Hobby Section and Wire Page Order

**Files:**
- Create: `components/sections/hobby.tsx`
- Modify: `app/page.tsx:4-10,41-48`
- Modify: `components/sections/contact.tsx:12-15`

**Interfaces:**
- Consumes: `instagramPosts` from `lib/portfolio.ts`, `profile.socials` for the existing Instagram profile URL, `SectionHeader`, and `InstagramEmbeds`.
- Produces: a page section with `id="hobby"` and the `05 / Hobby` eyebrow.

- [ ] **Step 1: Create the server-rendered Hobby section**

Create `components/sections/hobby.tsx`:

```tsx
import { ArrowUpRight } from "lucide-react"
import { InstagramEmbeds } from "@/components/instagram-embeds"
import { SectionHeader } from "@/components/section-header"
import { instagramPosts, profile } from "@/lib/portfolio"

export function Hobby() {
  const instagram = profile.socials.find((social) => social.label === "Instagram")

  return (
    <section id="hobby" className="mx-auto max-w-5xl px-5 py-16 sm:py-20">
      <SectionHeader
        eyebrow="05 / Hobby"
        title="Making content outside the code editor."
        description="I enjoy creating content for Instagram and sharing ideas visually."
      />

      <div className="mt-12" data-animate>
        <InstagramEmbeds permalinks={instagramPosts} />
      </div>

      {instagram ? (
        <div className="mt-10" data-animate>
          <a
            href={instagram.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border-2 border-foreground bg-chartreuse px-5 py-3 text-sm font-bold text-foreground shadow-[4px_4px_0_var(--ink)] transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none focus-visible:ring-3 focus-visible:ring-cobalt/50"
          >
            View @{instagram.href.split("/").filter(Boolean).pop()} on Instagram
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      ) : null}
    </section>
  )
}
```

- [ ] **Step 2: Render Hobby after Certifications**

Add the import in `app/page.tsx`:

```ts
import { Hobby } from "@/components/sections/hobby"
```

Render it in this order:

```tsx
<Projects />
<Certifications />
<Hobby />
<Contact />
```

- [ ] **Step 3: Renumber the Contact eyebrow**

Change the Contact label in `components/sections/contact.tsx` from:

```tsx
05 / Contact
```

to:

```tsx
06 / Contact
```

- [ ] **Step 4: Run the full static checks**

Run: `npm run typecheck && npm run lint`

Expected: PASS with no errors.

### Task 4: Verify Production Build and Browser Behavior

**Files:**
- No new files.

- [ ] **Step 1: Build the application**

Run: `npm run build`

Expected: PASS with a successful Next.js production build.

- [ ] **Step 2: Check the section and navigation in the browser**

Run: `npm run dev`

Verify:

- The page order is Certifications, Hobby, Contact.
- The desktop navigation includes Hobby and its anchor scrolls to `#hobby`.
- Six Instagram embeds appear in three desktop columns, two tablet columns, and one mobile column.
- The profile CTA opens `https://instagram.com/m.habibiazmi` in a new tab.
- Each embed has a usable direct-post link if the Instagram script is blocked.
- Contact displays `06 / Contact`.

- [ ] **Step 3: Review the final diff**

Run: `git diff --check && git status --short`

Expected: no whitespace errors; only the planned portfolio, section, embed, page, contact, and plan/spec files are changed.
