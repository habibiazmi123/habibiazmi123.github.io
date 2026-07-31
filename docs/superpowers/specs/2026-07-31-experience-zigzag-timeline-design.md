# Experience Section — Zigzag Timeline

Date: 2026-07-31
Status: approved
Type: Visual redesign (content preserved)

## Goal

Replace the existing left-aligned vertical Timeline (ReUI) in the Experience section with a zigzag layout: cards alternate left/right along a vertical timeline line in the center. Same content, same section structure, different layout.

## Visual design

### Layout (desktop ≥ md)

- Container: `grid grid-cols-[1fr_2px_1fr]` with `gap-y-12` (48px between rows)
- Center column (2px) hosts a single full-height vertical line
- Even-indexed items (0, 2, ...) go in column 1, justified to the right edge so cards sit close to the center line
- Odd-indexed items (1, 3, ...) go in column 3, justified to the left edge
- The center line is a single `bg-border/60` element (`width: 2px`, `height: 100%`) drawn behind the dots

### Card

- Width: ~500px (fits within `1fr` column at `max-w-5xl` viewport)
- Border: `border border-border/60`
- Background: `bg-card/50` (subtle, semi-transparent — matches section style)
- Padding: `p-6` (24px)
- Corner radius: `rounded-xl`
- Shadow: none
- Content (unchanged from current section):
  - Period (font-mono, xs, `text-brand`)
  - Role + Company (lg, semibold)
  - Location with MapPin icon (xs, muted)
  - Summary (sm, muted)
  - Highlights list (sm, muted, bullet markers in brand)
  - Optional Projects list (sm, with period)
  - Tech tags (Badge `xs`, `outline`)

### Dot marker

- Size: 16x16px (`size-4`)
- Fill: `bg-brand`
- Border: `border-4 border-background` — creates the "ring" effect that breaks the line behind the dot
- Position: absolute, `left-1/2 -translate-x-1/2`, vertically centered with the card via `top` percentage of the row

### Connector line (per row, optional)

- A short horizontal stroke from each card edge to the dot
- Width: ~32px, height: 1px, color: `bg-border/60`
- Implementation: pseudo-element (`::before`) on the card
- **Status: skipped** — adds visual noise without clear value. Dots alone communicate the timeline.

## Mobile (< md, < 768px)

- Container: `grid grid-cols-[1fr_2px]`
- All cards in column 1, full width, stacked vertically
- Center line moves to column 2 (right side), full height
- Dots still appear on the line at each item
- Vertical gap between items: `gap-y-10` (40px) — slightly tighter than desktop to compensate for single column

## Technical approach

### Stack (unchanged)

- Next.js 16.2.6 (App Router), React 19.2
- Tailwind CSS v4
- shadcn/ui primitives
- lucide-react icons

### What changes

- `components/sections/experience.tsx` — rewrite layout from ReUI `Timeline` to custom CSS-grid layout
- ReUI `Timeline*` imports removed from this file (the components stay in `components/reui/timeline.tsx` for other potential uses)

### What does NOT change

- `lib/portfolio.ts` — `experiences` data preserved
- `components/reui/timeline.tsx` — kept as-is (other sections may use it)
- `components/section-header.tsx` — section header unchanged
- All other section components

### Data flow

- `experiences` array from `lib/portfolio.ts` is the only data source
- Index parity (`i % 2 === 0`) drives left/right placement via inline class
- Each experience renders into the appropriate grid column based on parity

## Animation / interaction

- **No scroll-triggered animation** — matches the static feel of other sections; GSAP reveal is overkill for a content list
- **Hover state** (subtle): `hover:border-brand/40 hover:bg-card/70 transition-colors duration-200`
- No dot click, no expand/collapse, no active step

## Accessibility

- `section#experience` anchor preserved
- `aria-label="Experience timeline"` on the outer grid container
- Each card is a `<article>` with semantic heading hierarchy (h3 for role, time element for period)
- MapPin icon has `aria-hidden="true"` (decorative, location text is the accessible label)
- Dots are decorative (`aria-hidden="true"`)
- Vertical line is decorative (`aria-hidden="true"`)

## Skipped (not in scope)

- Connector line from card to dot
- Scroll-triggered reveal animation
- Filtering or sorting UI
- ReUI Timeline component removal (kept for other uses)
- New experience entries
- Section header redesign

## Verify

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- Manual visual check at mobile (375px), tablet (768px), desktop (1280px+)
- Verify zigzag alternation: Telkom (left) → VOX (right) → CNT fullstack (left) → CNT freelance (right)
- Verify dots align with each card vertically on desktop
- Verify mobile stacks all cards left with line on right
