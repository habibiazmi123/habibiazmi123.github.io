# Warm Amber Accent Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the chartreuse accent with warm amber in both theme palettes.

**Architecture:** Change only the shared CSS custom-property values in `app/globals.css`; all existing component utility classes continue to consume the semantic tokens.

**Tech Stack:** Tailwind CSS v4, CSS custom properties, Next.js.

## Global Constraints

- Light accent is `#F2C94C`.
- Dark accent is `#E5B93F`.
- Keep the existing `chartreuse` token and utility class names.
- Do not change cobalt, coral, layout, content, or theme behavior.

---

### Task 1: Replace the accent tokens

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Update light-mode amber tokens**

  Replace the light-mode `--secondary`, `--chart-2`, `--sidebar-accent`, and `--chartreuse` values with `#F2C94C`. Keep their existing foreground values.

- [ ] **Step 2: Update dark-mode amber tokens**

  Replace the dark-mode `--primary`, `--ring`, `--chart-2`, `--sidebar-primary`, `--sidebar-ring`, `--chartreuse`, and `--brand` values with `#E5B93F`. Keep their existing foreground values.

- [ ] **Step 3: Verify**

  Run `npm run typecheck`, `npm run lint`, `npm run build`, and `git diff --check`. Expected: all pass.
