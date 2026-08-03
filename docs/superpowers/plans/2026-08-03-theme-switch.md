# Theme Switch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a visible Neubrutalist light/dark switch that follows system preference on first visit and preserves the existing keyboard shortcut.

**Architecture:** Keep `next-themes` as the single source of truth for theme state. Add a small client-only toggle control to `SiteNav`, using existing `lucide-react` icons and shared button styling. Adjust only theme defaults and the dark background texture.

**Tech Stack:** Next.js 16.2.6, React 19.2, next-themes, lucide-react, Tailwind CSS v4.

## Global Constraints

- Use `next-themes` with `defaultTheme="system"` and `enableSystem={true}`.
- Follow the visitor's OS preference on first visit.
- Preserve the `d` keyboard shortcut.
- Add no dependencies or new theme abstraction.
- Keep the switch accessible and avoid hydration mismatch.

---

### Task 1: Theme provider behavior

**Files:**
- Modify: `components/theme-provider.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes the existing `next-themes` provider and CSS theme tokens.
- Produces system-first theme selection with persisted explicit choices and readable light/dark grid textures.

- [ ] **Step 1: Change the provider to system-first behavior**

  In `components/theme-provider.tsx`, set `defaultTheme="system"` and `enableSystem={true}`. Keep `attribute="class"`, `disableTransitionOnChange`, the `d` shortcut, and the current `resolvedTheme` toggle logic unchanged.

- [ ] **Step 2: Make the dark grid readable**

  In `app/globals.css`, move the grid background into theme-aware CSS variables or add a `.dark body` override so light mode uses the current dark grid tint and dark mode uses a subtle cream grid tint.

- [ ] **Step 3: Run static checks**

  Run `npm run typecheck` and `npm run lint`.

  Expected: both commands pass.

---

### Task 2: Add the navigation theme switch

**Files:**
- Modify: `components/site-nav.tsx`

**Interfaces:**
- Consumes `useTheme()` and existing navigation styles.
- Produces a mounted, accessible, square icon button that toggles between `light` and `dark`.

- [ ] **Step 1: Add theme state and icons**

  Import `Moon` and `Sun` from `lucide-react`, plus `useTheme` from `next-themes`. Track `mounted` with `useState(false)` and set it in a mount-only `useEffect`. Read `resolvedTheme` and `setTheme` from `useTheme()`.

- [ ] **Step 2: Render a stable pre-mount placeholder**

  Render a square `span` with the same dimensions as the control before mount. After mount, render a `button` with `type="button"`, `aria-label` set to `Switch to dark mode` in light mode or `Switch to light mode` in dark mode, and an `onClick` that calls `setTheme(resolvedTheme === "dark" ? "light" : "dark")`.

- [ ] **Step 3: Style the control consistently**

  Use the existing Neubrutalist border, hard shadow, pressed transform, cobalt/chartreuse palette, and visible focus ring. Keep the button outside the desktop-only nav link group so it remains visible on mobile. Include a `span className="sr-only"` with the same action label.

- [ ] **Step 4: Run static checks**

  Run `npm run typecheck` and `npm run lint`.

  Expected: both commands pass.

---

### Task 3: Verify theme behavior

**Files:**
- Review: `components/theme-provider.tsx`
- Review: `components/site-nav.tsx`
- Review: `app/globals.css`

- [ ] **Step 1: Run the production build**

  Run `npm run build`.

  Expected: the build completes without hydration or missing-module errors.

- [ ] **Step 2: Check both themes manually**

  Run `npm run dev`, open the home page, and confirm the initial appearance follows the OS theme. Click the switch and confirm the icon, accessible label, palette, and grid texture update.

- [ ] **Step 3: Check persistence and keyboard behavior**

  Reload after switching and confirm the explicit choice persists. Press `d` outside a text field and confirm it toggles. Focus the switch with Tab and confirm the focus ring is visible.
