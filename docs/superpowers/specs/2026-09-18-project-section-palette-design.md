# Project Section Palette Amendment

**Date:** 2026-09-18  
**Scope:** `components/sections/projects.tsx` only  
**Audience:** HR teams and hiring managers scanning portfolio work  
**Tone:** Playful, professional, calm

## Problem

The project section currently uses several high-saturation surfaces at once: cobalt for the featured panel, alternating chartreuse and coral cards, chartreuse tags, colored screenshot treatments, and offset shadows. The result is visually noisy and makes the actual work harder to scan.

## Approved Direction

Use an ink-and-paper gallery:

- Use paper/card surfaces for all project cards.
- Use ink for borders and text.
- Use the existing green accent only for the featured project rule, outcome label, and primary action.
- Use neutral paper/ink tags instead of chartreuse tags.
- Remove the image gradient overlay so screenshots remain clear.
- Keep one restrained offset shadow treatment for depth.
- Keep project images, names, outcomes, descriptions, tags, external links, case-study buttons, modal behavior, and responsive grid behavior.

## Interaction Requirements

- `View project` continues to open the external project URL.
- `View case study` continues to open the existing modal.
- Buttons keep visible focus states and do not wrap into two lines at required mobile widths.
- No new dependencies or data changes.

## File Scope

- Modify: `components/sections/projects.tsx`
- No production files created or deleted.

## Verification

- Run `npm run typecheck`.
- Run `npm run lint`.
- Run `npm run build`.
- Inspect at 320px, 375px, 414px, 768px, and desktop.
- Confirm no horizontal scroll and confirm the case-study modal still opens.

## Acceptance Criteria

- The featured project reads as a calm paper editorial panel.
- Secondary projects share one neutral visual language.
- The real screenshots and project content are the strongest visual elements.
- Green is the only strong accent within the project section.
