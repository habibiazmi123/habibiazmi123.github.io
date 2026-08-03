# Theme Switch Design - habibiazmi.com

Date: 2026-08-03
Status: approved
Type: Theme behavior refinement

## Goal

Add a visible light/dark theme switch while preserving the Neubrutalist visual system, existing keyboard shortcut, content, layout, and responsive behavior.

## Theme behavior

- Use `next-themes` with `defaultTheme="system"` and `enableSystem={true}`.
- Follow the visitor's OS preference on first visit.
- Persist an explicit visitor choice through the existing `next-themes` storage behavior.
- Keep the `d` keyboard shortcut and route it through the same theme toggle behavior.
- Keep both palettes Neubrutalist: warm paper/ink/cobalt/chartreuse/coral in light mode and ink/cream/lime/coral in dark mode.
- Use a light-tinted grid in dark mode so the background texture remains subtle.
- Render the switch only after mount, with a stable placeholder before mount, to avoid hydration mismatch.

## Switch control

- Add a square icon button to `components/site-nav.tsx` beside the existing CTA.
- Show `Moon` when the resolved theme is light and `Sun` when the resolved theme is dark.
- Provide an action-oriented `aria-label`, such as `Switch to dark mode`.
- Reuse the existing 2px ink border, hard offset shadow, and pressed state.
- Use visually hidden text for the accessible label; add no tooltip dependency.
- Keep the control visible on mobile even when desktop nav links and CTA are hidden.

## Scope

- Modify `components/theme-provider.tsx`.
- Modify `components/site-nav.tsx`.
- Adjust only the light/dark token blocks in `app/globals.css`.
- Add no dependencies or new theme abstraction.

## Verification

- Run `npm run typecheck`.
- Run `npm run lint`.
- Run `npm run build`.
- Check light mode, dark mode, system preference, persisted selection, icon labels, keyboard shortcut, and hydration warnings.
