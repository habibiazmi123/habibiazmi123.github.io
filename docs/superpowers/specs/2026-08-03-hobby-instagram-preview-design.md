# Hobby Instagram Preview

**Date:** 2026-08-03
**Status:** Approved

## Problem

The portfolio currently ends its professional content with Certifications and does not show Azmi's creative hobby: making Instagram content. The existing Instagram profile link is present in shared profile data, but visitors do not get a preview of that work on the page.

## Solution

Add a Hobby section immediately after Certifications. It presents six official public Instagram post embeds from `m.habibiazmi`, plus a direct profile CTA. The section uses Instagram's public embed script and requires no API credentials.

## Design

### Section Layout

```text
HOBBY / INSTAGRAM
Making content outside the code editor.
I enjoy creating content for Instagram and sharing ideas visually.

┌────────────┐ ┌────────────┐ ┌────────────┐
│ Instagram  │ │ Instagram  │ │ Instagram  │
│ post embed  │ │ post embed  │ │ post embed  │
└────────────┘ └────────────┘ └────────────┘
┌────────────┐ ┌────────────┐ ┌────────────┐
│ Instagram  │ │ Instagram  │ │ Instagram  │
│ post embed  │ │ post embed  │ │ post embed  │
└────────────┘ └────────────┘ └────────────┘

[View @m.habibiazmi on Instagram]
```

- Section id: `hobby`.
- Position: after `Certifications`, before `Contact`.
- Section eyebrow: `05 / Hobby`; update Contact's existing eyebrow to `06 / Contact`.
- Desktop: three columns.
- Tablet: two columns.
- Mobile: one column.
- Existing neubrutalist borders, shadows, typography, spacing, and theme colors remain unchanged.

### Data Model

Add an `instagramPosts` array to `lib/portfolio.ts` containing the six canonical post URLs without tracking query parameters:

```ts
export const instagramPosts = [
  "https://www.instagram.com/p/Bxb-GvxlgR8/",
  "https://www.instagram.com/p/CF3H-65n38E/",
  "https://www.instagram.com/reel/DSrLgeeD0Oh/",
  "https://www.instagram.com/reel/CoTW4BoA2tP/",
  "https://www.instagram.com/reel/CuvbmHDgetB/",
  "https://www.instagram.com/p/B7k2BgIlH88/",
] as const
```

The existing `profile.socials` Instagram entry remains the source for the profile CTA URL.

### Embed Behavior

- Add a small client component responsible for rendering the blockquote embeds and loading `https://www.instagram.com/embed.js` once.
- Each post uses Instagram's `data-instgrm-permalink` and `data-instgrm-version` attributes.
- After the component mounts, call Instagram's process method so dynamically rendered posts become official embeds.
- Keep a normal link inside each blockquote so the content remains usable if the script is blocked or fails.
- Do not add a Meta API token, server-side Instagram request, or third-party widget.

### Navigation

Add `{ id: "hobby", label: "Hobby" }` to `navItems`, between Certifications and Contact, so the desktop scrollspy includes the new section.

### Accessibility

- Use a semantic `section` with the existing heading component.
- Give each embed fallback link descriptive text, such as `View Instagram post`.
- Keep the profile CTA keyboard accessible and visibly focusable.
- Preserve the normal external-link `target` and `rel` behavior already used throughout the site.

## Files to Change

| File | Change |
|------|--------|
| `lib/portfolio.ts` | Add the six canonical Instagram post URLs and the Hobby nav item. |
| `components/sections/hobby.tsx` | New section with heading, responsive embed grid, and profile CTA. |
| `components/instagram-embed.tsx` | New client component for official Instagram embed script processing. |
| `app/page.tsx` | Render `Hobby` after `Certifications`. |

## Verification

- Run `npm run typecheck`.
- Run `npm run lint`.
- Run `npm run build`.
- Verify the section order, nav anchor, responsive grid, and Instagram fallback links in the browser.

## Out of Scope

- Automatically fetching the latest Instagram posts.
- Instagram API credentials or Meta app configuration.
- Third-party feed services.
- Custom thumbnails or replacing Instagram's official embed styling.
