# Project Section Palette Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Calm the project section by replacing competing saturated card colors with a single ink-and-paper visual language.

**Architecture:** Modify only `components/sections/projects.tsx`. Keep the existing project data, image component, modal state, external links, buttons, and responsive grid. Change only palette, overlay, borders, shadows, and featured-card treatment.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, existing `next/image`, Lucide icons, and current portfolio data.

## Global Constraints

- Use paper/card surfaces for all project cards.
- Use ink for borders and text.
- Use the existing green accent only for the featured project rule, outcome label, and primary action.
- Use neutral paper/ink tags instead of chartreuse tags.
- Remove the image gradient overlay so screenshots remain clear.
- Keep one restrained offset shadow treatment for depth.
- Keep project images, names, outcomes, descriptions, tags, external links, case-study buttons, modal behavior, and responsive grid behavior.
- No new dependencies or data changes.

---

### Task 1: Apply The Ink-And-Paper Project Palette

**Files:**
- Modify: `components/sections/projects.tsx`

**Interfaces:**
- Consumes the existing `projects` array and `ProjectModal` contract.
- Produces the same `Projects` component API and the same `ProjectCard`, `ProjectImage`, `ProjectTag`, and `BrowserFrame` exports.

- [ ] **Step 1: Neutralize project tags and screenshot treatment**

Change `ProjectTag` to use paper/card background, ink border/text, and a single green dot. Remove the per-project inline accent color from the dot. Remove the `bg-gradient-to-t` overlay in `ProjectImage` so real screenshots are not darkened.

- [ ] **Step 2: Restyle the featured card**

Replace the featured card's full `bg-cobalt text-primary-foreground` treatment with a paper/card background and ink text. Add a green left rule or equivalent restrained accent. Keep the existing featured project content and actions. Use green only for the outcome label and primary `View project` action; keep `View case study` as an ink outline.

- [ ] **Step 3: Restyle secondary cards**

Replace `odd:bg-chartreuse even:bg-coral` with the same paper/card background for every secondary project. Keep the existing project accent as a thin left border only when it does not introduce a filled color surface; otherwise use the shared green rule. Keep one consistent ink offset shadow on hover.

- [ ] **Step 4: Run focused static checks**

Run `npm run typecheck` and `npm run lint`.

Expected: both commands exit with code 0.

---

### Task 2: Verify Project Interactions And Responsive Layout

**Files:**
- Test: `components/sections/projects.tsx` through the running homepage.

**Interfaces:**
- Consumes the updated project section.
- Produces verified modal, external-link, keyboard, and responsive behavior.

- [ ] **Step 1: Build the production bundle**

Run `npm run build`.

Expected: Next.js production build completes successfully.

- [ ] **Step 2: Check responsive overflow**

Inspect the homepage at 320px, 375px, 414px, 768px, and desktop widths. Confirm the project section has no horizontal scroll, image content stays within its cards, and action labels remain on one line.

- [ ] **Step 3: Check project actions**

Open the featured project case study with keyboard and pointer input. Confirm the existing modal opens and closes. Open one secondary project. Confirm `View project` still navigates externally and icon-only external links retain their accessible labels.

- [ ] **Step 4: Check the visual acceptance criteria**

Confirm that all project cards share one neutral visual language, green is the only strong accent in the section, and screenshots/content carry the visual hierarchy.

## Self-Review

- Spec coverage: palette, featured treatment, tags, overlay, shadows, preserved interactions, file scope, verification, and acceptance criteria are covered by Tasks 1–2.
- Placeholder scan: no TODO, TBD, or undefined implementation step remains.
- Type consistency: all tasks use existing component names and data contracts.
