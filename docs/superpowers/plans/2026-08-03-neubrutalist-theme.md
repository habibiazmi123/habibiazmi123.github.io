# Neubrutalist Theme Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the portfolio's dark glassmorphism styling with the approved warm-light, surface-first Neubrutalist theme without changing content or page structure.

**Architecture:** Keep the existing App Router page, section components, portfolio data, shadcn/ReUI primitives, GSAP reveals, and responsive layouts. Centralize the visual change in CSS tokens and shared primitives, then apply only the section-specific class changes needed for panel colors, ink borders, hard shadows, and pressed interactions.

**Tech Stack:** Next.js 16.2.6, React 19.2, Tailwind CSS v4, shadcn UI, ReUI, GSAP, lucide-react.

## Global Constraints

- Base palette: warm paper `#f6f0df` and near-black ink `#171717`.
- Accents: cobalt blue, chartreuse, and coral.
- Surfaces use opaque fills, 2px black borders, and hard `6px 6px 0 #171717` shadows.
- Preserve `lib/portfolio.ts`, section order, content, analytics, data flow, and responsive behavior.
- Keep Geist and Geist Mono; add no font dependency.
- Remove or mute ambient particle/Aurora effects; add no replacement effects system.
- Preserve reduced-motion behavior and keyboard/focus accessibility.

---

### Task 1: Establish the shared Neubrutalist theme

**Files:**
- Modify: `app/globals.css`
- Modify: `components/theme-provider.tsx`
- Modify: `components/ui/button.tsx`
- Modify: `components/ui/card.tsx`
- Modify: `components/ui/dialog.tsx`
- Modify: `components/reui/badge.tsx`

**Interfaces:**
- Consumes existing Tailwind/shadcn CSS variables and component APIs.
- Produces warm-light tokens, square surfaces, hard shadows, pressed buttons, and readable default dialog/card/badge styles for every section.

- [ ] **Step 1: Set light Neubrutalist defaults and tokens**

  In `app/globals.css`, make the light root theme the warm paper default, define cobalt/chartreuse/coral tokens, reduce radii to 4px-scale values, and make base borders use ink instead of translucent gray. Keep the `.dark` token block as a high-contrast fallback for the existing `d` hotkey, but do not add a new theme system.

- [ ] **Step 2: Make light mode the initial theme**

  Change `defaultTheme` in `components/theme-provider.tsx` from `dark` to `light`. Preserve the existing keyboard toggle so users can still switch themes.

- [ ] **Step 3: Apply shared hard-surface defaults**

  Update the shared button, card, dialog, and ReUI badge class strings to use 4px radii, ink borders, opaque backgrounds, hard shadows where appropriate, and visible focus rings. Use active transforms that remove the shadow for buttons rather than adding a new component.

- [ ] **Step 4: Run the static checks**

  Run `npm run typecheck` and `npm run lint`.

  Expected: both commands pass; visual regressions are expected until section classes are updated in Task 2.

---

### Task 2: Convert shared chrome and section surfaces

**Files:**
- Modify: `components/site-nav.tsx`
- Modify: `components/site-footer.tsx`
- Modify: `components/section-header.tsx`
- Modify: `components/sections/hero.tsx`
- Modify: `components/sections/technologies.tsx`
- Modify: `components/sections/about.tsx`
- Modify: `components/sections/experience.tsx`
- Modify: `components/sections/projects.tsx`
- Modify: `components/sections/certifications.tsx`
- Modify: `components/sections/contact.tsx`
- Modify: `components/project-modal.tsx`

**Interfaces:**
- Consumes shared tokens and primitives from Task 1.
- Produces the same rendered content and interactions with opaque panels, ink structure, accent surfaces, and Neubrutalist interaction states.

- [ ] **Step 1: Convert navigation and footer**

  Replace backdrop blur/translucent nav states with a paper bar, black border, hard scrolled shadow, rectangular active states, and a footer with a matching ink divider.

- [ ] **Step 2: Convert hero and section headers**

  Replace gradient text/glow/rounded CTA styling with black and cobalt typography, a chartreuse availability label, hard-shadow CTA, and mono block section eyebrows. Keep the existing image and stat data.

- [ ] **Step 3: Convert technologies and about**

  Keep the technology marquee but restyle badges as outlined paper blocks. Restyle stats and story copy as opaque, bordered panels with cobalt/chartreuse accents.

- [ ] **Step 4: Convert experience timeline**

  Keep the current desktop zigzag and mobile line. Change the line/markers to ink, cards to opaque surfaces with hard shadows, and project sub-items/tags to bordered paper blocks.

- [ ] **Step 5: Convert projects and modal**

  Keep featured/secondary hierarchy, project data, image behavior, and modal wiring. Use cobalt featured content, alternating accent surfaces, square browser frames, hard shadows, rectangular tags, and pressed project links.

- [ ] **Step 6: Convert certifications and contact**

  Use compact bordered credential blocks and a full-width cobalt contact panel with cream text and a chartreuse/coral email CTA. Remove the contact glow.

- [ ] **Step 7: Run static checks**

  Run `npm run typecheck` and `npm run lint`.

  Expected: both commands pass.

---

### Task 3: Remove conflicting ambient effects

**Files:**
- Modify: `app/layout.tsx`
- Modify: `components/sections/hero.tsx`
- Modify: `components/particles-background.tsx`

**Interfaces:**
- Consumes the existing background effect components.
- Produces a crisp paper canvas with no competing fixed particle field or animated Aurora layer.

- [ ] **Step 1: Remove the fixed particle layer from the root layout**

  Remove the `ParticlesBackground` import and fixed wrapper from `app/layout.tsx`; keep the page content wrapper and providers unchanged.

- [ ] **Step 2: Remove the hero Aurora layer**

  Remove the Aurora import and background wrapper from `components/sections/hero.tsx`; keep the hero grid, portrait, stats, links, and reveal markers.

- [ ] **Step 3: Delete unused effect code only if unreferenced**

  Search for `ParticlesBackground`, `Aurora`, and `Particles` usages. Delete only the unused wrapper/effect files if no other references remain; do not replace them with another effects system.

- [ ] **Step 4: Run the production build**

  Run `npm run build`.

  Expected: the build completes successfully with no missing-module errors.

---

### Task 4: Verify responsive and accessibility behavior

**Files:**
- Review all files modified in Tasks 1-3.

- [ ] **Step 1: Check desktop and mobile rendering**

  Run the app with `npm run dev` and inspect the full page at desktop and mobile widths. Confirm no horizontal overflow, no clipped hard shadows, readable accent-panel text, and working project modal/open links.

- [ ] **Step 2: Check keyboard interaction**

  Tab through navigation, CTAs, project cards/links, certification links, social links, and the modal close control. Confirm focus remains visible against paper, cobalt, chartreuse, and coral surfaces.

- [ ] **Step 3: Check reduced motion**

  Enable `prefers-reduced-motion: reduce` and confirm marquee/reveal/hover animation is disabled or remains nonessential while all content stays visible.

- [ ] **Step 4: Run the final checks**

  Run `npm run typecheck`, `npm run lint`, and `npm run build`.

  Expected: all three commands pass.
