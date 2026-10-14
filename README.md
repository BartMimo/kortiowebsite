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

`api/send-merk.ts` runs as a Vercel function. GET reports only whether direct email is configured. POST validates the application before using the server-side SMTP configuration. The standalone Vite server does not run this function.

If email is unavailable, the form prepares a mailto draft and shows the application text for copying. It does not claim the message was sent. Fields survive returning from the draft. When SMTP is configured in Vercel, the same form sends through the existing email endpoint, checks the JSON success response, and shows confirmed receipt. No test emails are sent by the automated tests.

For direct delivery configure `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM` and `MAIL_TO` in Vercel. These are server-only variables. In the current review no SMTP variables were present; the email-program route is therefore the active route.

## Images and fonts

The app images in `public/images/app` are real screenshots from the new iOS version, optimized to WebP. The site labels this as a preview because the redesign is in TestFlight. Font files and their OFL licenses are local in `public/fonts`.

Brand images are 160px WebP thumbnails, matched to the source URL fingerprint. New or changed image URLs fall back to the live source. Refresh cached thumbnails with `npm run refresh-brand-images`; this maintenance command requires Python 3 and Pillow and public Supabase configuration. It never writes source URLs or credentials to the manifest. The site build itself does not need Python.

`public/social-card.svg` is the editable sharing-card source; `social-card.png` is its browser-rendered 1200 × 630 export. The favicon and logo use the existing Kortio artwork.

## Hosting

This checkout is linked to the existing Vercel project `kortio-landing-page`, scope `bartmimos-projects`. Public Supabase variables have been set for preview and production. Deploy a non-main branch for a preview; release production when the design is approved. Do not commit `.env` or `.vercel`.
