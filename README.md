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
- `/privacy`: explanation of the actual app/contact data flows.
- `/login` and `/admin`: protected administration.
- Unknown paths: a helpful 404 view.

`/home#features`, `#how-it-works`, `#screenshots`, `#faq` and `#download` remain available. Known application paths are rewritten to the client app. The build also emits `404.html` for Vercel, so missing routes can use the branded view with an HTTP 404 response instead of a catch-all HTTP 200. This HTTP status behavior needs the hosting platform; the standalone Vite preview server still uses its own SPA fallback.

## Merchant applications

The public form always prepares a mailto draft in the visitor's own email program, as requested by Bart. It also shows the application text for copying. The visitor reviews and sends it; the website does not claim delivery. Fields survive returning from the draft. The form never calls the email endpoint.

`api/send-merk.ts` remains available as an optional Vercel function. GET reports only whether direct email is configured; POST validates input before using server-side SMTP. The live project already has stored SMTP variables, but their deliverability has not been tested. No test emails were sent. These existing settings are not used by the public form and have not been changed.

## Images and fonts

The app images in `public/images/app` are real screenshots from the new iOS version, optimized to WebP. The site labels this as a preview because the redesign is in TestFlight. Font files and their OFL licenses are local in `public/fonts`.

Brand images are 160px WebP thumbnails, matched to the source URL fingerprint. New or changed image URLs fall back to the live source. Refresh cached thumbnails with `npm run refresh-brand-images`; this maintenance command requires Python 3 and Pillow and public Supabase configuration. It never writes source URLs or credentials to the manifest. The site build itself does not need Python.

`public/social-card.svg` is the editable sharing-card source; `social-card.png` is its browser-rendered 1200 × 630 export. The favicon and logo use the existing Kortio artwork.

## Hosting

This checkout is linked to the existing Vercel project `kortiowebsite`, scope `bartmimos-projects`, serving `kortio.app` and `www.kortio.app`. Its existing production public Supabase configuration was verified against the local project and successfully read 49 active brands. Git pushes to `main` automatically publish production; other branches create previews.

The old local Vercel link referred to a duplicate project, `kortio-landing-page`, and has been corrected. Do not commit `.env`, `.env.local` or `.vercel`.
