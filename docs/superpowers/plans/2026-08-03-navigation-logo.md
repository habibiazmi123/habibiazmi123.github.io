# Navigation Logo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Replace the top navigation name text with the existing `/logo.png` image.

**Architecture:** Keep the existing `#top` anchor and navigation layout. Replace only its text children with Next.js `Image`, using the existing profile name for accessible alternative text.

**Tech Stack:** Next.js 16, React 19, TypeScript, `next/image`, Tailwind CSS 4.

## Global Constraints

- Modify only `components/site-nav.tsx`.
- Use the existing `/public/logo.png` asset.
- Keep the existing `#top` navigation link.
- Keep all other visible name text, metadata, favicon configuration, and page content unchanged.
- Set image `width` and `height` to `36`.
- Use `alt={profile.name}`.

---

### Task 1: Replace Navigation Text With Logo Image

**Files:**
- Modify: `components/site-nav.tsx:3,38-41`
- Test: `components/site-nav.tsx` through `npm run typecheck` and `npm run lint`

**Interfaces:**
- Consumes: `/public/logo.png` and `profile.name` from `@/lib/portfolio`.
- Produces: The existing `#top` navigation anchor containing a `36x36` Next.js image with meaningful alternative text.

- [ ] **Step 1: Import Next.js Image**

Add this import beside the existing imports:

```tsx
import Image from "next/image"
```

- [ ] **Step 2: Replace the anchor text**

Replace the current anchor contents:

```tsx
<a href="#top" className="font-mono text-sm font-bold tracking-tight">
  {profile.name}
  <span className="text-brand">.</span>
</a>
```

With:

```tsx
<a href="#top" className="font-mono text-sm font-bold tracking-tight">
  <Image src="/logo.png" alt={profile.name} width={36} height={36} />
</a>
```

- [ ] **Step 3: Run validation**

Run:

```bash
npm run typecheck && npm run lint && git diff --check
```

Expected: all commands exit with code 0; no TypeScript, ESLint, or whitespace errors are reported.

- [ ] **Step 4: Confirm the diff scope**

Run:

```bash
git diff -- components/site-nav.tsx
git status --short
```

Expected: only `components/site-nav.tsx` contains the implementation change; the existing logo asset and unrelated page content are unchanged.

- [ ] **Step 5: Commit the implementation**

```bash
git add components/site-nav.tsx docs/superpowers/plans/2026-08-03-navigation-logo.md
git commit -m "feat: use image logo in navigation"
```
