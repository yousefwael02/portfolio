# Phase 2: Responsive Layout Plan

## Breakpoints

Use content-driven breakpoints rather than device-specific assumptions:

- Small: 375px minimum supported width.
- Medium: 640px and 768px layout transitions.
- Large: 1024px two-column layouts.
- Wide: 1440px max-width and spacing refinement.

## Global Rules

- Set a readable max content width of approximately 1180px.
- Use fluid horizontal gutters: 20px small, 32px medium, 48px large.
- Prevent horizontal overflow from tags, long URLs, and project metadata.
- Keep fixed-format media in stable aspect-ratio boxes.
- Never let sticky navigation cover focused content or form errors.

## Page Behavior

### Header

- Small: logo and menu button; navigation opens as a full-width panel.
- Medium: compact inline navigation when it fits.
- Large: inline navigation with persistent contact CTA.

### Home

- Small: single-column hero, stacked CTAs, one-column project cards.
- Medium: hero remains single-column; project grid becomes two columns.
- Large: hero can use a text-plus-evidence composition; project grid uses three columns.

### Projects

- Small: one card per row, metadata wraps naturally.
- Medium: two cards per row.
- Large: three cards per row with stable image ratios.
- Filters wrap to multiple rows and remain keyboard accessible.

### Project Detail

- Small: all metadata stacks above the case-study content.
- Medium: metadata becomes a two-column definition list.
- Large: use a main content column with a narrow metadata rail.

### About and Services

- Small: biography, timeline, and service items stack vertically.
- Medium: timeline and service content use two-column layouts where readable.
- Large: preserve generous text measure and use asymmetry only when it improves scanning.

### Contact

- Small: form fields span the available width and feedback appears directly below the relevant field.
- Medium and large: form and contact context can sit side by side.
- Never place labels only in placeholders.

## Responsive QA Matrix

Validate each primary page at:

- 375px portrait
- 768px portrait
- 1024px landscape
- 1440px desktop

At every width, verify:

- No horizontal scrolling.
- Headings and buttons fit their containers.
- Focus remains visible.
- Long project titles and technology labels wrap cleanly.
- Images do not crop away the subject or create layout shift.
- Reduced-motion mode still exposes all content.

## Phase 2 Completion Checklist

- [x] Sitemap and page outline defined.
- [x] Structural wireframes defined.
- [x] Design tokens and component patterns defined.
- [x] Responsive layout and QA plan defined.
- [x] Recruiter and client conversion paths defined.