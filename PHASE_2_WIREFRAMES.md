# Phase 2: Wireframe Brief

These are structural wireframes for implementation. They define hierarchy and behavior, not final visual polish.

## Shared Shell

```text
[YOUSEF WAEL]                         [Work] [About] [Services] [Contact]
------------------------------------------------------------------------
                          page content
------------------------------------------------------------------------
[email] [LinkedIn] [GitHub]                         [Let's work together]
```

The header remains compact and becomes sticky only if it does not obscure focused content. The footer repeats the contact route and professional links.

## Home

```text
[availability]
H1: Yousef Wael
H2: Full Stack Developer
Value proposition: I turn ideas into reliable software.
[View my projects] [Let's work together]

Featured work
[project card] [project card] [project card]

Core strengths
[backend] [full-stack] [APIs] [databases] [cloud]

Experience signal
[QuickStor] [Teaching Assistant]

Services
[Full-stack] [Backend and APIs] [Deployment and DevOps]

Final contact CTA
```

## About

```text
H1: About
[profile image or intentional placeholder] [bio and availability]
[Download resume]

Experience timeline
[QuickStor] [Cairo University]

Education
[Cairo University]

Selected strengths and technologies
```

## Projects Index

```text
H1: Selected work
Short framing paragraph
[technology/category filter, only when useful]

[cover] Class Pilot       [Published] [React] [FastAPI]
[cover] EGX Insights     [Published] [React] [FastAPI]
[cover] ChestVision      [Archived or hidden]
```

Project cards must have one clear interaction target and must not show disabled or broken link buttons.

## Project Detail

```text
Breadcrumb: Work / Class Pilot
H1: Class Pilot
Summary and status
[cover image]

Problem                         Solution
Role                            Technologies
Outcome / results

[live project] [repository, when available]
Related work
```

On mobile, the metadata block precedes the long-form content and links remain visible without requiring horizontal scrolling.

## Services

```text
H1: Services
Short positioning statement

[service name] [outcome] [CTA]
[service name] [outcome] [CTA]
[service name] [outcome] [CTA]

Final contact CTA
```

## Contact

```text
H1: Let's work together
Short invitation and recipient email

Name       [                         ]
Email      [                         ]
Subject    [                         ]
Message    [                         ]
           [Send message]

[success or error feedback]
[LinkedIn] [GitHub] [Instagram]
```

## Interaction Notes

- Every page has exactly one H1.
- Heading levels follow H1 -> H2 -> H3 without skips.
- Focus rings remain visible on links, buttons, menu controls, filters, and form fields.
- Motion reveals content but never carries meaning or blocks access to content.
- `prefers-reduced-motion` renders the completed layout immediately.