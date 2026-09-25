# Phase 2: Design Tokens and Component Patterns

## Visual Direction

The visual language is a high-contrast technical portfolio: near-black surfaces, warm off-white content, restrained blue-green signals, and a typographic system that feels engineered rather than corporate. The interface should feel editorial and precise, with visual emphasis on real project evidence.

## Color Tokens

```css
:root {
  --color-ink: #101820;
  --color-ink-soft: #1c2933;
  --color-paper: #f5f3ee;
  --color-paper-muted: #e8e5dd;
  --color-text: #f5f3ee;
  --color-text-muted: #aab7bc;
  --color-text-dark: #17232a;
  --color-accent: #8ee0c4;
  --color-accent-strong: #54c6a2;
  --color-warning: #f0bd72;
  --color-danger: #f08080;
  --color-border: #3a4b54;
  --color-focus: #f0bd72;
}
```

Use `--color-ink` for the main canvas and `--color-paper` for occasional light editorial bands. Body text on dark surfaces must meet 4.5:1 contrast. Accent color is for actions and status, never the sole indicator of meaning.

## Typography

- Display and headings: `Archivo`, 500-700.
- Body and interface text: `Space Grotesk`, 400-600.
- Body size: 16px minimum.
- Long-form measure: 60-72 characters per line.
- Use sentence case for labels and CTAs.
- Do not use viewport-scaled font sizes or negative letter spacing.

## Spacing and Shape

```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-24: 96px;
  --radius-sm: 4px;
  --radius-md: 8px;
}
```

Use a 4/8px rhythm. Cards are framed tools for repeated content, not containers for whole page sections. Keep radii at 8px or less.

## Components

### Buttons

- Primary: filled accent background, dark text, 44px minimum height.
- Secondary: transparent surface with visible border.
- Text links: reserved for low-emphasis navigation and inline references.
- Include an icon only when it clarifies an external link, download, or directional action.
- Hover and focus transitions are 150-250ms and never change layout bounds.

### Project Card

- Stable media aspect ratio.
- Title, one-sentence summary, status, and technology labels.
- Entire card can link to the case study, with one visible focus target.
- Do not show a live link or repository control when its value is absent.

### Status Badge

- Use text plus color or border, never color alone.
- Published and ongoing may use accent; archived content is hidden from public listing.

### Form Field

- Visible label, associated input, helpful error text, and invalid state.
- Preserve entered values after recoverable errors.
- Submit button enters a processing state and prevents duplicate submission.

## Motion Rules

- Use a single entrance stagger for project grids and small reveal transitions for sections.
- Duration: 300-450ms for entrance, 150-250ms for interaction feedback.
- Do not use parallax for essential content.
- Under reduced motion, skip transforms and render content in its final state.

## Accessibility Rules

- Visible focus ring uses `--color-focus` with sufficient contrast.
- Decorative icons use `aria-hidden="true"`.
- Standalone icon buttons have an accessible name.
- Keyboard order follows visual order.
- Color is never the only status signal.
- Error summaries link to invalid fields when multiple fields fail.

## Icon Direction

Use one consistent SVG icon family, preferably Lucide or Heroicons. Use icons for external links, downloads, menu, close, and directional actions; do not use emoji as interface icons.