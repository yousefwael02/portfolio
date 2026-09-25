# Phase 2: Information Architecture

## Product Direction

The portfolio should let a recruiter understand the professional profile in under one minute, while giving a potential client enough evidence to start a conversation. The primary path is:

`Home -> Projects -> Project detail -> Contact`

The secondary path is:

`Home -> About -> Experience / Education -> Resume`

## Sitemap

```text
/
|-- /about
|-- /projects
|   |-- /projects/:slug
|-- /services
|-- /contact
`-- /resume (external document or CMS-managed download)
```

## Navigation

Desktop navigation:

- Work: `/projects`
- About: `/about`
- Services: `/services`
- Contact: `/contact`
- Persistent text CTA: `Let's work together` -> `/contact`

Mobile navigation:

- Use the same destinations in the same order.
- Open from a labeled menu button.
- Trap focus while open, close on destination selection, Escape, or close button.
- Return focus to the menu button after closing.

## Page Responsibilities

### Home

Establish identity and route visitors to the two primary actions.

Content order:

1. Name, title, value proposition, availability, and primary CTAs.
2. Selected project preview.
3. Core strengths and technologies.
4. Short experience signal.
5. Services preview.
6. Professional links and final contact CTA.

### About

Provide context and credibility: biography, location, availability, resume, experience, education, and selected strengths.

### Projects

Provide a scannable, CMS-driven index of published projects. Each card includes title, summary, cover image, status, and technology labels. Archived projects are excluded from the public listing.

### Project Detail

Use the existing Section 8 content model as the minimum case-study structure:

- Summary
- Problem
- Solution
- Role
- Technologies
- Outcome
- Links when available

Section 9 remains optional enrichment and is not required for the first design pass.

### Services

Explain the three service offers through client outcomes, with a clear route to contact.

### Contact

Show the recipient context, email, social links, and a form for name, email, subject, and message. Include clear success, validation, and recoverable error states in the design.

## CTA Hierarchy

1. Primary: `View my projects` -> `/projects`
2. Secondary: `Let's work together` -> `/contact`
3. Supporting: `Download resume` and project live/repository links

## Content States

- Loading: preserve layout with stable skeleton blocks.
- Empty projects: explain that projects are being prepared and show contact CTA.
- Not found: clear message, link back to projects, and no dead-end page.
- Archived project: never render in public listing or featured content.
- Missing optional link or image: omit the control or use a neutral media placeholder without broken buttons.
- Contact success: confirm delivery without clearing context before the user sees confirmation.
- Contact error: retain entered values and identify the next action.

## Phase 2 Exit Check

- All public routes have a defined purpose.
- Recruiter and client paths both reach relevant evidence and contact.
- Navigation works as a keyboard-first information hierarchy.
- CMS visibility rules are reflected in the public structure.