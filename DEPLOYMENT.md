# Deploy with Sanity (Vercel)

To use Sanity as CMS and have **blog pages (and all content) generated at build time**, set these environment variables in Vercel.

## 1. Vercel Environment Variables

In **Vercel Dashboard** → your project → **Settings** → **Environment Variables**, add:

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | From [Sanity Manage](https://manage.sanity.io) → your project → **API** | Yes |
| `NEXT_PUBLIC_SANITY_DATASET` | Usually `production` | Yes |
| `SANITY_API_TOKEN` | From Sanity → API → Tokens (optional; for private datasets) | No |
| `NEXT_PUBLIC_SITE_URL` | Your site URL, e.g. `https://samuihomecare.vercel.app` | Recommended |

Apply to **Production**, **Preview**, and **Development** if you use preview deploys.

## 2. Build settings (static export)

- **Build Command:** `npm run build`
- **Output Directory:** `out` (required for `output: "export"`)

## 3. Sanity CORS

In [Sanity Manage](https://manage.sanity.io) → your project → **API** → **CORS origins**, add:

- `https://your-app.vercel.app`
- `https://*.vercel.app` (for preview deployments)

## 4. Content before first deploy

- Run the seed script locally once so Sanity has content: `npm run seed:sanity`
- In [Sanity Studio](https://your-project.sanity.studio) (or `npm run dev` in `/studio`), **Publish** the documents
- Then deploy on Vercel; the build will fetch from Sanity and generate blog, portfolio, and services pages

After that, every deploy will use the latest content from Sanity at build time.
