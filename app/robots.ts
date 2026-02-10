import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/constants";

/** Force static generation so robots.txt works with output: "export" */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const base = (BASE_URL ?? "https://samuihomecare.com").replace(/\/$/, "");
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/studio/"] },
      { userAgent: "Googlebot", allow: "/", disallow: ["/api/", "/studio/"] },
      { userAgent: "Bingbot", allow: "/", disallow: ["/api/", "/studio/"] },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
