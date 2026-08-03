# Navigation Logo Design

## Goal

Replace the visible name text in the top navigation with the existing `/logo.png` image.

## Scope

- Modify only `components/site-nav.tsx`.
- Keep the existing `#top` navigation link.
- Keep all other visible name text, metadata, favicon configuration, and page content unchanged.

## Implementation

Use Next.js `Image` with `src="/logo.png"`, `alt={profile.name}`, and `width` and `height` set to `36`. Keep the current anchor styling and make the image the anchor content.

## Validation

- Run the project type check and lint commands.
- Confirm the navigation image links to `#top` and has meaningful alternative text.
