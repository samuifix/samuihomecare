/** Dedicated file so Vercel's static export always detects generateStaticParams. */
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const { getPortfolioSlugs } = await import("@/lib/sanity");
    const slugs = await getPortfolioSlugs();
    const list = Array.isArray(slugs)
      ? slugs.filter((s): s is string => typeof s === "string" && s.length > 0)
      : [];
    return list.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}
