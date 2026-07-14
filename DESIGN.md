---
version: "alpha"
name: "Prompt Engineering Workbench — Research Console"
description: "A calm, evidence-oriented interface for building, comparing, testing, and documenting prompt-engineering frameworks."
colors:
  background: "hsl(0 0% 100%)"
  foreground: "hsl(222.2 84% 4.9%)"
  card: "hsl(0 0% 100%)"
  card-foreground: "hsl(222.2 84% 4.9%)"
  popover: "hsl(0 0% 100%)"
  popover-foreground: "hsl(222.2 84% 4.9%)"
  primary: "hsl(221.2 83.2% 53.3%)"
  primary-foreground: "hsl(210 40% 98%)"
  secondary: "hsl(210 40% 96%)"
  secondary-foreground: "hsl(222.2 84% 4.9%)"
  muted: "hsl(210 40% 96%)"
  muted-foreground: "hsl(215.4 16.3% 46.9%)"
  accent: "hsl(210 40% 96%)"
  accent-foreground: "hsl(222.2 84% 4.9%)"
  destructive: "hsl(0 84.2% 60.2%)"
  destructive-foreground: "hsl(210 40% 98%)"
  border: "hsl(214.3 31.8% 91.4%)"
  input: "hsl(214.3 31.8% 91.4%)"
  ring: "hsl(221.2 83.2% 53.3%)"
  dark-background: "hsl(222.2 84% 4.9%)"
  dark-foreground: "hsl(210 40% 98%)"
  dark-card: "hsl(222.2 84% 4.9%)"
  dark-card-foreground: "hsl(210 40% 98%)"
  dark-secondary: "hsl(217.2 32.6% 17.5%)"
  dark-secondary-foreground: "hsl(210 40% 98%)"
  dark-muted: "hsl(217.2 32.6% 17.5%)"
  dark-muted-foreground: "hsl(215 20.2% 65.1%)"
  dark-border: "hsl(217.2 32.6% 17.5%)"
  dark-ring: "hsl(212.7 26.8% 83.9%)"
typography:
  display:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: "700"
    lineHeight: "2.5rem"
    letterSpacing: "-0.025em"
  h1:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: "700"
    lineHeight: "2.25rem"
    letterSpacing: "-0.02em"
  h2:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: "600"
    lineHeight: "2rem"
    letterSpacing: "-0.015em"
  h3:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: "600"
    lineHeight: "1.75rem"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: "400"
    lineHeight: "1.5rem"
  body-small:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: "400"
    lineHeight: "1.25rem"
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: "600"
    lineHeight: "1.25rem"
  code:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    fontSize: "0.875rem"
    fontWeight: "400"
    lineHeight: "1.375rem"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "48px"
components:
  page-canvas:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    padding: "{spacing.lg}"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "10px 16px"
    height: "40px"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.secondary-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "10px 16px"
    height: "40px"
  input:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "8px 12px"
    height: "40px"
  focus-ring:
    backgroundColor: "{colors.ring}"
    rounded: "{rounded.md}"
    size: "2px"
  destructive-action:
    backgroundColor: "{colors.destructive}"
    textColor: "{colors.destructive-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "10px 16px"
    height: "40px"
---

## Overview

The Prompt Engineering Workbench is a research console, not a marketing landing page. Its interface should help a person investigate frameworks, preserve evidence, compare alternatives, run structured exercises, and understand why a result occurred.

The current visual baseline is deliberately restrained: Inter typography, neutral white and slate surfaces, blue primary actions, compact rounded corners, and clear card boundaries. New screens should extend this system rather than inventing a separate visual language.

The design must remain readable during long sessions. Information hierarchy, traceability, and predictable controls matter more than decoration.

## Colors

Use the token values in the YAML front matter as the normative palette. These values mirror the current CSS-variable system in `app/app/globals.css`.

- **Background and card surfaces** remain neutral so research content carries the visual weight.
- **Primary blue** identifies the main action, active selection, focus state, and important navigational emphasis. Do not use it on every interactive element.
- **Muted surfaces** separate supporting information, filters, metadata, and secondary controls without competing with the active task.
- **Destructive red** is reserved for irreversible or damaging actions. It is not a decorative accent.
- **Dark mode** must preserve the same semantic relationships rather than simply inverting colors.

Color must never be the only signal for state, severity, selection, failure, or success. Pair it with text, icons, labels, or shape changes.

## Typography

Inter is the application typeface and should remain the default unless a documented design revision replaces it.

- Use `display` sparingly for major workspace or dashboard titles.
- Use `h1`, `h2`, and `h3` to expose document structure and support screen-reader navigation.
- Use normal body text for explanations. Do not shrink instructional content merely to fit more controls on screen.
- Use the monospace token for prompts, code, variables, model output fragments, identifiers, and other literal machine-facing content.
- Prefer sentence case. Avoid long all-caps labels.

On small screens, headings may reduce in size, but the semantic order must remain intact.

## Layout

The existing application uses a persistent sidebar, a scrollable main region, a centered maximum-width content column, and approximately 24px page padding.

- Keep the primary task visible and place supporting material in secondary panels, tabs, accordions, or clearly labeled drawers.
- Use the spacing scale consistently. Avoid arbitrary one-off values when an existing token works.
- Group controls by purpose, not merely by visual similarity.
- Long prompt text, evidence, and comparison results need generous vertical space and must not be trapped in tiny fixed-height boxes.
- Mobile layouts should become a clear single-column sequence. Do not preserve desktop side-by-side density when it damages readability.
- Tables must permit horizontal scrolling or transform into labeled records on narrow screens.

## Elevation & Depth

Depth is functional rather than decorative.

- Default cards use a border or subtle shadow, not both at maximum strength.
- Hover shadows may indicate an interactive card, but static research panels should not appear clickable.
- Dialogs, popovers, and menus may use stronger separation because they temporarily sit above the active workspace.
- Avoid glassmorphism, excessive blur, neon glow, or deep layered shadows unless a later approved design revision explicitly introduces them.

## Shapes

The core radius is 8px, with smaller 6px and 4px variants for nested controls.

- Buttons, inputs, cards, tabs, dialogs, and menus should share the same radius family.
- Fully rounded pills are reserved for compact tags, status labels, and filter chips.
- Do not mix many unrelated corner styles on the same screen.
- Use icons to reinforce meaning, not replace essential labels.

## Components

### Buttons

A screen should normally have one visually dominant primary action. Secondary actions use the secondary or outline treatment. Destructive actions require explicit labels and, when consequences are substantial, a confirmation step.

### Cards and research panels

Cards must have a visible purpose: framework summary, evidence group, experiment, comparison, evaluation, or saved prompt. Provide a heading when the content cannot be understood from surrounding context alone.

### Inputs and editors

Labels remain visible. Placeholder text is an example or hint, not the only label. Prompt editors and long-form text areas must support comfortable reading, selection, and copying.

### Evidence and status

Clearly distinguish facts, observations, unknown observations, possibilities, theories, and conclusions when the workflow uses those categories. Uncertainty must be visible rather than silently converted into certainty.

### Focus and keyboard behavior

Every interactive element must have a visible focus indicator. Dialogs must trap focus while open and return focus to the initiating control when closed. Keyboard order must follow visual and logical order.

## Do's and Don'ts

### Do

- Preserve the existing token-based light and dark themes.
- Prefer clear hierarchy over visual novelty.
- Explain why a score, warning, recommendation, or framework result was produced.
- Keep research evidence close to the conclusion it supports.
- Make important actions reversible where possible.
- Provide useful empty, loading, error, and partial-data states.
- Test contrast, keyboard navigation, responsive layouts, and text scaling.
- Record deliberate design changes rather than allowing agent-generated drift.

### Don't

- Do not invent new colors, fonts, radius scales, or shadows for a single screen.
- Do not hide uncertainty, provenance, or contradictory evidence.
- Do not use color alone to communicate meaning.
- Do not place destructive actions beside routine navigation without separation.
- Do not generate dense dashboard clutter merely because many metrics exist.
- Do not replace explanatory labels with unexplained icons.
- Do not use animation that delays reading or makes the interface harder to track.
- Do not treat desktop layout as the mobile layout with smaller text.
