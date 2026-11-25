# Portfolio Website Implementation Plan

## 1. Project Objective

Build a polished, production-ready personal portfolio that presents professional experience, project case studies, services, skills, and contact information in a way that helps recruiters, clients, and collaborators evaluate the owner quickly and confidently.

The site will be public-facing, fast, responsive, accessible, and CMS-driven so its content can be updated without code changes or redeploys.

## Current Status

- Phase 1: Discovery and content planning — complete.
- Phase 2: Information architecture and design — complete.
- Phase 3: CMS implementation and schema setup — complete.
- Phase 4: Frontend foundation and shared layout — substantially complete.
- Phase 5: Public pages and content integration — implementation complete; content assets pending.
- Phase 6: Contact form, analytics, and integrations — implementation complete; production verification of contact delivery pending.
- Phases 7–8: Quality assurance, performance, deployment, and launch — not started.

The repository currently has a working React frontend, Sanity Studio schemas and seed content, routed public pages, CMS-backed published-content fetching, project filtering, SEO metadata, structured data, gallery rendering, CMS-managed skill groups, and loading, empty, and not-found states. ChestVision is now seeded as a public project, giving the launch content three visible projects. Remaining content work is limited to uploading images and the resume, then completing the final content review.

---

## 2. Recommended Technical Direction

Use the stack outlined in the project brief as the default implementation baseline:

- Frontend: React.js + TypeScript
- Styling: Tailwind CSS
- CMS: Sanity
- Media delivery: Sanity image pipeline / Cloudinary
- Email delivery: Resend
- Hosting: Vercel
- Analytics: Vercel Analytics or Plausible
- Version control: GitHub

This is a strong choice because it supports a performant marketing site, structured content editing, SEO-rich pages, and a modern deployment workflow without building a custom CMS.

---

## 3. Success Criteria

The portfolio is considered successful when:

- Public pages are responsive and work on mobile and desktop.
- Admin users can publish and manage content without changing code.
- Published projects have stable URLs and case-study pages.
- Draft or archived items do not appear publicly.
- The contact form validates properly and sends inquiries reliably.
- Core pages meet accessibility and performance targets.
- The site is live on a production domain with HTTPS.
- At least three complete project case studies are published before launch.

---

## 4. Delivery Approach

This build will follow a phased delivery model with short, testable milestones.

### Working principles

- Make content editable before styling the final polish.
- Validate accessibility and mobile responsiveness early.
- Keep CMS schemas simple and flexible enough for real content updates.
- Prefer reusable components and consistent data mapping.
- Treat launch as a product milestone, not a final endpoint.

---

## 5. Phase-by-Phase Implementation Plan

## Phase 1: Discovery and Content Planning

### Goal
Define the positioning, launch content, and structure before designing or building the site.

### Tasks

- Finalize professional positioning and target opportunities.
- Select the initial project set for launch.
- Gather project summaries, outcome metrics, screenshots, links, and screenshots.
- Prepare profile, experience, education, services, social links, and resume content.
- Decide the primary audience and messaging hierarchy.
- Confirm branding direction, tone, and preferred visual style.
- Validate the stack and deployment services.

### Deliverables

- Personal positioning statement
- Launch content list
- Initial project shortlist (minimum 3 strong projects)
- Content spreadsheet or CMS-ready data structure
- Final stack decision document

### Exit criteria

- Content model is clear and approved.
- Core content exists for home, about, projects, and contact.
- The project skeleton can be implemented without unclear content assumptions.

---

## Phase 2: Information Architecture and Design

### Goal
Define the user journeys, page structure, and design system before implementation.

### Tasks

- Map the site structure: home, about, projects, project detail, services, contact, resume.
- Define navigation patterns for desktop and mobile.
- Decide on CTA hierarchy and conversion paths.
- Create wireframes for primary screens.
- Establish the visual system: colors, typography, spacing, button styles, cards, and badges.
- Define content states: empty, loading, error, and not found.
- Design mobile-first responsive layouts.

### Deliverables

- Sitemap and page outline
- Wireframes or mockups
- Design tokens and component pattern guide
- Responsive layout plan

### Exit criteria

- Pages and content hierarchy are agreed.
- Reusable UI patterns are identified before coding.
- The design supports both recruiter and client evaluation paths.

---

## Phase 3: CMS Implementation and Schema Setup

### Goal
Create a secure content infrastructure that allows editing without coding.

### Tasks

- Set up the Sanity project and Studio.
- Create content schemas for:
  - profile
  - projects
  - skills
  - technologies
  - categories
  - experience
  - education
  - services
  - social links
  - site settings
- Add validation rules for required fields, URL format, and publish states.
- Configure image and document upload handling.
- Set draft, published, and archived states.
- Enable ordering, visibility, and SEO fields.
- Configure admin authentication and secure access.

### Deliverables

- CMS project and admin access
- Schema definitions
- Validation settings
- Content management workflow

### Exit criteria

- Admin can create, edit, publish, archive, and reorder content without touching code.
- Draft content is hidden from the public site.
- Content structures match the rest of the application.

---

## Phase 4: Frontend Foundation and Shared Layout

### Goal
Build the application shell and page infrastructure.

### Tasks

- Initialize the React.js app and project structure.
- Configure TypeScript, Tailwind, ESLint, and formatting rules.
- Build the app shell: header, footer, navigation, mobile menu, and layout components.
- Configure metadata and routing.
- Set up environment variables and production-safe config.
- Implement global styles and component primitives.
- Add responsive utilities, focus states, and accessibility defaults.

### Deliverables

- Working React.js app scaffold
- Shared shell and navigation
- Reusable primitives
- Base styling system

### Exit criteria

- App renders correctly on desktop and mobile.
- Navigation and spacing are consistent across pages.
- Accessibility baseline is in place.

---

## Phase 5: Public Pages and Content Integration

### Goal
Connect the CMS to real pages and render the portfolio content.

### Tasks

- Build home page with hero, CTA, featured projects, skills summary, and profile links.
- Build about page with biography, profile image, resume, and availability state.
- Build project listing page with cards, labels, and content filtering.
- Build project detail pages with gallery, summary, role, stack, results, and case-study layout.
- Build services page and experience/education sections.
- Add resume download link and safe external links.
- Implement SEO metadata and structured data for people and projects.
- Add sitemap, robots.txt, canonical URLs, and social metadata.

### Deliverables

- Fully rendered public pages
- CMS-connected content mapping
- Optimized SEO metadata
- Working project listing and detail experience

### Exit criteria

- All major public sections display real content cleanly.
- Missing optional fields do not cause broken UI.
- Metadata and content URLs are valid and stable.

### Current status

Implementation complete. Home, About, Projects, project detail, Services, and Contact pages are connected to published Sanity content. Project filtering, page metadata, structured data, crawler files, responsive navigation, missing-content states, optional project galleries, and CMS-managed skill groups are implemented. The contact page currently provides email and social links; the form and delivery workflow belong to Phase 6. Image and resume uploads remain content tasks.

---

## Phase 6: Contact Form, Analytics, and Integrations

### Goal
Enable outbound communication and production tracking while keeping privacy and security in mind.

### Tasks

- Build contact form with validation for required fields and email format.
- Add success and error states and duplicate-submit prevention.
- Integrate Resend or equivalent email delivery.
- Add rate limiting and spam protections.
- Configure analytics for page views and project engagement.
- Ensure no contact message content is sent to analytics.
- Add resume file upload and replacement workflow in CMS.
- Configure webhooks or revalidation for CMS-driven updates.

### Deliverables

- Contact backend and email flow
- Form validation and error handling
- Privacy-conscious analytics setup
- Content refresh workflow

### Exit criteria

- Valid inquiries are delivered and invalid submissions are handled gracefully.
- Analytics measures traffic without collecting private message content.
- CMS updates reflect in the site without code edits.

### Current status

In progress. The contact form UI and Vercel `/api/contact` endpoint are implemented with server-side Resend delivery, field validation, a honeypot, and a distributed Upstash rate limit. Production submissions require the Resend sender/recipient and Upstash Redis environment variables. Vercel Web Analytics is mounted app-wide with query strings and fragments stripped, and tracks `Project Link Click`, `Resume Download`, and `Contact Form Submit` (result only) as custom events; no message content is sent. Analytics must be enabled in the Vercel dashboard, and custom events need a Pro plan. CMS updates reach the site without a redeploy: pages read published Sanity content at runtime, open tabs refetch after five minutes away, and `sitemap.xml`/`robots.txt` are served by Vercel functions with a ten-minute CDN cache instead of being generated at build time. Remaining: verify contact delivery with production Resend and Upstash credentials.

---

## Phase 7: Quality Assurance and Performance

### Goal
Verify usability, reliability, accessibility, and production readiness.

### Tasks

- Test mobile, tablet, and desktop layouts.
- Test keyboard navigation and focus states.
- Review heading hierarchy, labels, and color contrast.
- Confirm not-found, loading, and error states.
- Validate broken or empty content handling.
- Run Lighthouse-like checks for performance and SEO.
- Test contact form edge cases and failure modes.
- Validate sitemap, social previews, and metadata output.

### Deliverables

- QA checklist and evidence
- Performance and accessibility review notes
- Issue log with fixes

### Exit criteria

- The app meets the project’s accessibility and performance targets.
- All critical flows work and no major UX issues remain.

---

## Phase 8: Deployment and Launch

### Goal
Ship the portfolio to production and publish the initial content set.

### Tasks

- Configure production environment variables.
- Deploy to Vercel.
- Attach custom domain and enforce HTTPS.
- Verify CMS access, deployment hooks, and content updates.
- Publish initial project case studies.
- Confirm analytics, contact delivery, and monitoring.
- Finalize resume and public profile links.
- Test the full live experience on production.

### Deliverables

- Live production site
- Custom domain and HTTPS
- Launch-ready CMS content
- Operational documentation

### Exit criteria

- Site is public and stable.
- Core professional content is live.
- Admin and public flows work in production.

---

## 6. Suggested Timeline

A realistic timeline for a solo build is 5 to 8 weeks depending on content readiness and review cycles.

### Week 1: Discovery and content planning
- Professional positioning
- Content collection
- Project selection
- Architecture decisions

### Week 2: Design and content model
- Wireframes
- Visual system
- CMS schema design

### Week 3: CMS setup and admin configuration
- Sanity setup
- Schemas and content permissions
- Content entry workflow

### Week 4: Frontend foundation and shared layout
- App shell
- Navigation
- Reusable component foundation

### Week 5: Public pages and project system
- Home, about, project pages
- Resume and social links
- CMS data integration

### Week 6: Contact, performance, and analytics
- Form backend
- Tracking
- Search and metadata

### Week 7: QA and optimization
- Accessibility checks
- Lighthouse review
- Fixes and polish

### Week 8: Launch and stabilization
- Production deploy
- Final content review
- Launch checklist and verification

---

## 7. Workstream Checklist

### Content
- [ ] Professional bio and title finalized
- [x] 3 or more launch-ready projects prepared
- [ ] Experience and education data captured
- [ ] Services text approved
- [ ] Resume file available
- [ ] Social links and contact details confirmed

### Technical
- [x] React.js app initialized
- [x] Tailwind and TypeScript configured
- [x] Sanity connected and content models created
- [x] Project listing and detail routing working
- [ ] Contact form validated and sending
- [x] Analytics configured
- [ ] Deployment pipeline complete

### Quality
- [ ] Responsive checks passed
- [ ] Keyboard accessibility tested
- [ ] SEO metadata verified
- [ ] Error and empty states handled
- [ ] Performance improvements applied
- [ ] Final launch checklist signed off

---

## 8. Risks and Mitigations

### Risk: Content is incomplete or inconsistent
Mitigation: finalize content in a shared spreadsheet before styling and page development.

### Risk: Too much time is spent on design before content is ready
Mitigation: build a functional structure first, then refine visual quality after content is approved.

### Risk: CMS and frontend schema drift
Mitigation: define schema and types together to keep content mapping predictable.

### Risk: Contact integration fails in production
Mitigation: use tested email service and verify delivery in staging before launch.

### Risk: Performance issues from large media
Mitigation: optimize images, use responsive sizes, and lazy-load below-the-fold media.

---

## 9. Definition of Done

The project is complete when all of the following are true:

- Public website is built and responsive.
- CMS supports real content management.
- At least three projects are published.
- Contact form sends inquiries correctly.
- SEO metadata and social previews are valid.
- Live deployment is configured and working on a custom domain.
- Accessibility and performance checks pass at the agreed baseline.
- The content owner can update the portfolio without engineering work.

---

## 10. Immediate Next Step

Complete the remaining Phase 5 content tasks:

1. Upload and verify project cover/gallery images and profile media through Sanity.
2. Upload and verify the resume through Sanity.
3. Review and approve the final public content set.

Import the updated seed so ChestVision is public in the Sanity dataset, then verify contact delivery with production Resend and Upstash credentials once deployed.
