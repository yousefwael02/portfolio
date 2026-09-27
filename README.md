# Yousef Wael Portfolio

React, TypeScript, Vite, and Tailwind frontend for the portfolio. The Sanity Studio is maintained separately in `sanity/`.

## Local development

1. Install Node.js 20 or later.
2. Copy `.env.example` to `.env` and configure the public Sanity project ID, dataset, and canonical production origin.
3. Run `npm install` from the repository root.
4. Run `npm run dev` and open the local URL printed by Vite.

## Available scripts

- `npm run dev`: start the development server.
- `npm run typecheck`: run TypeScript checks.
- `npm run lint`: run ESLint.
- `npm run build`: typecheck and create the production build.
- `npm run preview`: serve the production build locally.

The frontend reads published content from the public Sanity dataset without a token. Local CORS is configured for `http://localhost:5173` and `http://127.0.0.1:5173`. When a production domain is selected, allow it in Sanity with `npx sanity cors add https://your-domain --no-credentials` and set `VITE_SITE_URL` in the hosting environment.

The production build creates `sitemap.xml` and a matching `robots.txt` when `VITE_SITE_URL` and the Sanity project ID are configured. The sitemap includes published project slugs and excludes drafts, hidden, and archived content. The Vercel rewrite serves client-side routes such as `/projects/classpilot` on direct visits.

## Phase status

The shared shell and responsive navigation are connected to Sanity. Home, About, Projects, project case studies, Services, and Contact render published CMS content. Project filtering, page metadata, structured data, crawler files, and missing-content states are implemented. Resume and project images use available Sanity assets when uploaded; the seeded content currently relies on its resume URL and generated media treatments because those uploads are still pending.

Contact form delivery, spam protection, rate limiting, analytics, and CMS-triggered content refresh are deferred to the integrations phase.