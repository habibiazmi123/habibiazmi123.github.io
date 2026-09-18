# Hallmark Homepage Redesign — Design Spec

**Date:** 2026-09-18  
**Approach:** Proof Ledger, portfolio-first revision  
**Audience:** HR teams and hiring managers evaluating a software engineer  
**Primary job:** Let a recruiter quickly review project proof and career experience  
**Tone:** Playful and professional  
**Stack:** Next.js 16 App Router, Tailwind CSS 4, GSAP, Geist, existing portfolio data

## Goal

Redesign the existing homepage so it clearly reads as a personal software portfolio while making project and experience proof easy for hiring teams to scan.

The design keeps the existing warm neubrutalist identity, real project content, project modal behavior, theme toggle, CV, and contact paths. It changes the hierarchy and visual treatment rather than rebuilding the application.

## Non-goals

- No new dependencies, API, CMS, or data-fetching layer.
- No invented testimonials, logos, case-study counts, or metrics.
- No deletion of production files or routes.
- No replacement of existing project modal or contact behavior.
- No decorative SaaS dashboard or internal case-file visual language.

## Information Architecture

```text
SiteNav
  Hero: identity, portrait, positioning, CV/work CTAs
  Selected Work: featured visual project proof and project details
  Track Record: compact stats and industry signal
  Experience: chronological career timeline and impact highlights
  Capabilities: Identity & Access, SaaS & Web Platforms, AI Automation
  Toolkit: grouped technologies, visually subordinate
  About + Certifications: personality and learning proof
  Contact: hiring conversation CTA, email, WhatsApp, social links, CV
SiteFooter
```

`Selected Work` and `Experience` appear before supporting sections. The page must feel like a portfolio first, not a recruiter dashboard.

## Visual System

- Preserve the existing tokens: paper `#f6f0df`, ink `#171717`, green `#256d5a`, amber `#e7b75b`, and coral `#c65d3b`.
- Preserve Geist for display and body text; use Geist Mono for dates, metadata, labels, and technical tags.
- Use square or lightly rounded corners, 1–2px rules, and selective offset shadows.
- Use the existing portrait and project screenshots as the primary visual anchors.
- Avoid gradients, glass effects, excessive pills, uniform card grids, and invented visual proof.
- Add a Hallmark pre-emit critique comment to the main stylesheet after implementation.

## Component Responsibilities

### Navigation

Keep `SiteNav` and its existing scrollspy, theme toggle, and contact action. Make the nav labels reflect the reordered anchors and keep all links usable at mobile widths.

### Hero

The hero must establish personal identity immediately:

- name, role, and location
- existing portrait asset
- concise outcome-oriented positioning statement
- primary `Explore my work` CTA
- secondary `Download CV` CTA
- available status retained if already represented by the profile data

The hero should use the two-column visual relationship shown in the approved mockup on desktop and collapse to one column on mobile.

### Selected Work

Keep the existing project data, project images, project modal, tags, outcomes, and external links. Restyle the section so featured projects have visual priority and feel like portfolio work samples rather than generic cards. Use real project names and assets.

### Track Record

Surface existing profile stats without duplicating the hero copy excessively. Stats are supporting evidence, not the visual focus. Use only values already present in `profile.stats`.

### Experience

Use a clear chronological timeline with company, role, period, location, summary, highlights, and tags. Keep the existing expand/collapse behavior for highlights. Favor one readable column over a zigzag layout for recruiter scanning.

### Capabilities, Toolkit, About, Certifications, Contact

Retain existing content and behavior. Restyle them to support the project and experience proof instead of competing with it. Contact remains link-based; no new form or scheduling integration is needed.

## Interaction And Accessibility

- Keep project cards keyboard-accessible and preserve visible focus states.
- Preserve project modal open/close behavior and external links.
- Preserve scrollspy, theme switching, CV download, email, WhatsApp, and social links.
- Use GSAP only for subtle reveal and hover motion already supported by the project.
- Disable or reduce non-essential animation under `prefers-reduced-motion: reduce`.
- Keep heading hierarchy valid and provide meaningful labels for icon-only controls.
- Ensure no clickable text wraps to two lines at mobile widths.

## Responsive Rules

- Verify at 320px, 375px, 414px, 768px, and desktop widths.
- No horizontal scrolling; apply `overflow-x: clip` to `html` and `body` if needed.
- Hero, section headers, project grids, experience, and contact layouts collapse to one column on small screens.
- Image-bearing grid tracks use `minmax(0, 1fr)`.
- Long display text may wrap naturally with `overflow-wrap: anywhere` and `min-width: 0`.
- Navigation remains usable without relying on a hidden overflow row.

## File Scope

Expected production edits:

- `app/globals.css`
- `app/page.tsx`
- `components/site-nav.tsx`
- `components/sections/hero.tsx`
- `components/sections/projects.tsx`
- `components/sections/experience.tsx`
- `components/sections/services.tsx`
- `components/sections/about.tsx`
- `components/sections/technologies.tsx`
- `components/sections/certifications.tsx`
- `components/sections/contact.tsx`
- `components/site-footer.tsx`

No production files will be deleted. No new production files are required unless an existing component becomes unreasonably large during implementation.

## Verification

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- Manual browser review at the required responsive widths.
- Keyboard tab-through review for nav, CTAs, theme toggle, project cards, modal controls, and contact links.
- Check console output for hydration or runtime errors.

## Acceptance Criteria

- A recruiter can identify who Azmi is, what he does, and where he is based in the first viewport.
- Selected work and experience proof are the first substantive sections after the hero.
- The page visibly reads as a personal portfolio through identity, portrait, real project visuals, and career narrative.
- The existing playful warm-paper design language remains recognizable.
- Existing interactions and contact paths continue to work.
- The page remains usable and visually coherent at all required mobile widths.
