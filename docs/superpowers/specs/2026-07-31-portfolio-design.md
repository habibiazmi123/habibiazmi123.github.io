# Portfolio design — habibiazmi.com

Date: 2026-07-31
Status: approved

## Goal

A clean, dark, engineer-forward personal profile + portfolio for Muhamad Habibi Azmi on his domain `habibiazmi.com`. Single scrolling page with GSAP scroll-triggered animations, built with Next.js 16 + shadcn v4 + ReUI blocks.

## Persona / visual style

- Dark-first theme (no light variant for v1; next-themes still set up as single-mode for later).
- Neutral base color (already configured via `components.json` baseColor `neutral`).
- Single accent: **emerald** (wired through one CSS variable for easy swap).
- Mono/heading font for code-forward aesthetic; sans for body.
- Subtle grain/gradient backdrop in hero.

## Stack

- Next.js 16.2.6 (App Router, RSC) — note: AGENTS.md warns this is a breaking-changes build; consult `node_modules/next/dist/docs/01-app/` before writing server/client code.
- React 19.2, shadcn v4 (`radix-nova`), Tailwind v4, tw-animate-css.
- ReUI registry blocks (card surface, locked across page).
- GSAP + ScrollTrigger (new dep) for scroll animations.
- next-themes (already installed; single-mode use).
- lucide-react for icons.

## Site structure

Single route `/` with sticky nav + scrollspy anchor links. Sections in order:

1. **Hero** — name, role tagline, one-line summary (from LinkedIn About), CTAs (View Work / Contact). GSAP fade-in + gradient grain.
2. **About** — short bio from LinkedIn + quick facts (Bandung, 7+ yrs, 40k+ users managed). Stats strip: 7+ years · 40k+ users · 10+ projects · 3 industries.
3. **Experience** — vertical timeline, 3 roles:
   - Telkom Indonesia — Software Engineer (Jan 2022–now): TGKypas IAM, TGSSO (Go SSO, OAuth2/LDAP), 40k+ users, secure REST APIs, LLM/OCR service.
   - VOX Asia / PT Indo Online Mitra Usaha — Senior Software Engineer (Dec 2023–May 2024): ELAO, Leapsy, MangoPay, TTS.
   - PT Citra Niaga Teknologi — Full-stack + earlier freelance (Aug 2014–Dec 2021): HRIS (Vue, RN app), Edelweiss Hospital, AWS Chime; freelance zakat systems (Laravel, BAZNAS).
4. **Skills** — grouped grid:
   - Frontend: Next.js, React, Vue.js, React Native
   - Backend: Golang, Node.js, Laravel, Python, FastAPI
   - Data/Cloud: PostgreSQL, OAuth 2.0, LDAP, AWS, REST APIs
   - AI/Modern: LLMs, OCR, TTS
5. **Projects** — featured cards (placeholder gradient thumbnails): TGKypas, TGSSO, ELAO, Leapsy, HRIS, BAZNAS crowdfunding, Bandung Smartcity, Food Sharing.
6. **Certifications** — compact grid: Udemy Go-Lang, NodeJS Complete, React Complete, TypeScript, Dicoding SOLID, HackerRank Problem Solving.
7. **Contact** — email `hello@habibiazmi.com` (placeholder), LinkedIn, location Bandung. Footer with copyright + "Built with Next.js & shadcn".

## Data layer

All editable content lives in one typed module `src/data/portfolio.ts`: arrays for `experiences`, `projects`, `skills`, `certifications`, plus `profile` object (name, role, tagline, location, email, socials, stats). UI reads from this — no editing JSX to change copy.

```ts
export const profile = { name, role, tagline, location, email, socials, stats }
export const experiences: Experience[]
export const projects: Project[]
export const skills: SkillGroup[]
export const certifications: Certification[]
```

## Animation plan (GSAP)

- `src/components/gsap-provider.tsx` — client component registered once (`useGSAP`/`gsap.registerPlugin(ScrollTrigger)`), wired into the root layout so animations can target `[data-animate]` anywhere.
- Respect `prefers-reduced-motion` (gsap set with `null`/no-op fallback).
- Per section:
  - Hero: stagger fade-up of children.
  - All section bodies: `[data-animate]` fade/slide-up on enter viewport.
  - Experience: pinned timeline, each role reveals as you scroll.
  - Sticky section labels where helpful.
- Keep animations subtle — no parallax hijack, no horizontal scroll in v1.

## ReUI / shadcn usage

- Surface: **card**, locked across the whole page for visual consistency.
- Reuse ReUI blocks where they fit (hero, section headers, timeline, project grid, stat strip) rather than hand-rolling. Search registry and call `get_install_command`.
- Install shadcn primitives as needed (card, badge, separator, navigation-menu, sheet for mobile nav, avatar).

## Verify

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- Manual scroll check for reduced-motion path.

## Skipped (add later when needed)

- Light theme toggle, blog route, contact form backend, analytics, i18n, project detail pages, custom OG images, real photos/screenshots.