# Rounded Corner Visual Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply selective rounded corners to the existing neubrutalist portfolio while preserving its layout, colors, typography, shadows, and behavior.

**Architecture:** Keep the existing Tailwind token system and component structure. Raise the shared radius scale, then add explicit `rounded-lg`/`rounded-xl` utilities only to visible cards, panels, media frames, and compact controls that currently have square corners.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, shadcn primitives, TypeScript.

## Global Constraints

- Use `12px` as the main radius for cards, project media, dialogs, and content panels.
- Use `8–10px` for buttons, navigation items, toggles, and other compact controls.
- Preserve 2px borders, offset shadows, colors, typography, layout, animation, and interaction behavior.
- Do not add dependencies, new components, or new layout wrappers.
- Preserve visible focus rings and responsive behavior.

---

### Task 1: Update Shared Radius Primitives

**Files:**
- Modify: `app/globals.css:46-52,81`
- Modify: `components/ui/button.tsx:8`
- Modify: `components/ui/card.tsx:15,28,87`
- Modify: `components/ui/dialog.tsx:64,109`
- Modify: `components/reui/badge.tsx:62`

**Interfaces:**
- Consumes: Existing Tailwind `--radius-*` tokens and shadcn class variants.
- Produces: Shared utilities where `rounded-sm` is 8px, `rounded-md` is 10px, and card/dialog surfaces can use 12px without changing component APIs.

- [ ] **Step 1: Update the radius tokens**

  Set the theme values to `8px`, `10px`, and `12px`:

  ```css
  --radius-sm: 8px;
  --radius-md: 10px;
  --radius-lg: 12px;
  --radius-xl: 12px;
  --radius-2xl: 12px;
  --radius-3xl: 12px;
  --radius-4xl: 12px;
  ```

  Set the root `--radius` value to `10px`.

- [ ] **Step 2: Round reusable controls and surfaces**

  Replace the base `rounded-sm` in `buttonVariants` with `rounded-lg`; replace the `Card`/header/footer corner utilities with `rounded-xl`, `rounded-t-xl`, and `rounded-b-xl`; replace dialog content/footer utilities with `rounded-xl` and `rounded-b-xl`; and change the default badge variant from `rounded-sm` to `rounded-md`.

- [ ] **Step 3: Run the type check**

  Run: `npm run typecheck`

  Expected: exit code 0 with no TypeScript errors.

### Task 2: Round Navigation, Hero, and Project Surfaces

**Files:**
- Modify: `components/site-nav.tsx:54,62,65,90,112`
- Modify: `components/sections/hero.tsx:22,52,60,74,81`
- Modify: `components/sections/projects.tsx:13,30,86,100,126,133,142,155,187,204`
- Modify: `components/project-modal.tsx:25,28,101`

**Interfaces:**
- Consumes: Shared radius utilities from Task 1.
- Produces: Rounded portfolio-first surfaces with unchanged project selection, modal, navigation, and CTA behavior.

- [ ] **Step 1: Round compact navigation controls**

  Add `rounded-lg` to nav links, the mobile menu trigger and panel, the theme toggle, and the desktop contact CTA. Keep the existing borders, shadows, focus rings, and hover transforms.

- [ ] **Step 2: Round hero surfaces and actions**

  Add `rounded-lg` to the availability badge and both hero CTAs. Add `rounded-xl overflow-hidden` to the portrait figure and `rounded-lg` to the portrait image so the image clips cleanly inside its frame.

- [ ] **Step 3: Round project frames and cards**

  Add `rounded-xl` to `BrowserFrame`, featured cards, and standard project cards. Add `rounded-md` to project tags and the external-link icon control. Add `rounded-lg` to project outcome labels and project action buttons. Preserve `overflow-hidden` on all media-bearing containers.

- [ ] **Step 4: Round the project dialog content and CTA**

  Add `rounded-lg` to the modal's project CTA. Keep the modal media flush to the dialog edge while relying on the dialog's `overflow-hidden` and rounded container to clip its corners.

- [ ] **Step 5: Run the lint check**

  Run: `npm run lint`

  Expected: exit code 0 with no ESLint errors.

### Task 3: Round Supporting Portfolio Sections

**Files:**
- Modify: `components/sections/about.tsx:34`
- Modify: `components/sections/experience.tsx:86,117`
- Modify: `components/sections/services.tsx:21,23,36`
- Modify: `components/sections/contact.tsx:10,32,40,48`
- Modify: `components/sections/technologies.tsx:5`
- Modify: `components/sections/hobby.tsx:29`
- Modify: `components/instagram-embeds.tsx:63,78`

**Interfaces:**
- Consumes: Shared radius utilities from Task 1.
- Produces: Consistent rounded content surfaces without changing content or section layout.

- [ ] **Step 1: Round content panels**

  Add `rounded-xl` to the About prose panel, Experience articles, Services articles, Contact CTA panel, and Instagram embed containers. Add `rounded-md` to compact technology tags, experience metadata blocks, service icon tiles, and hobby/contact controls.

- [ ] **Step 2: Preserve contrast elements**

  Leave timeline connector dots, section dividers, and purely decorative rules square or circular as they are. Do not add large rounded wrappers around whole sections.

- [ ] **Step 3: Run the production build**

  Run: `npm run build`

  Expected: exit code 0 and a successful Next.js production build.

### Task 4: Review Responsive and Theme States

**Files:**
- Review: `app/globals.css`
- Review: `components/site-nav.tsx`
- Review: `components/sections/hero.tsx`
- Review: `components/sections/projects.tsx`
- Review: `components/project-modal.tsx`

- [ ] **Step 1: Check desktop and mobile rendering**

  Inspect the page at desktop width and at 320px, 375px, and 414px widths. Confirm that rounded controls do not introduce horizontal scrolling or hide focus rings.

- [ ] **Step 2: Check both themes**

  Inspect light and dark themes. Confirm that only corner geometry changed and that border, shadow, color, and text contrast remain intact.

- [ ] **Step 3: Check interactive paths**

  Open and close a project modal, use the mobile nav, toggle the theme, and activate hero/project/contact links. Confirm behavior is unchanged.
