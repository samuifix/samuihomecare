import { cache } from "react";
import type { PageData } from "./types";
import {
  site as fallbackSite,
  stats as fallbackStats,
  services as fallbackServices,
  whyUs as fallbackWhyUs,
  reviews as fallbackReviews,
  portfolio as fallbackPortfolio,
  categories as fallbackCategories,
} from "./data";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01";
const token = process.env.SANITY_API_TOKEN;

const SANITY_FETCH_TIMEOUT_MS = 10_000;

/** fetch with timeout so navigation never hangs if Sanity is slow/unreachable */
async function fetchWithTimeout(
  url: string,
  init: RequestInit & { timeoutMs?: number } = {}
): Promise<Response> {
  const { timeoutMs = SANITY_FETCH_TIMEOUT_MS, ...fetchInit } = init;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...fetchInit, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(id);
  }
}

/** Sanity HTTP API: no @sanity/client / rxjs dependency, works with static export and Turbopack */
async function sanityFetch<T>(query: string): Promise<T> {
  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`;
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetchWithTimeout(url, {
    method: "POST",
    headers,
    body: JSON.stringify({ query }),
    ...(process.env.NODE_ENV === "development" ? { cache: "no-store" as RequestCache } : { next: { revalidate: 60 } }),
  });
  if (!res.ok) throw new Error(`Sanity API ${res.status}`);
  const json = await res.json();
  return json.result as T;
}

const siteQuery = `*[_type == "siteSettings"][0] {
  name,
  tagline,
  phone,
  "phoneRaw": phoneRaw,
  whatsapp,
  line,
  lineId,
  email,
  address,
  addressNote,
  areas,
  hours,
  servicesSectionTitle,
  servicesSectionSubtitle
}`;

const statsQuery = `*[_type == "siteSettings"][0].stats[] {
  "value": value,
  "label": label
}`;

// เฉพาะเอกสารที่ Publish แล้ว เรียงตาม sortOrder แล้ว _createdAt
const servicesQuery = `*[_type == "service" && !(_id in path("drafts.**"))] | order(sortOrder asc, _createdAt asc) {
  "id": _id,
  "slug": coalesce(slug, _id),
  title,
  short,
  description,
  points,
  icon,
  href,
  cta
}`;

// All services for /services/ page (cards with price, rating, serviced count)
const servicesListPageQuery = `*[_type == "service" && !(_id in path("drafts.**"))] | order(sortOrder asc, _createdAt asc) {
  "id": _id,
  "slug": coalesce(slug, _id),
  title,
  short,
  description,
  points,
  icon,
  href,
  cta,
  "imageUrl": coalesce(image.asset->url, externalImageUrl),
  "imageAlt": image.alt,
  priceLabel,
  rating,
  servicedCount
}`;

const whyUsQuery = `*[_type == "whyUs"] | order(_createdAt asc) {
  title,
  description
}`;

const reviewsQuery = `*[_type == "review"] | order(date desc) {
  name,
  category,
  rating,
  text,
  date
}`;

const portfolioQuery = `*[_type == "portfolioItem"] | order(_createdAt asc) {
  "id": _id,
  "slug": coalesce(slug, _id),
  title,
  excerpt,
  category,
  "imageUrl": image.asset->url,
  "imageAlt": image.alt
}`;

const portfolioSlugsQuery = `*[_type == "portfolioItem"]{ "slug": coalesce(slug, _id) }.slug`;
const portfolioBySlugQuery = `*[_type == "portfolioItem" && (slug == $slug || _id == $slug)][0] {
  title,
  excerpt,
  category,
  "imageUrl": image.asset->url,
  "imageAlt": image.alt,
  "heroImageUrl": heroImage.asset->url,
  "heroImageAlt": heroImage.alt,
  "gallery": gallery[] {
    "url": asset->url,
    "alt": alt
  },
  body,
  location,
  workType,
  duration,
  review
}`;

const postSlugsQuery = `*[_type == "post"].slug`;
const postsListQuery = `*[_type == "post"] | order(publishedAt desc, _createdAt desc) {
  slug,
  title,
  excerpt,
  publishedAt,
  "coverImageUrl": coverImage.asset->url
}`;
const postBySlugQuery = `*[_type == "post" && slug == $slug][0] {
  title,
  excerpt,
  publishedAt,
  "coverImageUrl": coverImage.asset->url,
  "coverImageAlt": coverImage.alt,
  body[] {
    _type,
    style,
    children,
    _type == "image" => { "imageUrl": asset->url, "alt": alt }
  }
}`;

const serviceSlugsQuery = `*[_type == "service"]{ "slug": coalesce(slug, _id) }.slug`;
const serviceBySlugQuery = `*[_type == "service" && (slug == $slug || _id == $slug)][0] {
  title,
  short,
  description,
  points,
  icon,
  href,
  cta,
  "imageUrl": coalesce(image.asset->url, externalImageUrl),
  "imageAlt": image.alt,
  body,
  pricingOverview,
  travelCostOverview,
  termsOverview,
  priceLabel,
  rating,
  servicedCount
}`;

const categoriesQuery = `*[_type == "category"] | order(_createdAt asc) {
  name,
  count,
  href
}`;

const seoQuery = `*[_type == "seoSettings" && pageSlug == $slug][0] {
  metaTitle,
  metaDescription,
  metaKeywords,
  ogTitle,
  ogDescription,
  "ogImageUrl": ogImage.asset->url,
  twitterCard,
  twitterTitle,
  twitterDescription,
  canonicalUrl,
  robots
}`;

function mapService(s: {
  id: string;
  title: string | null;
  short: string | null;
  description: string | null;
  points: string[] | null;
  icon: string | null;
  href: string | null;
  cta?: string | null;
}) {
  return {
    id: s.id ?? "",
    title: s.title ?? "",
    short: s.short ?? "",
    description: s.description ?? "",
    points: Array.isArray(s.points) ? s.points : [],
    icon: s.icon ?? "🔧",
    href: s.href ?? "#services",
    ...(s.cta ? { cta: s.cta } : {}),
  };
}

/** Fetches all page data from Sanity. Falls back to mock data if not configured or fetch fails. */
async function getPageDataUncached(): Promise<PageData> {
  if (!projectId || !dataset) {
    return getFallbackData();
  }

  try {
    const [site, stats, servicesRaw, whyUs, reviews, portfolioRaw, categories] =
      await Promise.all([
        sanityFetch<Record<string, string> | null>(siteQuery),
        sanityFetch<{ value: string; label: string }[] | null>(statsQuery),
        sanityFetch<Parameters<typeof mapService>[0][] | null>(servicesQuery),
        sanityFetch<{ title: string; description: string }[] | null>(whyUsQuery),
        sanityFetch<{ name: string; category: string; rating: number; text: string; date: string }[] | null>(reviewsQuery),
        sanityFetch<{ id: string; title: string; excerpt: string; category: string; imageUrl?: string }[] | null>(portfolioQuery),
        sanityFetch<{ name: string; count: number; href: string }[] | null>(categoriesQuery),
      ]);

    const siteData = site && typeof site.name === "string";
    const services = Array.isArray(servicesRaw) ? servicesRaw.map(mapService) : null;
    const portfolio = Array.isArray(portfolioRaw)
      ? portfolioRaw.map((p) => ({
          id: p.id ?? "",
          slug: (p as { slug?: string }).slug ?? p.id ?? undefined,
          title: p.title ?? "",
          excerpt: p.excerpt ?? "",
          category: p.category ?? "",
          imageUrl: p.imageUrl ?? undefined,
          imageAlt: (p as { imageAlt?: string }).imageAlt ?? undefined,
        }))
      : null;

    if (
      siteData &&
      site?.name &&
      site?.phone &&
      site?.phoneRaw &&
      site?.email &&
      site?.address
    ) {
      return {
        site: {
          name: site.name,
          tagline: site.tagline ?? "",
          phone: site.phone,
          phoneRaw: site.phoneRaw,
          whatsapp: site.whatsapp ?? "",
          line: site.line ?? "",
          lineId: site.lineId ?? "",
          email: site.email,
          address: site.address,
          addressNote: site.addressNote ?? "",
          areas: site.areas ?? "",
          hours: site.hours ?? "",
          servicesSectionTitle: site.servicesSectionTitle ?? undefined,
          servicesSectionSubtitle: site.servicesSectionSubtitle ?? undefined,
        },
        stats: Array.isArray(stats) && stats.length > 0 ? stats : ([...fallbackStats] as { value: string; label: string }[]),
        services: services && services.length > 0 ? services : (fallbackServices as unknown as PageData["services"]),
        whyUs: Array.isArray(whyUs) && whyUs.length > 0 ? whyUs : (fallbackWhyUs as unknown as PageData["whyUs"]),
        reviews: Array.isArray(reviews) && reviews.length > 0 ? reviews : (fallbackReviews as unknown as PageData["reviews"]),
        portfolio: portfolio && portfolio.length > 0 ? portfolio : (fallbackPortfolio as unknown as PageData["portfolio"]),
        categories: Array.isArray(categories) && categories.length > 0 ? categories : (fallbackCategories as unknown as PageData["categories"]),
      };
    }
  } catch (_) {
    // Fall through to fallback
  }

  return getFallbackData();
}

// โหมด dev: ไม่ใช้ cache เพื่อให้ refresh แล้วเห็นข้อมูลจาก Sanity ทันที
export const getPageData =
  process.env.NODE_ENV === "development" ? getPageDataUncached : cache(getPageDataUncached);

export interface SanitySeo {
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImageUrl: string | null;
  twitterCard: string | null;
  twitterTitle: string | null;
  twitterDescription: string | null;
  canonicalUrl: string | null;
  robots: string | null;
}

async function getSeoUncached(slug: string): Promise<SanitySeo | null> {
  if (!projectId || !dataset) return null;
  try {
    const res = await fetchWithTimeout(
      `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ query: seoQuery, params: { slug } }),
        ...(process.env.NODE_ENV === "development" ? { cache: "no-store" as RequestCache } : { next: { revalidate: 60 } }),
      }
    );
    if (!res.ok) return null;
    const json = await res.json();
    const row = json.result as Record<string, unknown> | null;
    if (!row) return null;
    return {
      metaTitle: (row.metaTitle as string) ?? null,
      metaDescription: (row.metaDescription as string) ?? null,
      metaKeywords: (row.metaKeywords as string) ?? null,
      ogTitle: (row.ogTitle as string) ?? null,
      ogDescription: (row.ogDescription as string) ?? null,
      ogImageUrl: (row.ogImageUrl as string) ?? null,
      twitterCard: (row.twitterCard as string) ?? null,
      twitterTitle: (row.twitterTitle as string) ?? null,
      twitterDescription: (row.twitterDescription as string) ?? null,
      canonicalUrl: (row.canonicalUrl as string) ?? null,
      robots: (row.robots as string) ?? null,
    };
  } catch {
    return null;
  }
}

export const getSeo = process.env.NODE_ENV === "development" ? getSeoUncached : cache(getSeoUncached);

/** All service slugs for generateStaticParams (uses slug or _id) */
export async function getServiceSlugs(): Promise<string[]> {
  if (!projectId || !dataset) return [];
  try {
    const slugs = await sanityFetch<string[] | null>(serviceSlugsQuery);
    return Array.isArray(slugs) ? slugs.filter((s): s is string => typeof s === "string" && s.length > 0) : [];
  } catch {
    return [];
  }
}

/** All services for /services/ page (cards with price, rating, serviced count) */
export async function getServicesForAllPage(): Promise<import("./types").ServiceCardItem[]> {
  if (!projectId || !dataset) return [];
  try {
    const list = await sanityFetch<Record<string, unknown>[] | null>(servicesListPageQuery);
    if (!Array.isArray(list)) return [];
    return list
      .filter((r) => r && typeof r.title === "string")
      .map((r) => ({
        id: String(r.id ?? ""),
        slug: String(r.slug ?? r.id ?? ""),
        title: String(r.title),
        short: String(r.short ?? ""),
        points: Array.isArray(r.points) ? (r.points as string[]) : [],
        icon: String(r.icon ?? ""),
        href: String(r.href ?? "#services"),
        cta: r.cta ? String(r.cta) : undefined,
        imageUrl: r.imageUrl ? String(r.imageUrl) : undefined,
        imageAlt: r.imageAlt ? String(r.imageAlt) : undefined,
        priceLabel: r.priceLabel ? String(r.priceLabel) : undefined,
        rating: typeof r.rating === "number" ? r.rating : undefined,
        servicedCount: typeof r.servicedCount === "number" ? r.servicedCount : undefined,
      }));
  } catch {
    return [];
  }
}

/** Related services (exclude current slug, for single service page) */
export async function getRelatedServices(
  excludeSlug: string,
  limit: number = 4
): Promise<import("./types").ServiceCardItem[]> {
  const all = await getServicesForAllPage();
  return all.filter((s) => s.slug !== excludeSlug).slice(0, limit);
}

/** Single service by slug (for /services/[slug]) */
export async function getServiceBySlug(slug: string): Promise<import("./types").ServiceSingle | null> {
  if (!projectId || !dataset) return null;
  try {
    const res = await fetchWithTimeout(
      `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ query: serviceBySlugQuery, params: { slug } }),
        ...(process.env.NODE_ENV === "development" ? { cache: "no-store" as RequestCache } : { next: { revalidate: 60 } }),
      }
    );
    if (!res.ok) return null;
    const json = await res.json();
    const r = json.result as Record<string, unknown> | null;
    if (!r || !r.title) return null;
    return {
      title: String(r.title),
      short: String(r.short ?? ""),
      description: r.description ? String(r.description) : undefined,
      points: Array.isArray(r.points) ? (r.points as string[]) : [],
      icon: String(r.icon ?? ""),
      href: String(r.href ?? "#services"),
      cta: r.cta ? String(r.cta) : undefined,
      imageUrl: r.imageUrl ? String(r.imageUrl) : undefined,
      imageAlt: r.imageAlt ? String(r.imageAlt) : undefined,
      body: r.body ? String(r.body) : undefined,
      pricingOverview: r.pricingOverview ? String(r.pricingOverview) : undefined,
      travelCostOverview: r.travelCostOverview ? String(r.travelCostOverview) : undefined,
      termsOverview: r.termsOverview ? String(r.termsOverview) : undefined,
      priceLabel: r.priceLabel ? String(r.priceLabel) : undefined,
      rating: typeof r.rating === "number" ? r.rating : undefined,
      servicedCount: typeof r.servicedCount === "number" ? r.servicedCount : undefined,
    };
  } catch {
    return null;
  }
}

/** All portfolio slugs for generateStaticParams (uses slug or _id) */
export async function getPortfolioSlugs(): Promise<string[]> {
  if (!projectId || !dataset) return [];
  try {
    const slugs = await sanityFetch<string[] | null>(portfolioSlugsQuery);
    return Array.isArray(slugs) ? slugs.filter((s): s is string => typeof s === "string" && s.length > 0) : [];
  } catch {
    return [];
  }
}

/** Single portfolio by slug */
export async function getPortfolioBySlug(slug: string): Promise<import("./types").PortfolioSingle | null> {
  if (!projectId || !dataset) return null;
  try {
    const res = await fetchWithTimeout(
      `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ query: portfolioBySlugQuery, params: { slug } }),
        ...(process.env.NODE_ENV === "development" ? { cache: "no-store" as RequestCache } : { next: { revalidate: 60 } }),
      }
    );
    if (!res.ok) return null;
    const json = await res.json();
    const r = json.result as Record<string, unknown> | null;
    if (!r || !r.title) return null;
    const galleryRaw = r.gallery as { url?: string; alt?: string }[] | null | undefined;
    const gallery = Array.isArray(galleryRaw)
      ? galleryRaw
          .filter((g) => g && typeof g.url === "string" && g.url)
          .map((g) => ({ url: String(g.url), alt: g.alt ? String(g.alt) : undefined }))
      : undefined;

    return {
      title: String(r.title),
      excerpt: String(r.excerpt ?? ""),
      category: String(r.category ?? ""),
      imageUrl: r.imageUrl ? String(r.imageUrl) : undefined,
      imageAlt: r.imageAlt ? String(r.imageAlt) : undefined,
      heroImageUrl: r.heroImageUrl ? String(r.heroImageUrl) : undefined,
      heroImageAlt: r.heroImageAlt ? String(r.heroImageAlt) : undefined,
      gallery: gallery?.length ? gallery : undefined,
      body: r.body ? String(r.body) : undefined,
      location: r.location ? String(r.location) : undefined,
      workType: r.workType ? String(r.workType) : undefined,
      duration: r.duration ? String(r.duration) : undefined,
      review: r.review ? String(r.review) : undefined,
    };
  } catch {
    return null;
  }
}

/** All post slugs for generateStaticParams */
export async function getPostSlugs(): Promise<string[]> {
  if (!projectId || !dataset) return [];
  try {
    const slugs = await sanityFetch<string[] | null>(postSlugsQuery);
    return Array.isArray(slugs) ? slugs.filter((s): s is string => typeof s === "string" && s.length > 0) : [];
  } catch {
    return [];
  }
}

export interface PostListItem {
  slug: string;
  title: string;
  excerpt: string | null;
  publishedAt: string | null;
  coverImageUrl: string | null;
}

/** List of posts for blog index */
export async function getPostsList(): Promise<PostListItem[]> {
  if (!projectId || !dataset) return [];
  try {
    const list = await sanityFetch<PostListItem[] | null>(postsListQuery);
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

/** Single post by slug */
export async function getPostBySlug(slug: string): Promise<import("./types").PostSingle | null> {
  if (!projectId || !dataset) return null;
  try {
    const res = await fetchWithTimeout(
      `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ query: postBySlugQuery, params: { slug } }),
        ...(process.env.NODE_ENV === "development" ? { cache: "no-store" as RequestCache } : { next: { revalidate: 60 } }),
      }
    );
    if (!res.ok) return null;
    const json = await res.json();
    const r = json.result as Record<string, unknown> | null;
    if (!r || !r.title) return null;
    return {
      title: String(r.title),
      excerpt: (r.excerpt as string) ?? null,
      publishedAt: (r.publishedAt as string) ?? null,
      coverImageUrl: r.coverImageUrl ? String(r.coverImageUrl) : undefined,
      coverImageAlt: r.coverImageAlt ? String(r.coverImageAlt) : undefined,
      body: r.body as import("./types").PostBlock[] | undefined,
    };
  } catch {
    return null;
  }
}

function getFallbackData(): PageData {
  return {
    site: { ...fallbackSite },
    stats: [...fallbackStats],
    services: fallbackServices.map((s) => ({
      id: s.id,
      title: s.title,
      short: s.short,
      description: s.description,
      points: [...s.points],
      icon: s.icon,
      href: s.href,
      ...("cta" in s && s.cta ? { cta: s.cta } : {}),
    })),
    whyUs: fallbackWhyUs.map((w) => ({ title: w.title, description: w.description })),
    reviews: fallbackReviews.map((r) => ({ ...r })),
    portfolio: fallbackPortfolio.map((p) => ({
      id: String(p.id),
      title: p.title,
      excerpt: p.excerpt,
      category: p.category,
    })),
    categories: fallbackCategories.map((c) => ({ ...c })),
  };
}
