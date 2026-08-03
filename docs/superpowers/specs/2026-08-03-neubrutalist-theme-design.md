# Neubrutalist Theme Refinement - habibiazmi.com

Date: 2026-08-03
Status: approved
Type: Visual theme refinement

## Goal

Refine the existing single-page portfolio from dark glassmorphism into a warm-light, surface-first Neubrutalist visual system while preserving the current content, section order, bento composition, data flow, analytics, and responsive behavior.

## Visual identity

- **Base palette**: warm paper background (`#f6f0df`) with near-black ink (`#171717`).
- **Accents**: cobalt blue for primary actions, chartreuse for highlights/status, and coral for occasional emphasis.
- **Surfaces**: opaque cream, cobalt, chartreuse, and coral panels with 2px black borders and a hard `6px 6px 0 #171717` offset shadow.
- **Shape language**: mostly square corners with a small 4px radius. Pills are reserved for status tags.
- **Typography**: keep Geist and Geist Mono. Use heavier display weights, tighter headings, uppercase mono labels, and intentionally oversized hero type.
- **Interaction**: buttons press down by removing the hard shadow and translating 6px. Links use solid color-block hover states.
- **Motion**: preserve useful reveal and hover motion, but remove or greatly mute ambient particle/glow effects. Preserve reduced-motion behavior.

## Section treatment

### Navigation

- Use a flat paper bar with a black bottom border.
- Replace the blurred scrolled state with a hard bottom shadow.
- Give active links cobalt or chartreuse rectangular highlights.

### Hero

- Preserve the current bento structure.
- Make tiles bold poster-like panels with opaque fills, ink borders, and offset shadows.
- Give the name/role tile the largest type.
- Put the portrait in an ink frame.
- Render availability as a chartreuse sticker-like status tag.

### Technologies

- Replace soft glass tiles with stacked outlined blocks and offset shadows.
- Use colored category panels and compact mono technology labels.

### About

- Keep the asymmetric layout.
- Use one large cream story panel and four bright stat blocks.
- Make borders and shadows structural rather than atmospheric.

### Experience

- Retain the zigzag timeline.
- Replace the glowing center line with a solid ink line and square or diamond markers.
- Give each experience card a distinct accent strip.

### Projects

- Preserve featured and compact project hierarchy.
- Use a cobalt featured panel with an image inset.
- Alternate cream, chartreuse, and coral surfaces for secondary cards.
- Keep hover lift without blur.

### Certifications

- Use compact credential blocks with check marks, strong borders, and clear issuer/year hierarchy.

### Contact

- Use a full-width cobalt panel with cream text.
- Use a large coral or chartreuse CTA block.

### Modal and footer

- Apply the same borders, shadows, panel colors, and pressed states to the project modal and footer.

## Technical scope

- Update shared theme tokens and base styles in `app/globals.css`.
- Update shared visual components including navigation, footer, section header, cards, buttons, and project modal as needed.
- Preserve `lib/portfolio.ts`, section order, content, analytics, existing data flow, and shadcn/ReUI component APIs.
- Keep the existing desktop, tablet, and mobile layouts. Adjust only styling, spacing, and text scale where required by the new hierarchy.
- Remove or mute the fixed particle background because it conflicts with the paper-and-ink treatment. Do not add a replacement effects system.
- Keep GSAP and existing hover/reveal motion. Do not add animation dependencies or speculative abstractions.

## Responsive behavior

- Desktop keeps the existing bento and zigzag compositions.
- Tablet keeps the existing two-column collapse.
- Mobile keeps the existing single-column flow, with readable panel shadows and touch-friendly pressed states.
- Decorative rotation or collage-like offsets, if used, must not cause horizontal overflow or obscure content.

## Data flow and accessibility

- All portfolio content continues to come from `lib/portfolio.ts`.
- Maintain existing links, semantics, focus states, keyboard interaction, and dialog behavior.
- Ensure accent panels keep readable foreground/background contrast.
- Respect `prefers-reduced-motion` for all retained animation.

## Verification

- Run `npm run typecheck`.
- Run `npm run lint`.
- Run `npm run build`.
- Manually review desktop and mobile views for every section.
- Check the reduced-motion path and keyboard focus visibility.

## Skipped

- New pages or sections.
- Portfolio content changes.
- A new font dependency.
- A new visual-effects or animation system.
- A contact form backend.
- A full layout rewrite.
