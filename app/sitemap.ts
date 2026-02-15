import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/constants";
import {
  getServiceSlugs,
  getPortfolioSlugs,
  getPostSlugs,
} from "@/lib/sanity";

/** Required for static export (output: "export") */
export const dynamic = "force-static";

/** Encode slug for URL so sitemap XML is valid (spaces, colons, etc.) */
function urlSegment(slug: string): string {
  return encodeURIComponent(slug);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = BASE_URL.replace(/\/$/, "");

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/services/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/blog/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
  ];

  let serviceSlugs: string[] = [];
  let portfolioSlugs: string[] = [];
  let postSlugs: string[] = [];

  try {
    [serviceSlugs, portfolioSlugs, postSlugs] = await Promise.all([
      getServiceSlugs(),
      getPortfolioSlugs(),
      getPostSlugs(),
    ]);
  } catch {
    // If Sanity fails at build, still return static pages so sitemap is readable
  }

  const serviceUrls: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${base}/services/${urlSegment(slug)}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const portfolioUrls: MetadataRoute.Sitemap = portfolioSlugs.map((slug) => ({
    url: `${base}/portfolio/${urlSegment(slug)}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const postUrls: MetadataRoute.Sitemap = postSlugs.map((slug) => ({
    url: `${base}/blog/${urlSegment(slug)}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...serviceUrls, ...portfolioUrls, ...postUrls];
}
