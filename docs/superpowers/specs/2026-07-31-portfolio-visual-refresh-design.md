# Portfolio Visual Refresh — habibiazmi.com

Date: 2026-07-31
Status: approved
Type: Visual redesign (content preserved)

## Goal

Refreshed visual design for the single-page portfolio — same content, same sections, new bento-grid + glassmorphism aesthetic. Modern, playful, developer-forward.

## Visual identity

- **Theme**: Dark-first (no light variant in scope)
- **Primary accent**: Emerald (`oklch(0.696 0.17 162.48)`)
- **Secondary accents**: Violet (`oklch(0.6 0.2 280)`) and Cyan (`oklch(0.7 0.15 200)`)
- **Background**: Near-black `oklch(0.105 0.002 264)` with subtle dot-grid texture and grainy noise overlay
- **Glassmorphism**: Cards use `backdrop-blur`, semi-transparent fills (`bg-card/30-50`), subtle border glow
- **Typography**: Geist (sans body) + Geist Mono (mono labels/numbers). Dramatic size jumps between hierarchy levels.
- **Layout principle**: Bento grids everywhere — tiles of varying sizes, no uniform row/column arrangements. Intentionally overlapping elements across section boundaries.

## Section designs

### 1. Hero — Bento intro
- 3-column bento grid, full viewport
- **Top-left (2-col span)**: Gradient-text "Azmi." + role tagline + "Available" badge with ping dot
- **Top-right (1-col)**: Portrait in glass-framed tile, emerald→violet gradient glow border
- **Bottom-left (1-col)**: Stacked stat tiles ("7+ yrs", "40k+ users") in small glass cards
- **Bottom-center (1-col)**: One-line bio sentence
- **Bottom-right (1-col)**: Dual CTAs — "View Work" (emerald filled) + "Get in Touch" (glass outline)
- Large blurred emerald + violet orbs floating behind the grid

### 2. Technologies — Tech stack bento
- Bento grid of tech category cards instead of linear marquee
- **Large tile (2-col)**: "Core Stack" — Next.js, React, TypeScript, Go, PostgreSQL with icon+name badges
- **Medium tiles**: "Frontend", "Backend", "Cloud & DevOps", "AI & Tools" — each with category icon, title, tech chips
- Glass backgrounds with emerald/violet gradient borders
- Staggered GSAP reveal on scroll

### 3. About — Asymmetric story layout
- **Left (1.5-col)**: Large glass card — bio paragraph, name, location with map pin icon. Emerald accent line on left edge.
- **Right (1.5-col)**: 4 stat tiles in 2x2 mini bento — "7+ Years", "40k+ Users", "10+ Projects", "3 Industries" — large bold numbers, small labels, colored icons, glass tiles
- Violet glow behind stat grid, emerald glow behind bio card

### 4. Experience — Overlapping glass timeline
- Alternating left/right alignment along central vertical line with emerald dot indicators
- Cards slightly overlap — each sits above the previous for depth
- Card content: period badge (top-right), role + company (with colored dot), location, 2-3 bullet highlights, tech tags
- Company color coding: Telkom (emerald), VOX Asia (violet), CNT (cyan)
- Section header in its own glass tile at top

### 5. Projects — Bento showcase grid
- **Featured (2x2 large)**: TGKypas — full thumbnail, gradient overlay, name, description, tags, links
- **4 medium (1x1)**: TGSSO, ELAO, Leapsy, HRIS — thumbnail + gradient overlay, name + tags
- **4 compact (1x1)**: BAZNAS, Smartcity, Food Sharing, etc. — icon-forward, name + period only
- All cards glassmorphic, hover lift + glow border reveal
- Each project has accent color dot in corner

### 6. Certifications — Compact badge grid
- Single-row horizontal bento: 6 compact glass tiles
- Icon + issuer name + year per tile
- Emerald checkmark icon in corner of each
- Each tile links to credential URL

### 7. Contact — Full-bleed glass footer
- Wide glass card, full width, emerald+violet gradient glow behind
- Left: "Let's build something." heading + `hello@habibiazmi.com` glass button
- Right: LinkedIn + GitHub icon tiles + "Bandung, Indonesia"
- Footer: "Built with Next.js & shadcn/ui"

## Technical approach

### Stack (unchanged)
- Next.js 16.2.6 (App Router), React 19.2
- Tailwind CSS v4, shadcn/ui v4 (radix-nova)
- ReUI registry blocks (scrollspy, timeline, badge, etc.)
- GSAP + ScrollTrigger
- next-themes
- lucide-react icons

### What changes
- **globals.css**: Add dot-grid background pattern, grain texture, secondary accent CSS variables (violet, cyan), new glassmorphism utility classes
- **All section components**: Rewrite layouts from uniform grids/rows to bento mosaic layouts
- **site-nav.tsx**: Update to glassmorphism style (already partially glass). Add bento-style mobile menu if time.
- **New component**: `glow-orb.tsx` — reusable blurred gradient circle for background accents
- **New component**: `glass-card.tsx` — reusable glassmorphic card wrapper (or extend existing card)

### What does NOT change
- `lib/portfolio.ts` — all content data preserved
- `components/ui/*` — shadcn primitives stay
- `components/reui/*` — ReUI blocks stay (timeline may be adapted)
- `components/gsap-provider.tsx` — animation system stays, may add staggered reveal configs
- `components/site-nav.tsx` core logic
- `components/theme-provider.tsx`

### Data flow
- Content still reads from `lib/portfolio.ts`
- New glass-card component wraps existing content
- Glow orbs are presentational only, no data dependency

## Animation notes
- Staggered fade-up on scroll for all section tiles (existing GSAP system enhanced)
- Hero: children stagger-reveal faster (0.1s between items)
- Project cards: hover lift (translateY -4px) + glow border fade-in
- Glow orbs: slow drift animation (CSS keyframes, optional)
- Respect `prefers-reduced-motion` (unchanged behavior)

## Responsive behavior

- **Desktop (lg+)**: Full bento layouts as designed — 3-col hero, 2-col about, alternating timeline, 4-col projects
- **Tablet (md)**: Bento grids collapse to 2 columns. Hero stacks to 2-col layout. Projects drop to 2-col grid.
- **Mobile (sm)**: Single column throughout. Timeline goes full-width (no alternating). Projects stack. Glass effects reduced (less blur for perf). Bento becomes stacked cards with same visual language.

## Skipped (not in scope)
- Light theme variant
- New sections or pages
- Content changes
- Contact form backend
- Pencil .pen file — visual design defined in prose, implemented directly in code

## Verify
- `npm run typecheck`
- `npm run lint`
- `npm run build`
- Manual visual check for all sections at mobile/tablet/desktop
- Reduced-motion path check
