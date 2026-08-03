# WhatsApp Contact Option

**Date:** 2026-08-03
**Status:** Approved

## Goal

Give visitors a direct WhatsApp contact option alongside email in the existing Contact section.

## Design

- Add the WhatsApp number to the shared `profile` data in `lib/portfolio.ts`.
- Keep the stored value in international format: `+6281395038967`.
- Add a second primary Contact CTA beside the existing email CTA.
- Link WhatsApp through `https://wa.me/6281395038967`.
- Open WhatsApp in a new tab using the existing external-link behavior.
- Display the number in a readable format: `+62 813 9503 8967`.
- Update the contact copy to say visitors can reach Azmi by email or WhatsApp.
- Leave existing social links unchanged.

## Implementation

Modify only:

- `lib/portfolio.ts`: add the centralized WhatsApp contact value.
- `components/sections/contact.tsx`: render the WhatsApp CTA and update the supporting copy.

Reuse the existing CTA styling and use a text label without adding a dependency.

## Verification

- Run `npm run typecheck`.
- Run `npm run lint`.
- Run `npm run build`.
- Run `git diff --check`.
- Confirm the WhatsApp CTA uses the digits-only `wa.me` URL and opens in a new tab.

## Out Of Scope

- WhatsApp API integration.
- Chat prefilled messages.
- WhatsApp status or profile metadata.
- Changes to the existing social links or navigation.
