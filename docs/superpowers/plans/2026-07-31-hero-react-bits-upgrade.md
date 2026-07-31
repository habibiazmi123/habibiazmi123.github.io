# Hero React Bits Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade hero section with 3 React Bits components (SplitText, CountUp, GlareHover) for added wow-factor on first impression.

**Architecture:** Install 3 components via shadcn CLI registry, then wire each into the existing hero section. No layout restructure, no new data — reuse `profile.stats` from `lib/portfolio.ts`. All React Bits components live in new `components/reactbits/` folder, separate from `reui/` and `ui/`.

**Tech Stack:** Next.js 16.2.6, React 19.2, shadcn CLI 4.16, React Bits registry (`@react-bits`), GSAP, Tailwind v4.

**Plan revision history:**
- 2026-07-31 (during Task 1): swapped TiltedCard → GlareHover. TiltedCard from React Bits is image-centric (requires `imageSrc`, renders hardcoded `<motion.img>` with default mobile-warning banner + tooltip). It would have forced loss of Next.js Image optimization and broken our decorative element overlay. GlareHover accepts children, preserves Next.js Image, and still delivers "interactive hover wow-factor" on the portrait. Same React Bits family, different effect (glare shine vs 3D tilt).

## Global Constraints

- Spec: `docs/superpowers/specs/2026-07-31-hero-react-bits-upgrade-design.md`
- Do not modify any section other than `components/sections/hero.tsx`
- Do not modify `lib/portfolio.ts` (reuse `profile.stats` as-is)
- Do not modify `components/Particles.tsx`
- React Bits components go in `components/reactbits/` (new folder)
- Preserve all existing classNames, gradients, glass effects in hero
- `prefers-reduced-motion: reduce` must render final state without animation for all 3 components
- Run `npm run typecheck` and `npm run lint` after every task; must pass with zero errors/warnings
- One commit per task with conventional commit message

---

## File Structure

**New files:**
- `components/reactbits/split-text.tsx` — installed via shadcn
- `components/reactbits/count-up.tsx` — installed via shadcn
- `components/reactbits/glare-hover.tsx` — installed via shadcn
- `components/reactbits/glare-hover.css` — pulled by GlareHover install

**Modified files:**
- `components/sections/hero.tsx` — wire up 3 components, add stats mini section

**Why this structure:** React Bits components are third-party (shadcn registry), distinct from in-house `reui/` blocks and shadcn `ui/` primitives. Separate folder keeps boundaries clear.

---

## Task 1: Install React Bits Components

**Files:**
- Create: `components/reactbits/split-text.tsx`
- Create: `components/reactbits/count-up.tsx`
- Create: `components/reactbits/glare-hover.tsx`
- Create: `components/reactbits/glare-hover.css` (pulled by GlareHover install)
- Modify: `package.json` (registry may add deps)
- Patch: `components/reactbits/split-text.tsx` (fix upstream lint error from `setState` in effect)
- Add: `"use client"` directive to top of each of the 3 installed `.tsx` files (they all use React hooks, must be client components in App Router)

**Interfaces:**
- Produces: 3 React Bits components, each default-exported (not named exports)
- Subsequent tasks import via `import X from '@/components/reactbits/<name>'`

- [ ] **Step 1: Create the `reactbits` folder**

```bash
mkdir -p components/reactbits
```

- [ ] **Step 2: Install SplitText**

Run: `npx shadcn@latest add @react-bits/SplitText-TS-TW -y -p components/reactbits/split-text.tsx`
Expected: file created at `components/reactbits/split-text.tsx`. The `-y -p <path>` flags skip the prompt and force the destination.

- [ ] **Step 3: Install CountUp**

Run: `npx shadcn@latest add @react-bits/CountUp-TS-TW -y -p components/reactbits/count-up.tsx`
Expected: file at `components/reactbits/count-up.tsx`.

- [ ] **Step 4: Install GlareHover**

Run: `npx shadcn@latest add @react-bits/GlareHover-TS-TW -y -p components/reactbits/glare-hover.tsx`
Expected: file at `components/reactbits/glare-hover.tsx` AND a `components/reactbits/glare-hover.css` (GlareHover uses CSS-based glare effect — required).

- [ ] **Step 5: Verify all files exist**

```bash
ls components/reactbits/
```

Expected output:
```
count-up.tsx
glare-hover.css
glare-hover.tsx
split-text.tsx
```

- [ ] **Step 6: Add `"use client"` directive to all 3 .tsx files**

For each of `split-text.tsx`, `count-up.tsx`, `glare-hover.tsx`: add `"use client";` as the very first line (before any imports). They all use React hooks (`useEffect`, `useRef`, `useState`, `useMotionValue`, `useInView`, etc.) and must be client components in a Next.js App Router project.

Use Edit tool on each file. Example for split-text.tsx: change the first line `import React, { useRef, useEffect, useState } from 'react';` so the file starts with:

```ts
'use client';

import React, { useRef, useEffect, useState } from 'react';
```

Same pattern for count-up.tsx and glare-hover.tsx.

- [ ] **Step 7: Fix lint error in `split-text.tsx`**

The upstream registry code has `setFontsLoaded(true)` called synchronously inside a `useEffect` body (line ~52), which trips React 19's `react-hooks/set-state-in-effect` lint rule. Wrap the synchronous call in `queueMicrotask` to defer the setState outside the effect body. The async branch (`document.fonts.ready.then(...)`) is fine as-is.

Find this block in `components/reactbits/split-text.tsx`:

```tsx
  useEffect(() => {
    if (document.fonts.status === 'loaded') {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    }
  }, []);
```

Replace with:

```tsx
  useEffect(() => {
    if (document.fonts.status === 'loaded') {
      queueMicrotask(() => setFontsLoaded(true));
    } else {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    }
  }, []);
```

This defers the setState by one microtask — no behavior change, satisfies the lint rule. (Alternative: add `// eslint-disable-next-line react-hooks/set-state-in-effect` above the `if` line. The `queueMicrotask` fix is preferred because it actually addresses the rule's intent.)

- [ ] **Step 8: Verify typecheck + lint pass cleanly**

Run: `npm run typecheck && npm run lint`
Expected: PASS, zero errors and zero warnings. The 2 `no-unused-vars` warnings for `_` catch params in split-text.tsx can be left (upstream pattern, harmless) OR fixed by changing `_` to `_err` to satisfy the rule. If lint flags them, rename both `_` → `_err` in split-text.tsx.

- [ ] **Step 9: Commit**

```bash
git add components/reactbits/ package.json package-lock.json
git commit -m "feat(hero): install 3 react bits components via shadcn"
```

---

## Task 2: Add Stats Mini Section with CountUp

**Files:**
- Modify: `components/sections/hero.tsx` (add imports, helpers, stats JSX)

**Interfaces:**
- Consumes: `CountUp` from `@/components/reactbits/count-up`, `profile.stats` from `@/lib/portfolio`
- Produces: stats mini section between CTAs and end of left column
- Stat data shape: `{ value: string, label: string }` (e.g., `{ value: "7+", label: "Years" }`)

- [ ] **Step 1: Read current hero.tsx to understand structure**

Run: `read components/sections/hero.tsx`
Expected: 91 lines, with CTAs `<div data-animate className="mt-10 flex flex-wrap items-center gap-6">` at lines 50-64, followed by closing `</div>` for left column at line 65.

- [ ] **Step 2: Add 2 helper functions at the top of hero.tsx (after imports)**

Insert these 2 functions after line 3 (after `import { profile } from "@/lib/portfolio"`):

```tsx
function statNumber(value: string): number {
  return parseInt(value.replace(/[^0-9]/g, ""), 10) || 0
}

function statSuffix(value: string): string {
  return value.replace(/[0-9]/g, "").trim()
}
```

- [ ] **Step 3: Add CountUp import**

Add this import after the existing `import { profile }` line (alphabetical order with other imports). **Note: CountUp is a default export, not named:**

```tsx
import CountUp from "@/components/reactbits/count-up"
```

- [ ] **Step 4: Add stats mini JSX between CTAs and left-column close**

After the closing `</div>` of the CTAs block (current line 64, after the `Download CV` link), add:

```tsx
      <div
        className="mt-8 flex flex-wrap items-stretch gap-x-6 gap-y-4"
        data-animate
      >
        {profile.stats.slice(0, 3).map((s, i) => (
          <div
            key={s.label}
            className={`flex flex-1 flex-col ${
              i > 0 ? "border-l border-border/40 pl-6" : ""
            }`}
          >
            <span className="font-mono text-2xl font-semibold tracking-tight text-brand sm:text-3xl">
              <CountUp
                from={0}
                to={statNumber(s.value)}
                duration={2}
              />
              {statSuffix(s.value)}
            </span>
            <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
```

**Key change from original spec:** CountUp has no `suffix` prop. Render the suffix (`"+"`, `"k+"`, etc.) as text inside the same `<span>` wrapper, AFTER the `<CountUp>` element. The `<span>` provides the brand color and font styling to both the animated number and its suffix.

- [ ] **Step 5: Run typecheck**

Run: `npm run typecheck`
Expected: PASS. If CountUp's prop names differ from `from`/`to`/`duration`, adjust to match (verified API from Task 1).

- [ ] **Step 6: Run lint**

Run: `npm run lint`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add components/sections/hero.tsx
git commit -m "feat(hero): add stats mini section with CountUp"
```

---

## Task 3: Replace h1 with SplitText

**Files:**
- Modify: `components/sections/hero.tsx` (swap h1 inner text)

**Interfaces:**
- Consumes: `SplitText` (default export) from `@/components/reactbits/split-text`
- Existing: `<h1 data-animate className="mt-8 text-5xl leading-[1.05] font-semibold tracking-tight sm:text-6xl lg:text-7xl">` containing `<span>Hi, I'm</span> <span [gradient]>{profile.shortName}.</span>`

- [ ] **Step 1: Add SplitText import**

Add this import in hero.tsx (alphabetical with other component imports). **Note: SplitText is a default export:**

```tsx
import SplitText from "@/components/reactbits/split-text"
```

- [ ] **Step 2: Replace inner span of h1 with SplitText**

Find the h1 block in hero.tsx (currently around lines 30-38). The structure is:

```tsx
<h1 data-animate className="...">
  <span className="text-foreground">Hi, I&apos;m</span>{" "}
  <span className="bg-linear-to-r from-emerald-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
    {profile.shortName}.
  </span>
</h1>
```

Replace it with:

```tsx
<h1 data-animate className="mt-8 text-5xl leading-[1.05] font-semibold tracking-tight sm:text-6xl lg:text-7xl">
  <span className="text-foreground">Hi, I&apos;m</span>{" "}
  <SplitText
    text={`${profile.shortName}.`}
    className="inline-block bg-linear-to-r from-emerald-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"
    delay={30}
    duration={0.6}
    tag="span"
  />
</h1>
```

**Note:** Set `tag="span"` so SplitText renders inline within the h1 (default is `<p>` which would break the heading semantic). The intent: character-by-character reveal with 30ms stagger and 0.6s duration each.

- [ ] **Step 3: Run typecheck**

Run: `npm run typecheck`
Expected: PASS.

- [ ] **Step 4: Run lint**

Run: `npm run lint`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/sections/hero.tsx
git commit -m "feat(hero): animate name with SplitText"
```

---

## Task 4: Wrap Portrait in GlareHover

**Files:**
- Modify: `components/sections/hero.tsx` (wrap portrait markup)

**Interfaces:**
- Consumes: `GlareHover` (default export) from `@/components/reactbits/glare-hover`
- Existing portrait block: outer `<div className="relative lg:col-span-5" data-animate>` containing gradient glow borders + the `<div className="relative aspect-4/5 w-full overflow-hidden rounded-[2rem] ...">` with the Image inside
- GlareHover accepts children, preserves all existing styling and Next.js Image. CSS-based glare shines across the box on hover.

- [ ] **Step 1: Add GlareHover import + CSS import**

Add these 2 lines in hero.tsx (alphabetical with other component imports). **Note: GlareHover is a default export, and it has an associated CSS file required for the effect:**

```tsx
import GlareHover from "@/components/reactbits/glare-hover"
import "@/components/reactbits/glare-hover.css"
```

(Place the CSS import in the import group as well — Next.js handles CSS imports in client components.)

- [ ] **Step 2: Wrap the portrait's inner content with GlareHover**

Find the portrait right-column in hero.tsx (currently around lines 67-87). The structure is:

```tsx
<div className="relative lg:col-span-5" data-animate>
  <div className="pointer-events-none absolute -inset-px -z-10 rounded-[2.25rem] bg-linear-to-br from-emerald-400 via-transparent to-purple-500 opacity-60 blur-[2px]" />
  <div className="pointer-events-none absolute -inset-8 -z-20 rounded-[3rem] bg-linear-to-br from-emerald-500/20 via-transparent to-purple-500/20 blur-3xl" />
  <div className="relative aspect-4/5 w-full overflow-hidden rounded-[2rem] border border-border/50 bg-linear-to-br from-card via-muted/40 to-card shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)]">
    <Image ... />
    <div className="absolute top-4 right-4 grid size-9 ...">
      <ArrowRight ... />
    </div>
  </div>
</div>
```

Replace it with:

```tsx
<div className="relative lg:col-span-5" data-animate>
  <div className="pointer-events-none absolute -inset-px -z-10 rounded-[2.25rem] bg-linear-to-br from-emerald-400 via-transparent to-purple-500 opacity-60 blur-[2px]" />
  <div className="pointer-events-none absolute -inset-8 -z-20 rounded-[3rem] bg-linear-to-br from-emerald-500/20 via-transparent to-purple-500/20 blur-3xl" />
  <GlareHover
    width="100%"
    height="100%"
    background="transparent"
    borderRadius="2rem"
    borderColor="transparent"
    glareColor="#34d399"
    glareOpacity={0.35}
    glareAngle={-30}
    glareSize={300}
    transitionDuration={800}
    className="relative aspect-4/5 w-full overflow-hidden border border-border/50 bg-linear-to-br from-card via-muted/40 to-card shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)]"
  >
    <Image
      src="/me.png"
      alt={profile.name}
      fill
      sizes="(max-width: 1024px) 100vw, 40vw"
      className="object-cover object-top"
      priority
    />
    <div className="absolute top-4 right-4 z-10 grid size-9 place-items-center rounded-xl border border-border/60 bg-card/80 text-emerald-400 backdrop-blur">
      <ArrowRight className="size-4" />
    </div>
  </GlareHover>
</div>
```

**Notes on GlareHover config:**
- `background="transparent"` + `borderColor="transparent"` — preserve our existing gradient/border styling (GlareHover's default `background: #000` and `border: 1px solid #333` would clash with our glass card look). The Tailwind classes on `className` supply the real visual.
- `borderRadius="2rem"` — match the existing `rounded-[2rem]` on the portrait frame.
- `glareColor="#34d399"` — emerald-400 from our palette, ties the shine to the existing gradient.
- `glareOpacity={0.35}` — subtle (default 0.5 is too strong against the dark hero).
- `glareAngle={-30}` — diagonal, matches the emerald→purple gradient direction.
- `glareSize={300}` — larger than default 250 for a more sweeping effect.
- `transitionDuration={800}` — slightly slower than default 650ms for a more cinematic feel.
- `z-10` on the absolute-positioned arrow div — GlareHover's overlay div sits at `z-[2]`, our arrow needs to stay on top so it's not occluded by the glare shine.

- [ ] **Step 3: Run typecheck**

Run: `npm run typecheck`
Expected: PASS.

- [ ] **Step 4: Run lint**

Run: `npm run lint`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/sections/hero.tsx
git commit -m "feat(hero): wrap portrait in GlareHover for mouse-following shine"
```

---

## Task 5: Full Verification

**Files:** none modified — verification only

- [ ] **Step 1: Run typecheck**

Run: `npm run typecheck`
Expected: PASS, zero errors.

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: PASS, zero warnings.

- [ ] **Step 3: Run build**

Run: `npm run build`
Expected: success. Note bundle size from output — compare with previous build if available. If >20KB increase per spec risk, flag it.

- [ ] **Step 4: Start dev server**

Run: `npm run dev`
Expected: server starts on `http://localhost:3000`.

- [ ] **Step 5: Manual visual check — name animation**

Open `http://localhost:3000` in browser. On page load, the "Azmi." name should reveal character-by-character within ~1 second. No console errors.

- [ ] **Step 6: Manual visual check — stats count-up**

Scroll or refresh to trigger stats section. Numbers should count from 0 to their target value over ~2 seconds. Final values should match `profile.stats` (7+, 40k+, 10+).

- [ ] **Step 7: Manual visual check — portrait glare**

Hover over the portrait. A diagonal emerald shine should sweep across the card following the cursor, transitioning over ~800ms. Move mouse away — shine should reset.

- [ ] **Step 8: Mobile check**

Open browser dev tools, set viewport to 375px. Reload page. Verify:
- Name still animates (or shows final state if reduced-motion)
- Stats stack or fit on mobile
- Portrait does NOT show hover shine on tap (no hover)

- [ ] **Step 9: Reduced-motion check**

In browser dev tools, enable "Emulate CSS prefers-reduced-motion: reduce". Reload page. Verify:
- Name appears immediately (no character stagger)
- Stats show final value immediately (no counting)
- Portrait renders normally (no shine)

- [ ] **Step 10: Stop dev server**

Run: `pkill -f "next dev"` (or Ctrl+C in the terminal running it)
Expected: server stopped.

- [ ] **Step 11: Final commit if any cleanup needed**

If Steps 5-9 found issues, fix them in the relevant task's commit(s) with `--amend` OR a new `fix(hero):` commit. If all passed, no commit needed.

---

## Self-Review

**1. Spec coverage:**
- SplitText for "Azmi." → Task 3 ✓
- CountUp for new stats mini → Task 2 ✓
- GlareHover for portrait (swapped from TiltedCard) → Task 4 ✓
- `prefers-reduced-motion` handling → Task 5 verification ✓
- Mobile hover disabled → Task 5 verification ✓
- Reuse `profile.stats` → Task 2 ✓
- No modification to other sections → all tasks scoped to hero.tsx ✓
- File structure (`components/reactbits/`) → Task 1 ✓
- Lint + typecheck pass → enforced per-task ✓
- `"use client"` directive on all 3 components → Task 1 Step 6 ✓

**2. Placeholder scan:** No TBDs. Code blocks complete. No "implement later" or "similar to Task N".

**3. Type/prop consistency:** Props referenced match the actual installed API (verified during Task 1 follow-up):
- SplitText: `text`, `className`, `delay`, `duration`, `tag` ✓
- CountUp: `from`, `to`, `duration` (no `suffix` — suffix rendered as text outside) ✓
- GlareHover: `width`, `height`, `background`, `borderRadius`, `borderColor`, `glareColor`, `glareOpacity`, `glareAngle`, `glareSize`, `transitionDuration`, `className`, `children` ✓
- All imports use `import X from ...` (default exports) ✓

**4. Plan revision:** TiltedCard → GlareHover documented in plan header (Plan revision history) and Self-Review. Both are React Bits components; effect differs (3D tilt vs CSS glare shine) but the goal — interactive hover "wow-factor" on the portrait that preserves Next.js Image — is met.
