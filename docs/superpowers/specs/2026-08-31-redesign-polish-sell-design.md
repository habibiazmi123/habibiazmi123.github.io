# Redesign Polish & Sell — Design Spec

**Date:** 2026-08-31
**Approach:** A — Polish & Sell (ponytail: minimal diff, max sell)
**Stack:** Next.js 16 App Router, Tailwind 4, shadcn/radix-nova, GSAP, Geist, PostHog
**Source:** `lib/portfolio.ts` single source of truth

## Goal
Make habibiazmi.com more modern and more selling for **both** recruiters/hiring managers and freelance/SaaS clients. Primary CTA: **Download CV / Email**. Not a full rebuild — polish existing brutalist character into premium-minimal.

## Non-goals
- No new dependencies, no new fonts, no API/backend
- No full theme overhaul (keep chartreuse/cobalt/coral, just soften)
- No blog/CMS, no Calendly (CTA stays email/CV as requested)
- Hobby/Instagram removed (user approved: hapus/minimalkan)

## Information Architecture
New order in `app/page.tsx`:
```
SiteNav
  Hero (value prop)
  Services (NEW)
  Projects (case-study polish)
  Experience (single column)
  Technologies (marquee calm)
  Certifications (compact, de-emphasized)
  Contact (conversion)
SiteFooter
Hobby removed from page (component file kept for later if needed)
```

## 1. Hero — `components/sections/hero.tsx`
**Problem:** "Hi I'm Azmi" is identity, not outcome. Stats duplicated with About.

**Design:**
- Eyebrow: keep `Available for new projects` pill (chartreuse, ping dot)
- H1: `I build systems that scale to 40,000+ users.` (outcome-first, trust signal)
- Sub: `Full Stack Engineer — IAM/SSO, SaaS, AI pipelines. 7+ years shipping for Telkom, EU SaaS, healthcare.` (one line, covers both audiences)
- CTAs: primary `Email me → mailto` (cobalt), secondary `Download CV` (underline), no WA hero button (WA stays in Contact as tertiary)
- Stats: remove from hero (stay in About, avoid duplication)
- Portrait: fix `top-[-50]` bug → `top-0`, `w-3/4 aspect-[4/5] object-cover`, shadow `10px→6px`, border 2px keep
- Spacing: `py-14 → py-20 lg:py-24`, gap `12→16`

## 2. Services — NEW `components/sections/services.tsx`
**Why:** Single section that answers "what can I hire you for?" for both audiences.

**Data:** Add to `lib/portfolio.ts`:
```ts
export type Service = { title: string, desc: string, icon: string, tags: string[] }
export const services: Service[] = [
  { title:"Identity & Access", desc:"SSO/IAM, OAuth 2.0/LDAP, audit trails — 40k users at Telkom Group.", icon:"Shield", tags:["Golang","OAuth 2.0","LDAP","IAM"]},
  { title:"SaaS & Web Platforms", desc:"Next.js/React/Vue, real-time, payments — EU & ID production.", icon:"Globe", tags:["Next.js","React","Vue.js","MangoPay"]},
  { title:"AI Automation", desc:"OCR + LLM pipelines, TTS, document extraction for ops.", icon:"Sparkles", tags:["LLMs","OCR","Text-to-Speech"]},
]
```
**UI:** 3-col grid (`grid-cols-1 md:grid-cols-3 gap-4`), each card `border-2 border-foreground p-6 shadow-[4px_4px_0_var(--ink)]`, alternating bg `bg-card / bg-chartreuse / bg-coral` or all `bg-card` with cobalt left border. Icon tile via `components/reui/icon-tile.tsx` or lucide inline. Title `font-bold`, desc `text-sm text-muted-foreground`, tags row `Badge outline xs`. `data-animate` on grid.

## 3. Projects — `components/sections/projects.tsx`
**Polish, not rebuild:**
- Add `outcome?: string` to `Project` in `lib/portfolio.ts` for 3 featured projects: TGKypas "Automates access for 40k+ users", TGSSO "Central auth for 30k employees + 10k partners", Pegi "Used in 40+ countries"
- Card: show outcome as `font-mono text-[0.65rem] font-bold tracking-widest text-cobalt uppercase` above title (only if present)
- Keep `BrowserFrame` + `ProjectImage` + `ProjectCard` structure, reduce shadow hover `6px→4px` for premium feel, keep tags
- Keep `ProjectModal` as is
- Keep featured + 3-col grid, no layout change

## 4. Experience — `components/sections/experience.tsx`
**Simplify zigzag → single column:**
- Remove center line (md) + right line (mobile) + left/right alternation (`isLeft`, `md:w-1/2`, `pr-12/pl-12`)
- New: left rail — `absolute left-0 top-0 bottom-0 w-0.5 bg-foreground`, dot `absolute left-0 top-8 size-3 -translate-x-1/2 border-2 border-foreground bg-chartreuse`, container `pl-8` (mobile) / `pl-10` (desktop), full width `max-w-3xl`
- Card: keep `border-2 p-6 shadow-[6px→4px]`, time/role/company/location/summary/highlights/tags same, `Highlights` expand logic keep
- Fewer DOM nodes, cleaner scan for recruiters

## 5. Technologies — `components/sections/technologies.tsx`
- Keep marquee structure (`row1/row2` split, duplicate for loop, `marquee-left/right`)
- Polish: badge `px-4 py-2 text-sm shadow-[3px] → px-3 py-1.5 text-xs shadow-[3px]`, gap `3→4`, anim `30s→40s` (calmer), mask keep
- No data change (`techStack`, `allTech` keep)

## 6. Certifications — `components/sections/certifications.tsx`
- De-emphasize: title `text-sm` keep, section `py-16→py-12`, grid `gap-3` keep, card hover `translate-y-1` keep but bg `bg-muted/50` for less visual weight
- Keep as trust signal but below Experience, above Contact
- No new data

## 7. Contact — `components/sections/contact.tsx`
- Keep cobalt box `border-2 bg-cobalt shadow-[8px→6px]`
- Add social proof line above CTA: `Trusted by Telkom Group · EU clients · 40k+ users` (`font-mono text-xs tracking-widest opacity-80`)
- CTA hierarchy: primary `Email me` (chartreuse, 2btns side-by-side), secondary `Download CV` (if not in hero, keep both), tertiary `WA` as small link + location/socials row keep
- No form, no Calendly per user choice

## 8. Global Polish — `app/globals.css` + `components/section-header.tsx`
- Shadows: `shadow-[10px]→6px`, `8px→6px`, `6px→4px`, `4px→3px` where used (hero portrait, contact box, cards) — softer premium
- Spacing: sections `py-16 sm:py-20 → py-16 sm:py-24` for airiness, hero `pt-16→pt-20`
- Grid line: `rgba(23,23,23,0.045)→0.03`, dark `0.06→0.04`
- SectionHeader: `border-l-4→3` `pl-4→pl-5`, eyebrow keep mono, title `font-black` keep
- Marquee keyframes duration in css `30s→40s`
- No new CSS vars, no new @theme

## 9. Nav & Footer — `components/site-nav.tsx`, `site-footer.tsx`
- Nav: no change (keep scrollspy, theme toggle, Get in touch btn). Ensure `navItems` still correct after removing hobby (remove hobby entry from `lib/portfolio.ts:navItems` or keep but hidden — remove it).
- Footer: keep, no change

## 10. Data Changes — `lib/portfolio.ts`
- Add `services` array (3 items)
- Add `outcome?: string` to `Project`
- Update 3 projects with outcome
- Remove `{id:"hobby"}` from `navItems` (or keep but page won't render it — remove to avoid dead anchor)
- No breaking changes, all optional fields

## File Map
- **New:** `components/sections/services.tsx`
- **Edit:** `lib/portfolio.ts`, `app/page.tsx`, `app/globals.css`, `components/sections/hero.tsx`, `components/sections/projects.tsx`, `components/sections/experience.tsx`, `components/sections/technologies.tsx`, `components/sections/certifications.tsx`, `components/sections/contact.tsx`, `components/section-header.tsx`
- **Remove from page:** `components/sections/hobby.tsx` import/use (file stays)
- **No edit:** `components/site-nav.tsx`, `site-footer.tsx`, `gsap-provider.tsx`, `project-modal.tsx`

## Verification
- `npm run build` passes, `npm run lint` passes, `tsc --noEmit` passes
- Visual: hero value prop readable, services 3-col → 1-col mobile, projects outcome visible, experience single column, marquee calm, contact CTA hierarchy clear
- No new deps, no env changes
