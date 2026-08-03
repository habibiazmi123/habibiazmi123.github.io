# Project Detail Modal

**Date:** 2026-08-03
**Status:** Approved

## Problem

PostHog analytics show high bounce rate on the projects section. Users see project cards but leave without engaging — not enough detail to hold attention or prompt action.

## Solution

Click any project card → opens a modal (shadcn Dialog) with full project details: larger image, complete description, role/responsibilities, tech tags, and action link.

## Design

### Data Model

Add optional `details` field to `Project` type:

```ts
type Project = {
  name: string
  description: string
  tags: string[]
  href?: string
  period?: string
  accent: string
  image?: string
  details?: string[]  // Role/responsibilities bullets
}
```

### Modal Layout

```
┌─────────────────────────────────────────┐
│ Project Name              [period]      │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │         BrowserFrame Image         │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Full description text (not clamped)     │
│                                         │
│ What I did                              │
│ • Responsibility 1                      │
│ • Responsibility 2                      │
│                                         │
│ [tag] [tag] [tag]                       │
│                                         │
│ [View project →]  (if href exists)      │
└─────────────────────────────────────────┘
```

### Card Interaction

- All cards get `cursor-pointer` + `onClick` opens modal
- Featured card: entire card area is clickable
- Regular cards: entire card is clickable
- External link icon: `stopPropagation`, opens href directly in new tab (no modal)

### Files to Change

| File | Change |
|------|--------|
| `lib/portfolio.ts` | Add `details` to `Project` type + populate per project |
| `components/ui/dialog.tsx` | Install via `npx shadcn@latest add dialog` |
| `components/project-modal.tsx` | New component — modal content |
| `components/sections/projects.tsx` | Add click state + modal rendering |

### Component: `project-modal.tsx`

- Props: `project: Project | null`, `onClose: () => void`
- Uses `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`
- Image in BrowserFrame (reuse existing component)
- Tags with colored dots (reuse `ProjectTag`)
- "View project" button only if `href` exists

### Accessibility

- Modal triggered by button/click — focus trapped inside dialog
- ESC key closes modal
- Click outside closes modal
- Focus returns to trigger element on close

## Out of Scope

- GSAP card-to-modal transitions (upgrade path for later)
- Multi-image gallery
- Animation beyond default shadcn Dialog transition
