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

`/sitemap.xml` and `/robots.txt` are served by the Vercel functions `api/sitemap.ts` and `api/robots.ts`, which read published Sanity content on request. The sitemap includes published project slugs and excludes drafts, hidden, and archived content. URLs use `VITE_SITE_URL`, or the request host when it is unset. The Vercel rewrite serves client-side routes such as `/projects/classpilot` on direct visits.

## Phase status

The shared shell and responsive navigation are connected to Sanity. Home, About, Projects, project case studies, Services, and Contact render published CMS content. Project filtering, page metadata, structured data, crawler files, and missing-content states are implemented. Resume and project images use available Sanity assets when uploaded; the seeded content currently relies on its resume URL and generated media treatments because those uploads are still pending.

The contact form posts to the Vercel `/api/contact` function. Configure `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `CONTACT_RECIPIENT_EMAIL`, `UPSTASH_REDIS_REST_URL`, and `UPSTASH_REDIS_REST_TOKEN` in Vercel before enabling production submissions. Resend requires a verified sender domain. Upstash Redis backs a per-IP hashed limit of five submissions per hour. Use `npx vercel dev` to run the Vercel API function locally; the Vite-only dev server does not provide `/api` routes.

Vercel Web Analytics records page views once it is enabled for the project in the Vercel dashboard (Project → Analytics). It is cookieless, and query strings and URL fragments are stripped before anything is sent. Three custom events measure engagement: `Project Link Click` (project slug and link type), `Resume Download`, and `Contact Form Submit` (success or error only). No contact-form content is sent to analytics. Custom events require a Vercel Pro plan; on Hobby only page views are recorded. In local development the script logs events to the console instead of sending them.

Content updates need no redeploy. Pages fetch published content from Sanity's CDN at runtime, so a publish appears on the next page load, and open tabs refetch when the visitor returns after five minutes or more. The sitemap and robots responses are cached on Vercel's CDN for ten minutes, so new or removed projects reach crawlers within about ten minutes.