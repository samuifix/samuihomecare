# Samui Construction — Website

A fast, SEO-friendly website for home repair and maintenance services on Koh Samui. Built with **Next.js** (latest), **Tailwind CSS**, **Sanity.io** (headless CMS), and static export for shared hosting.

## Features

- **Fast loading**: Static HTML/CSS/JS (SSG), minimal JS, optimized fonts
- **Shared hosting**: `output: 'export'` — upload the `out` folder to any static host
- **Sanity.io**: Content stored in Sanity Cloud; fetched at build time via API and baked into static HTML
- **SEO**: Meta tags, Open Graph, Twitter cards, JSON-LD (LocalBusiness), `sitemap.xml`, `robots.txt`
- **Modern UI**: Teal/slate palette, DM Sans font, hover effects, light fade-in animations
- **English content**: All copy and mock data in English (editable in Sanity or `lib/data.ts` fallback)

## Sanity.io setup

1. **Create a Sanity project** at [sanity.io](https://sanity.io) and note your **Project ID** and **Dataset** (e.g. `production`).

2. **Configure the Next.js app**  
   In `.env.local` set (หรือมีอยู่แล้วจากที่ตั้งค่าไว้):
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id   # จาก manage.sanity.io → เลือก project → API
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_token                     # จาก Manage → API → Tokens (สำหรับ dataset แบบ private หรือ rate limit สูงขึ้น)
   ```
   **สำคัญ:** อย่า commit ไฟล์ `.env.local` หรือแชร์ Token (ไฟล์นี้ถูก ignore ใน git อยู่แล้ว)

3. **Run the Studio** (to edit content in the cloud):
   ```bash
   cd studio
   npm install
   # Set env: SANITY_STUDIO_PROJECT_ID and SANITY_STUDIO_DATASET, or use .env with NEXT_PUBLIC_* from step 2
   npm run dev
   ```
   Open the URL shown (e.g. `http://localhost:3333`), log in with your Sanity account, and create:
   - **Site settings** (one document): name, phone, email, address, stats, etc.
   - **Service** documents
   - **Why us** documents
   - **Review** documents
   - **Portfolio item** documents
   - **Category** documents

4. **Build the website**  
   From the project root: `npm run build`. The build will fetch content from Sanity and generate static HTML. If Sanity is not configured or the API fails, the site falls back to mock data in `lib/data.ts`.

## Commands

```bash
# Install (project root)
npm install

# Development (project root)
npm run dev
# → http://localhost:3000

# Production build (static export)
npm run build
# → static files in ./out
```

## Deploy to shared hosting

1. Run `npm run build`.
2. Upload the entire **`out`** folder to your host (via FTP, cPanel File Manager, etc.).
3. Point your domain to the folder that contains `index.html` (often `public_html` or `www`).

No Node.js or server process is required — plain HTML, CSS, and JS only. Content is fixed at build time (from Sanity or fallback data).

## Project structure

- `app/` — Next.js App Router: `layout.tsx`, `page.tsx`, `globals.css`
- `components/` — Header, Footer, Hero, Services, Categories, WhyUs, Reviews, Portfolio, Contact, Newsletter
- `lib/data.ts` — Fallback mock data (used when Sanity is not configured or fetch fails)
- `lib/sanity.ts` — Sanity client, GROQ queries, `getPageData()` (cached per request)
- `lib/types.ts` — TypeScript types for page data
- `studio/` — Sanity Studio: schemas (siteSettings, service, whyUs, review, portfolioItem, category)
- `public/` — Static assets; `robots.txt`, `sitemap.xml` copied to `out` on build

## Customize

- **Content**: Edit in Sanity Studio (see above) or, for fallback only, `lib/data.ts`.
- **SEO**: Update `metadata` and `baseUrl` in `app/layout.tsx`, and `public/sitemap.xml` / `public/robots.txt` with your real domain.
