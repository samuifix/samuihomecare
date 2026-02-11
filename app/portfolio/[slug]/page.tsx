import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPortfolioBySlug } from "@/lib/sanity";
import { BASE_URL, SITE_NAME } from "@/lib/constants";

/** Required for output: "export" — must be first export so Vercel detects it */
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

export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPortfolioBySlug(slug);
  if (!item) return { title: "Not found" };

  const path = `/portfolio/${slug}/`;
  const canonical = `${BASE_URL.replace(/\/$/, "")}${path}`;
  const rawDescription = item.excerpt || `${item.title}. Portfolio project by ${SITE_NAME} on Koh Samui.`;
  const description = rawDescription.trim().slice(0, 160) || undefined;

  const primaryImage = item.heroImageUrl || item.imageUrl;
  const ogImages = primaryImage
    ? [{ url: primaryImage, width: 1200, height: 630, alt: item.imageAlt || item.heroImageAlt || item.title }]
    : undefined;

  return {
    title: item.title,
    description,
    alternates: { canonical },
    robots: "index, follow",
    openGraph: {
      type: "website",
      url: canonical,
      siteName: SITE_NAME,
      title: item.title,
      description: description ?? "",
      locale: "en_US",
      ...(ogImages?.length ? { images: ogImages } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description: description ?? "",
      ...(primaryImage ? { images: [primaryImage] } : {}),
    },
  };
}

function PortfolioJsonLd({
  slug,
  title,
  excerpt,
  imageUrl,
  galleryUrls,
  location,
}: {
  slug: string;
  title: string;
  excerpt: string;
  imageUrl?: string;
  galleryUrls?: string[];
  location?: string;
}) {
  const base = BASE_URL.replace(/\/$/, "");
  const url = `${base}/portfolio/${slug}/`;
  const allImages = imageUrl
    ? galleryUrls?.length
      ? [imageUrl, ...galleryUrls]
      : [imageUrl]
    : galleryUrls?.length
      ? galleryUrls
      : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    description: excerpt,
    url,
    ...(allImages?.length ? { image: allImages } : {}),
    publisher: { "@type": "Organization", name: SITE_NAME },
    ...(location ? { contentLocation: { "@type": "Place", name: location } } : {}),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

export default async function PortfolioSinglePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getPortfolioBySlug(slug);

  if (!item) notFound();

  const heroUrl = item.heroImageUrl || item.imageUrl;
  const heroAlt = item.heroImageUrl ? (item.heroImageAlt || item.title) : (item.imageAlt ?? item.title);
  const hasGallery = Array.isArray(item.gallery) && item.gallery.length > 0;

  return (
    <>
      <PortfolioJsonLd
        slug={slug}
        title={item.title}
        excerpt={item.excerpt}
        imageUrl={heroUrl || item.imageUrl}
        galleryUrls={item.gallery?.map((g) => g.url)}
        location={item.location}
      />

      {/* Hero image — full-bleed */}
      {heroUrl && (
        <header className="relative w-full aspect-[21/9] min-h-[240px] bg-slate-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroUrl}
            alt={heroAlt}
            className="absolute inset-0 w-full h-full object-cover"
            sizes="100vw"
            fetchPriority="high"
          />
        </header>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <Link
          href="/#portfolio"
          className="text-teal-600 hover:text-teal-700 text-sm font-medium mb-6 inline-block"
        >
          ← Back to portfolio
        </Link>

        <article className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-6 sm:p-8">
            <span className="text-xs font-medium text-teal-600 uppercase tracking-wider">{item.category}</span>
            <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900">{item.title}</h1>
            {item.excerpt && <p className="mt-3 text-lg text-slate-600">{item.excerpt}</p>}

            {(item.location || item.workType || item.duration || item.review) && (
              <dl className="mt-6 py-4 px-4 rounded-xl bg-slate-50 border border-slate-100 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                  {item.location && (
                    <>
                      <dt className="text-sm font-medium text-slate-500">Location</dt>
                      <dd className="text-slate-900">{item.location}</dd>
                    </>
                  )}
                  {item.workType && (
                    <>
                      <dt className="text-sm font-medium text-slate-500">Work type</dt>
                      <dd className="text-slate-900">{item.workType}</dd>
                    </>
                  )}
                  {item.duration && (
                    <>
                      <dt className="text-sm font-medium text-slate-500">Duration</dt>
                      <dd className="text-slate-900">{item.duration}</dd>
                    </>
                  )}
                </div>
                {item.review && (
                  <div className="pt-2 border-t border-slate-200">
                    <dt className="text-sm font-medium text-slate-500 mb-1">Review</dt>
                    <dd className="text-slate-700 italic">&ldquo;{item.review}&rdquo;</dd>
                  </div>
                )}
              </dl>
            )}

            {item.body && (
              <div className="mt-8 pt-6 border-t border-slate-100 prose prose-slate max-w-none text-slate-700 whitespace-pre-wrap">
                {item.body}
              </div>
            )}
          </div>
        </article>

        {/* Gallery */}
        {hasGallery && (
          <section className="mt-12" aria-label="Project gallery">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Gallery</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none p-0 m-0">
              {item.gallery!.map((img, i) => (
                <li key={i} className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.url}
                    alt={img.alt || `${item.title} — image ${i + 1}`}
                    className="w-full aspect-[4/3] object-cover"
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}
