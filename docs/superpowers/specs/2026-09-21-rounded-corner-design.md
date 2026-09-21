# Rounded Corner Visual Refresh

**Date:** 2026-09-21  
**Approach:** Selective rounded corners  
**Scope:** Existing portfolio homepage styling

## Goal

Make the current neubrutalist portfolio feel more approachable and modern by introducing rounded corners selectively, without changing its layout, colors, typography, content, or interactions.

## Visual Direction

- Use `12px` as the main radius for cards, project media, dialogs, and content panels.
- Use `8–10px` for buttons, navigation items, toggles, and other compact controls.
- Keep avatars circular.
- Preserve 2px borders and offset shadows as the core neubrutalist visual language.
- Keep section dividers, timeline connectors, and decorative rules square or lightly rounded for contrast.
- Apply the same radius system in light and dark themes.

## Component Scope

Update the existing styling in these areas:

- `app/globals.css`: adjust the shared radius tokens.
- `components/ui/card.tsx`: align cards, headers, and footers with the new radius scale.
- `components/site-nav.tsx`: round menu items, theme toggle, mobile menu, and contact CTA.
- `components/project-modal.tsx`: round the dialog container and project media.
- Portfolio sections with direct borders or card surfaces: hero, projects, about, experience, services, certifications, and contact.
- Existing reUI components such as frame, icon tile, and timeline only where their square corners visibly conflict with nearby components.

Do not add dependencies, new components, or new layout wrappers. Do not change copy, colors, typography, animation, responsive structure, or interaction behavior.

## Interaction And Accessibility

- Preserve visible focus rings on every interactive control.
- Keep `overflow-hidden` where needed so images follow their rounded containers.
- Preserve the current offset shadow and hover behavior.
- Ensure rounded surfaces remain usable at mobile widths.
- Leave project modal behavior, scrollspy, theme toggle, CTAs, CV download, and contact links unchanged.

## Verification

Run:

- `npm run typecheck`
- `npm run lint`
- `npm run build`

Perform a visual check at desktop and mobile widths, including light and dark themes. Confirm that no horizontal overflow or focus-state regressions are introduced.

## Acceptance Criteria

- Primary cards and panels visibly use approximately 12px corners.
- Compact controls visibly use approximately 8–10px corners.
- Border thickness, offset shadows, colors, and typography remain unchanged.
- Rounded media clips correctly to its container.
- Existing interactions and responsive behavior continue to work.
- The result still reads as neubrutalist rather than generic rounded SaaS UI.
