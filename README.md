# Kortio website

React + Vite website for kortio.app. Public pages share the blue/mint design system in `index.css`; administration keeps its existing data workflows.

## Run locally

Use Node.js 24 (the Vercel project uses 24.x).

```sh
npm ci
npm run dev
```

The existing ignored `.env` contains the public Supabase configuration. For a fresh checkout copy `.env.example` to `.env` and enter the project URL and public publishable/anon key. Never put a service-role key in a `VITE_` variable.

```sh
npm run typecheck
npm test
npm run build
npm run preview
```

## Pages

- `/` and `/home`: app introduction, real app preview, live offers and FAQ.
- `/merken`: active brands, category/search filters, alphabetical sorting and code copying.
- `/merk-toevoegen`: merchant application form.
- `/kortingscode-gebruiken`: practical guide to applying codes, conditions and common problems.
- `/privacy`: explanation of the actual app/contact data flows.
- `/login` and `/admin`: protected administration.
- Unknown paths: a helpful 404 view.

The build prerenders all public routes, login, the admin loading state and the branded 404 into their own HTML files. Each page serves its own metadata before JavaScript runs. The same React app hydrates that HTML, so the interactive design is maintained. The build reads only the existing public Supabase catalog; it fails if that read fails instead of publishing an empty catalog. Browser visits refresh the catalog from Supabase, including expiry filtering.

`npm run preview` serves these actual HTML files locally using the same explicit routes as Vercel, returns 404 for unknown paths, and redirects `/home` to `/`. Existing `/home#…` links retain their fragment through the redirect. Internal navigation uses `/#…` directly. Login, admin and privacy carry noindex in their HTML; login/admin/privacy/API also have hosting headers. Admin remains protected by the existing authentication flow.

The sitemap is generated from the indexable route list in `scripts/routes.mjs`. It does not include search-query variants, private routes or invented change frequencies, priorities or last-modified dates. `npm run check:seo` checks the generated HTML, metadata, structured data, actual catalog cards, sitemap and Vercel rewrites. These checks also run automatically at the end of every build.

## Merchant applications

The public form always prepares a mailto draft in the visitor's own email program, as requested by Bart. It also shows the application text for copying. The visitor reviews and sends it; the website does not claim delivery. Fields survive returning from the draft.

There is no server-side mail endpoint. The former `api/send-merk.ts` was removed on 26 October 2026: it let anyone send mail through Kortio's SMTP account to any address (review KW-01). The SMTP/MAIL variables in Vercel are no longer used.

## Images and fonts

The app images in `public/images/app` are real screenshots from the new iOS version, optimized to WebP. The site labels this as a preview because the redesign is in TestFlight. Font files and their OFL licenses are local in `public/fonts`.

Brand images are 160px WebP thumbnails, matched to the source URL fingerprint. New or changed image URLs fall back to the live source. Refresh cached thumbnails with `npm run refresh-brand-images`; this maintenance command requires Python 3 and Pillow and public Supabase configuration. It never writes source URLs or credentials to the manifest. The site build itself does not need Python.

`public/social-card.svg` is the editable sharing-card source; `social-card.png` is its browser-rendered 1200 × 630 export. The favicon and logo use the existing Kortio artwork.

## Hosting

This checkout is linked to the existing Vercel project `kortiowebsite`, scope `bartmimos-projects`, serving `kortio.app` and `www.kortio.app`. Its existing production public Supabase configuration was verified against the local project and successfully read 49 active brands. Git pushes to `main` automatically publish production; other branches create previews.

The old local Vercel link referred to a duplicate project, `kortio-landing-page`, and has been corrected. Do not commit `.env`, `.env.local` or `.vercel`.

## SEO maintenance

Canonical URLs, sharing URLs, robots and sitemap all use `https://www.kortio.app`, matching the established live domain. The apex domain `kortio.app` permanently redirects to `www.kortio.app` (308), configured on the existing Vercel project domain. Preserve that direction to avoid a redirect loop. The old `/home` path permanently redirects to `/`.

Metadata and JSON-LD live in `components/SEO.tsx` and `lib/seo.ts`. The homepage describes the app and website without invented ratings. Other indexable pages have WebPage/CollectionPage and breadcrumb data. Existing FAQ schema is descriptive; Kortio is not eligible for Google's restricted FAQ rich results. No rich-result or ranking outcome is promised.

The HTML catalog is a snapshot at build time. Visitors and JavaScript-rendering crawlers refresh from the live API; rebuilding refreshes the static snapshot. Rebuild after significant offer changes. Do not claim expired/unchecked discounts always work. Search Console should use `https://www.kortio.app/sitemap.xml` and the canonical www URLs for inspection.
