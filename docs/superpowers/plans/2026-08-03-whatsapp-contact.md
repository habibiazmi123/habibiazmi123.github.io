# WhatsApp Contact Option Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a direct WhatsApp CTA beside the existing email CTA in the portfolio Contact section.

**Architecture:** Store the WhatsApp number and display label in the existing shared `profile` data. Render a second primary link in the existing Contact component using a digits-only `wa.me` URL derived from the stored number, with no new dependency or API integration.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, existing `lucide-react` dependency.

## Global Constraints

- Keep the stored WhatsApp number as `+6281395038967`.
- Link WhatsApp through `https://wa.me/6281395038967`.
- Open WhatsApp in a new tab using `target="_blank"` and `rel="noreferrer"`.
- Display the readable label `+62 813 9503 8967`.
- Keep existing social links and navigation unchanged.
- Do not add WhatsApp API integration, prefilled messages, status metadata, or dependencies.

---

### Task 1: Add Centralized WhatsApp Contact Data

**Files:**
- Modify: `lib/portfolio.ts:1-22`

**Interfaces:**
- Produces `profile.whatsapp.number` as `string` with value `"+6281395038967"`.
- Produces `profile.whatsapp.label` as `string` with value `"+62 813 9503 8967"`.

- [ ] **Step 1: Add the WhatsApp object to `profile`**

Insert this property after `email`:

```ts
  whatsapp: {
    number: "+6281395038967",
    label: "+62 813 9503 8967",
  },
```

The existing `as const` assertion keeps both values readonly and available to the Contact section without introducing a new type.

- [ ] **Step 2: Run the type check**

Run: `npm run typecheck`

Expected: `tsc --noEmit` exits with code 0 and reports no TypeScript errors.

- [ ] **Step 3: Commit the data change**

```bash
git add lib/portfolio.ts
git commit -m "feat: add WhatsApp contact data"
```

### Task 2: Render Email and WhatsApp CTAs

**Files:**
- Modify: `components/sections/contact.tsx:18-47`

**Interfaces:**
- Consumes `profile.email` for the existing mail link.
- Consumes `profile.whatsapp.number` and `profile.whatsapp.label` from Task 1.
- Produces two equally prominent Contact CTAs: email and WhatsApp.

- [ ] **Step 1: Update the Contact supporting copy**

Replace:

```tsx
The fastest way to reach me is email.
```

With:

```tsx
Reach me by email or WhatsApp.
```

- [ ] **Step 2: Make the CTA row wrap responsively**

Change the CTA wrapper from:

```tsx
<div className="mt-10 flex flex-col items-center gap-4" data-animate>
```

To:

```tsx
<div
  className="mt-10 flex flex-wrap items-center justify-center gap-4"
  data-animate
>
```

- [ ] **Step 3: Add the WhatsApp CTA**

Keep the existing email CTA unchanged, then add this link immediately after it:

```tsx
<a
  href={`https://wa.me/${profile.whatsapp.number.slice(1)}`}
  target="_blank"
  rel="noreferrer"
  className="inline-flex items-center gap-2 border-2 border-foreground bg-chartreuse px-6 py-3 text-sm font-bold text-foreground shadow-[4px_4px_0_var(--ink)] transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
>
  WhatsApp {profile.whatsapp.label}
</a>
```

`slice(1)` removes the leading `+` from the stored international number, producing the required digits-only `wa.me` path without duplicating the phone number in the URL.

- [ ] **Step 4: Run static checks**

Run: `npm run typecheck && npm run lint`

Expected: both commands exit with code 0 and report no errors.

- [ ] **Step 5: Commit the Contact UI change**

```bash
git add components/sections/contact.tsx
git commit -m "feat: add WhatsApp contact CTA"
```

### Task 3: Verify the Production Result

**Files:**
- No additional files.

**Interfaces:**
- Validates the Contact section rendered by the changes from Tasks 1 and 2.

- [ ] **Step 1: Run the production build**

Run: `npm run build`

Expected: Next.js completes the optimized production build successfully.

- [ ] **Step 2: Check whitespace and working-tree state**

Run: `git diff --check && git status --short`

Expected: `git diff --check` reports no whitespace errors. Any remaining status output should contain only intentional plan or implementation changes.

- [ ] **Step 3: Confirm the final behavior**

Verify the Contact section has:

```text
Email habibiazmi.m@gmail.com
WhatsApp +62 813 9503 8967
```

The WhatsApp link must resolve to:

```text
https://wa.me/6281395038967
```

It must open in a new tab, and the two CTAs must wrap rather than overflow on narrow screens.
