# Hero React Bits Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade hero section with 3 React Bits components (SplitText, CountUp, TiltedCard) for added wow-factor on first impression.

**Architecture:** Install 3 components via shadcn CLI registry, then wire each into the existing hero section. No layout restructure, no new data — reuse `profile.stats` from `lib/portfolio.ts`. All React Bits components live in new `components/reactbits/` folder, separate from `reui/` and `ui/`.

**Tech Stack:** Next.js 16.2.6, React 19.2, shadcn CLI 4.16, React Bits registry (`@react-bits`), GSAP, Tailwind v4.

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
- `components/reactbits/tilted-card.tsx` — installed via shadcn

**Modified files:**
- `components/sections/hero.tsx` — wire up 3 components, add stats mini section

**Why this structure:** React Bits components are third-party (shadcn registry), distinct from in-house `reui/` blocks and shadcn `ui/` primitives. Separate folder keeps boundaries clear.

---

## Task 1: Install React Bits Components

**Files:**
- Create: `components/reactbits/split-text.tsx`
- Create: `components/reactbits/count-up.tsx`
- Create: `components/reactbits/tilted-card.tsx`
- Modify: `package.json` (registry may add deps)

**Interfaces:**
- Produces: 3 React Bits components, each with its own props (to be inspected after install)
- Subsequent tasks import from `@/components/reactbits/<name>`

- [ ] **Step 1: Create the `reactbits` folder**

```bash
mkdir -p components/reactbits
```

- [ ] **Step 2: Install SplitText**

Run: `npx shadcn@latest add @react-bits/SplitText-TS-TW`
Expected: prompts for path confirmation. When asked, accept default OR override to `components/reactbits/split-text.tsx` if option appears. File should be created.

- [ ] **Step 3: Install CountUp**

Run: `npx shadcn@latest add @react-bits/CountUp-TS-TW`
Expected: same as above, file created at `components/reactbits/count-up.tsx`.

- [ ] **Step 4: Install TiltedCard**

Run: `npx shadcn@latest add @react-bits/TiltedCard-TS-TW`
Expected: file at `components/reactbits/tilted-card.tsx`. May also pull a CSS file.

- [ ] **Step 5: Verify all 3 files exist**

```bash
ls components/reactbits/
```

Expected output (3 files):
```
count-up.tsx
split-text.tsx
tilted-card.tsx
```
(plus `.css` if TiltedCard pulled one — acceptable)

- [ ] **Step 6: Inspect each component for its prop API**

Open each file and note:
- Exported function name
- Required props
- Optional props and their defaults
- Any client-side directives (`"use client"`)

This matters for Tasks 2-4. Record the API in your head or scratch notes:
- SplitText: probably accepts `text`, `className`, `delay`, `duration`, animation config
- CountUp: probably accepts `from`, `to`, `duration`, `suffix`, `className`
- TiltedCard: probably accepts `children`, `className`, `rotateAmplitude`, `scaleOnHover`

- [ ] **Step 7: Verify typecheck still passes**

Run: `npm run typecheck`
Expected: PASS (no errors). Unused components are fine — they get used in Tasks 2-4.

- [ ] **Step 8: Commit**

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

Add this import after the existing `import { profile }` line (alphabetical order with other imports):

```tsx
import { CountUp } from "@/components/reactbits/count-up"
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
            <CountUp
              from={0}
              to={statNumber(s.value)}
              duration={2}
              suffix={statSuffix(s.value)}
              className="font-mono text-2xl font-semibold tracking-tight text-brand sm:text-3xl"
            />
            <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
```

- [ ] **Step 5: Run typecheck**

Run: `npm run typecheck`
Expected: PASS. If CountUp's actual prop names differ from what you inspected in Task 1, adjust to match (common: `end` instead of `to`, `start` instead of `from`).

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
- Consumes: `SplitText` from `@/components/reactbits/split-text`
- Existing: `<h1 data-animate className="mt-8 text-5xl leading-[1.05] font-semibold tracking-tight sm:text-6xl lg:text-7xl">` containing `<span>Hi, I'm</span> <span [gradient]>{profile.shortName}.</span>`

- [ ] **Step 1: Add SplitText import**

Add this import in hero.tsx (alphabetical with other component imports):

```tsx
import { SplitText } from "@/components/reactbits/split-text"
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
  />
</h1>
```

**Note:** Adjust prop names if the actual SplitText component uses different ones (e.g., `staggerFrom`, `splitType`). Inspect the installed file from Task 1 and map accordingly. The intent: character-by-character reveal with 30ms stagger and 0.6s duration each.

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

## Task 4: Wrap Portrait in TiltedCard

**Files:**
- Modify: `components/sections/hero.tsx` (wrap portrait markup)

**Interfaces:**
- Consumes: `TiltedCard` from `@/components/reactbits/tilted-card`
- Existing portrait block: outer `<div className="relative lg:col-span-5" data-animate>` containing gradient glow borders + the `<div className="relative aspect-4/5 w-full overflow-hidden rounded-[2rem] ...">` with the Image inside

- [ ] **Step 1: Add TiltedCard import**

Add this import in hero.tsx (alphabetical with other component imports):

```tsx
import { TiltedCard } from "@/components/reactbits/tilted-card"
```

- [ ] **Step 2: Wrap the portrait's inner content with TiltedCard**

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
  <TiltedCard
    rotateAmplitude={12}
    scaleOnHover={1.02}
    className="relative aspect-4/5 w-full overflow-hidden rounded-[2rem] border border-border/50 bg-linear-to-br from-card via-muted/40 to-card shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)]"
  >
    <Image
      src="/me.png"
      alt={profile.name}
      fill
      sizes="(max-width: 1024px) 100vw, 40vw"
      className="object-cover object-top"
      priority
    />
    <div className="absolute top-4 right-4 grid size-9 place-items-center rounded-xl border border-border/60 bg-card/80 text-emerald-400 backdrop-blur">
      <ArrowRight className="size-4" />
    </div>
  </TiltedCard>
</div>
```

**Note:** If TiltedCard's prop names differ (e.g., `maxTilt` instead of `rotateAmplitude`, `hoverScale` instead of `scaleOnHover`), map to the actual API from the installed component. The intent: max 12° tilt on mouse move, subtle 1.02x scale on hover.

- [ ] **Step 3: Run typecheck**

Run: `npm run typecheck`
Expected: PASS.

- [ ] **Step 4: Run lint**

Run: `npm run lint`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/sections/hero.tsx
git commit -m "feat(hero): wrap portrait in TiltedCard for mouse-tilt"
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

- [ ] **Step 7: Manual visual check — portrait tilt**

Hover over the portrait. Card should subtly rotate (max 12°) following cursor, with slight scale up (1.02x). Move mouse away — should smoothly reset.

- [ ] **Step 8: Mobile check**

Open browser dev tools, set viewport to 375px. Reload page. Verify:
- Name still animates (or shows final state if reduced-motion)
- Stats stack or fit on mobile
- Portrait does NOT tilt on tap (no hover)

- [ ] **Step 9: Reduced-motion check**

In browser dev tools, enable "Emulate CSS prefers-reduced-motion: reduce". Reload page. Verify:
- Name appears immediately (no character stagger)
- Stats show final value immediately (no counting)
- Portrait does not tilt (still visible normally)

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
- TiltedCard for portrait → Task 4 ✓
- `prefers-reduced-motion` handling → Task 5 verification ✓
- Mobile tilt disabled → Task 5 verification ✓
- Reuse `profile.stats` → Task 2 ✓
- No modification to other sections → all tasks scoped to hero.tsx ✓
- File structure (`components/reactbits/`) → Task 1 ✓

**2. Placeholder scan:** No TBDs. Code blocks complete. No "implement later" or "similar to Task N".

**3. Type/prop consistency:** Prop names (`rotateAmplitude`, `scaleOnHover`, `from`, `to`, `duration`, `suffix`, `text`, `className`, `delay`) referenced consistently. Note in each task that actual prop names may differ slightly — the engineer inspects the installed file and adapts. This is honest about the unknown-vs-known split.
