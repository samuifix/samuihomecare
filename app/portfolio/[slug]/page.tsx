import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPortfolioBySlug, getPortfolioSlugs } from "@/lib/sanity";
import { BASE_URL, SITE_NAME } from "@/lib/constants";

export async function generateStaticParams() {
  const slugs = await getPortfolioSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPortfolioBySlug(slug);
  if (!item) return { title: "Not found" };

  const path = `/portfolio/${slug}`;
  const canonical = `${BASE_URL}${path}`;
  const description = item.excerpt || undefined;
  const ogImages = item.imageUrl ? [{ url: item.imageUrl, width: 1200, height: 630, alt: item.title }] : undefined;

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
      description,
      locale: "en_US",
      ...(ogImages?.length ? { images: ogImages } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description: description ?? "",
      ...(item.imageUrl ? { images: [item.imageUrl] } : {}),
    },
  };
}

function PortfolioJsonLd({
  slug,
  title,
  excerpt,
  imageUrl,
}: {
  slug: string;
  title: string;
  excerpt: string;
  imageUrl?: string;
}) {
  const url = `${BASE_URL}/portfolio/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    description: excerpt,
    url,
    ...(imageUrl ? { image: imageUrl } : {}),
    publisher: { "@type": "Organization", name: SITE_NAME },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

export default async function PortfolioSinglePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getPortfolioBySlug(slug);

  if (!item) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <PortfolioJsonLd
        slug={slug}
        title={item.title}
        excerpt={item.excerpt}
        imageUrl={item.imageUrl}
      />
      <Link href="/#portfolio" className="text-teal-600 hover:text-teal-700 text-sm font-medium mb-6 inline-block">
        ← Back to portfolio
      </Link>
      <article className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm">
        {item.imageUrl && (
          <div className="aspect-video bg-slate-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.imageUrl} alt={item.imageAlt ?? item.title} className="w-full h-full object-cover" loading="lazy" />
          </div>
        )}
        <div className="p-6 sm:p-8">
          <span className="text-xs font-medium text-teal-600 uppercase tracking-wider">{item.category}</span>
          <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900">{item.title}</h1>
          {item.excerpt && <p className="mt-3 text-lg text-slate-600">{item.excerpt}</p>}
          {item.body && (
            <div className="mt-8 pt-6 border-t border-slate-100 prose prose-slate max-w-none text-slate-700 whitespace-pre-wrap">
              {item.body}
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
