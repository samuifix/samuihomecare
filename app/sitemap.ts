import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/constants";
import {
  getServiceSlugs,
  getPortfolioSlugs,
  getPostSlugs,
} from "@/lib/sanity";

/** Required for static export (output: "export") */
export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = BASE_URL.replace(/\/$/, "");

  const [serviceSlugs, portfolioSlugs, postSlugs] = await Promise.all([
    getServiceSlugs(),
    getPortfolioSlugs(),
    getPostSlugs(),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/services/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/blog/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
  ];

  const serviceUrls: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${base}/services/${slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const portfolioUrls: MetadataRoute.Sitemap = portfolioSlugs.map((slug) => ({
    url: `${base}/portfolio/${slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const postUrls: MetadataRoute.Sitemap = postSlugs.map((slug) => ({
    url: `${base}/blog/${slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...serviceUrls, ...portfolioUrls, ...postUrls];
}
