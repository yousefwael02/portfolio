# Sanity Studio

This folder contains the CMS Studio for the portfolio. It is intentionally isolated from the public React application so content administration can be deployed and secured independently.

## Setup

1. Create a Sanity project at https://www.sanity.io/manage.
2. Copy `.env.example` to `.env`.
3. Set `SANITY_STUDIO_PROJECT_ID` to the project ID and leave `SANITY_STUDIO_DATASET` as `production` unless a separate dataset is needed.
4. Install dependencies with `npm install` from this folder.
5. Run `npm run dev` to open the Studio locally.
6. Sign in with the administrator account and create the singleton documents `profile` and `siteSettings`.

## Content workflow

- Unpublished Sanity documents are drafts and are not returned by the public frontend query.
- Projects also have `isArchived` and `isVisible` controls. The public query must require `!isArchived && isVisible`.
- Project and content order is controlled with `displayOrder`.
- Technologies are reusable documents referenced by projects and experience entries.
- Images and the resume are uploaded through Sanity and delivered through Sanity's asset pipeline.

## Public project query rule

The frontend should use a query equivalent to:

```groq
*[
  _type == "project" &&
  !(_id in path("drafts.**")) &&
  isVisible == true &&
  isArchived != true
] | order(displayOrder asc, startDate desc)
```

## Validation

Run `npm run typecheck` for schema/config type checking and `npm run build` to verify that the Studio can be bundled for deployment.