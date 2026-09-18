# Hallmark Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework the existing homepage into a portfolio-first experience where recruiters can quickly review real projects and career proof.

**Architecture:** Keep the current Next.js App Router page, portfolio data source, section components, project modal, GSAP provider, and navigation behavior. Change the homepage order, visual hierarchy, and responsive styling in place; do not add a data layer or new dependency.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind CSS 4, GSAP, Geist/Geist Mono, existing shadcn/Radix components.

## Global Constraints

- Audience: HR teams and hiring managers evaluating a software engineer.
- Primary job: Let a recruiter quickly review project proof and career experience.
- Tone: Playful and professional.
- Preserve the existing warm paper, ink, green, amber, and coral tokens.
- Use existing portrait and project assets; do not invent proof, metrics, testimonials, or logos.
- No new dependencies, API, CMS, or data-fetching layer.
- Preserve project modal, scrollspy, theme toggle, CV download, email, WhatsApp, and social links.
- No production files are deleted.
- Verify at 320px, 375px, 414px, 768px, and desktop widths.

## File Map

- Modify `app/page.tsx` to render the approved recruiter-first section order.
- Modify `app/globals.css` for locked tokens, overflow safety, Hallmark critique stamp, and motion safeguards.
- Modify `components/site-nav.tsx` and `components/site-footer.tsx` only where navigation or sign-off hierarchy needs to match the new order.
- Modify `components/sections/hero.tsx` for the portfolio-first identity block.
- Modify `components/sections/projects.tsx` for visual work-first emphasis while preserving the modal.
- Modify `components/sections/experience.tsx` for a readable chronological timeline.
- Modify `components/sections/services.tsx`, `about.tsx`, `technologies.tsx`, `certifications.tsx`, and `contact.tsx` to make supporting proof subordinate.
- Do not add or delete production files.

---

### Task 1: Establish Page Order And Global Safety

**Files:**
- Modify: `app/page.tsx:1-58`
- Modify: `app/globals.css:56-208`

**Interfaces:**
- Consumes existing section components and `jsonLd` object.
- Produces the new DOM order: hero, projects, about/track record, experience, services, technologies, certifications, contact, footer.

- [ ] **Step 1: Update the page composition**

Render `Hero` first, followed by `Projects`, `About`, `Experience`, `Services`, `Technologies`, `Certifications`, and `Contact`. Keep the JSON-LD script, `GsapProvider`, `SiteNav`, and `SiteFooter` unchanged unless the resulting order requires an import adjustment.

- [ ] **Step 2: Add global responsive guards and the Hallmark stamp**

In `app/globals.css`, add a concise pre-emit comment with the approved visual scores and add `overflow-x: clip` to both `html` and `body`. Keep the existing background texture and reduced-motion marquee behavior. Do not introduce a second palette or new font-family declarations.

- [ ] **Step 3: Run the static checks**

Run `npm run typecheck`.

Expected: the existing TypeScript project passes with no errors after the composition-only change.

---

### Task 2: Make The Hero A Personal Portfolio Entrance

**Files:**
- Modify: `components/sections/hero.tsx:1-86`

**Interfaces:**
- Consumes `profile.name`, `profile.role`, `profile.location`, `profile.email`, `profile.available`, and `/me.webp`.
- Produces an `#top` section with project and CV CTAs that work without client-side state.

- [ ] **Step 1: Replace the current hero copy and hierarchy**

Keep the availability indicator, but make the first content unmistakably personal: name/role/location metadata, a short statement about building useful systems, and a paragraph covering IAM, SaaS, and AI work. Use `Explore my work` as the primary anchor CTA and `Download CV` as the secondary CTA.

- [ ] **Step 2: Keep the portrait as the visual anchor**

Keep `next/image`, `/me.webp`, `priority`, and the existing accessible alt text. Use a bordered paper/coral frame with an offset ink shadow. Keep it visible on desktop and stack it below the copy on mobile.

- [ ] **Step 3: Verify hero links**

Confirm the primary CTA points to `#projects`, the CV points to `/Muhamad_Habibi_Azmi_Fullstack_Engineer_CV.pdf`, and the email path remains `mailto:${profile.email}`.

---

### Task 3: Elevate Selected Work Without Rebuilding Project Behavior

**Files:**
- Modify: `components/sections/projects.tsx:11-247`

**Interfaces:**
- Consumes the existing `projects` array and `ProjectModal` contract.
- Produces keyboard-accessible project cards, a featured work sample, and the existing selected-project modal.

- [ ] **Step 1: Preserve the data and modal flow**

Keep `selectedProject`, `setSelectedProject`, `ProjectModal`, external links, image alt text, tag rendering, and project outcomes. Do not move project details into a new store or duplicate them in the component.

- [ ] **Step 2: Make the section read as a portfolio gallery**

Keep the featured project image/text split, but use a clearer portfolio eyebrow such as `Selected work` and a short description that introduces real shipped work. Keep the remaining projects in a responsive visual grid with `minmax(0, 1fr)` behavior through Tailwind grid classes.

- [ ] **Step 3: Add explicit keyboard semantics where needed**

If a card remains click-to-open, make it a button-like interactive element that can be activated with Enter/Space, or move the click handler to a semantic button wrapper without breaking nested external links. Keep visible `focus-visible` styles on cards and external-link controls.

- [ ] **Step 4: Check the project modal manually**

Open TGKypas and one secondary project with keyboard and pointer input. Confirm close behavior, external links, and body layout still work.

---

### Task 4: Reframe Track Record And Experience

**Files:**
- Modify: `components/sections/about.tsx:5-51`
- Modify: `components/sections/experience.tsx:10-157`

**Interfaces:**
- Consumes existing `profile`, `profile.stats`, and `experiences` data.
- Produces recruiter-readable proof cards and a chronological timeline with expandable highlights.

- [ ] **Step 1: Recast About as the track-record section**

Keep the existing stats values and bio, but make the heading and layout support a portfolio narrative. Keep stats below the main project proof and avoid repeating the full hero claim. Preserve the existing personal paragraphs.

- [ ] **Step 2: Keep the timeline single-column**

Use the current left rail and dot treatment as the baseline. Make company, role, period, location, summary, highlights, project references, and tags scan cleanly at mobile widths. Keep the `Highlights` expand/collapse state local to each experience item.

- [ ] **Step 3: Preserve accessible controls**

Ensure every `Show more` button has a visible focus state and does not rely on color alone. Keep semantic `time`, headings, lists, and links.

---

### Task 5: Reduce Supporting Sections And Finish The Conversion Path

**Files:**
- Modify: `components/sections/services.tsx:7-47`
- Modify: `components/sections/technologies.tsx:11-48`
- Modify: `components/sections/certifications.tsx:6-45`
- Modify: `components/sections/contact.tsx:4-71`
- Modify: `components/site-nav.tsx:11-103`
- Modify: `components/site-footer.tsx:3-15`

**Interfaces:**
- Consumes existing service, technology, certification, profile, social, and navigation data.
- Produces a supporting proof layer and a clear hiring conversation CTA.

- [ ] **Step 1: Keep services useful but visually secondary**

Retain the three service cards and icon mapping. Reduce competing scale and copy density where necessary, but keep the actual service descriptions and tags.

- [ ] **Step 2: Calm the technology marquee**

Keep the existing duplicated marquee rows and reduced-motion rule. Use compact tags and ensure the marquee is clipped rather than creating page-level horizontal overflow.

- [ ] **Step 3: De-emphasize certifications**

Keep all real certification links and issuer/year metadata, but use a quieter section treatment after the major proof sections.

- [ ] **Step 4: Keep contact link-based and recruiter-friendly**

Keep email, CV, WhatsApp, location, and social links. Make the closing message explicitly invite role and collaboration conversations without adding a form or scheduler.

- [ ] **Step 5: Align nav and footer labels**

Keep scrollspy and theme toggle behavior. Ensure nav anchors match rendered sections and remain usable on narrow viewports. Keep the footer minimal and personal.

---

### Task 6: Verify The Homepage End To End

**Files:**
- Test: `app/page.tsx`, `app/globals.css`, and all modified components through project scripts and browser review.

**Interfaces:**
- Consumes the implemented homepage.
- Produces verified type safety, lint cleanliness, build output, and responsive behavior.

- [ ] **Step 1: Run type checking**

Run `npm run typecheck`.

Expected: exit code 0 with no TypeScript errors.

- [ ] **Step 2: Run linting**

Run `npm run lint`.

Expected: exit code 0 with no ESLint errors.

- [ ] **Step 3: Run the production build**

Run `npm run build`.

Expected: Next.js production build completes successfully.

- [ ] **Step 4: Review responsive layouts**

Start the app with `npm run dev`, then inspect widths 320px, 375px, 414px, 768px, and desktop. Confirm there is no horizontal scroll, hero copy wraps acceptably, project images remain inside their cards, nav links remain usable, and contact CTAs do not wrap into unreadable two-line buttons.

- [ ] **Step 5: Review interactions and console output**

Tab through navigation, hero CTAs, project cards, external links, modal controls, experience expand buttons, theme toggle, and contact links. Confirm focus is visible and the browser console has no hydration/runtime errors. Confirm reduced motion disables marquee/reveal animation as expected.

## Self-Review

- Spec coverage: goal, audience, tone, section order, visual tokens, interaction preservation, responsive requirements, file scope, verification, and acceptance criteria are mapped to Tasks 1–6.
- Placeholder scan: no TODO, TBD, or undefined implementation step remains in the plan.
- Type consistency: all tasks reuse existing component/data names and do not introduce undocumented APIs.
