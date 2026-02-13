import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug } from "@/lib/sanity";
import { PortableText } from "@/components/PortableText";
import { BASE_URL, SITE_NAME } from "@/lib/constants";

/** Fallback slugs when Sanity is not configured — must match POST_SINGLE_FALLBACK in lib/sanity.ts */
const BLOG_FALLBACK_SLUGS = [
  "choosing-air-conditioning-koh-samui",
  "electrical-safety-villa",
  "home-maintenance-tips-koh-samui",
];

// Must be first export — required by Next.js for output: "export"
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const { getPostSlugs } = await import("@/lib/sanity");
    const slugs = await getPostSlugs();
    const list = Array.isArray(slugs) ? slugs.filter((s): s is string => typeof s === "string" && s.length > 0) : [];
    if (list.length === 0) return BLOG_FALLBACK_SLUGS.map((slug) => ({ slug }));
    return list.map((slug) => ({ slug }));
  } catch {
    return BLOG_FALLBACK_SLUGS.map((slug) => ({ slug }));
  }
}

// Allow on-demand rendering for slugs not pre-built (e.g. new posts or when Sanity was unavailable at build)
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Not found" };

  const path = `/blog/${slug}`;
  const canonical = `${BASE_URL}${path}`;
  const description = post.excerpt || undefined;
  const ogImages = post.coverImageUrl
    ? [{ url: post.coverImageUrl, width: 1200, height: 630, alt: post.title }]
    : undefined;

  const openGraph: Metadata["openGraph"] = {
    type: "article",
    url: canonical,
    siteName: SITE_NAME,
    title: post.title,
    description,
    locale: "en_US",
    ...(post.publishedAt ? { publishedTime: post.publishedAt } : {}),
    ...(post.publishedAt ? { modifiedTime: post.publishedAt } : {}),
    ...(ogImages?.length ? { images: ogImages } : {}),
  };

  return {
    title: post.title,
    description,
    alternates: { canonical },
    robots: "index, follow",
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: description ?? "",
      ...(post.coverImageUrl ? { images: [post.coverImageUrl] } : {}),
    },
  };
}

function BlogPostJsonLd({
  slug,
  title,
  excerpt,
  publishedAt,
  coverImageUrl,
}: {
  slug: string;
  title: string;
  excerpt: string | null;
  publishedAt: string | null;
  coverImageUrl?: string;
}) {
  const url = `${BASE_URL}/blog/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: excerpt ?? title,
    url,
    ...(publishedAt ? { datePublished: publishedAt } : {}),
    ...(publishedAt ? { dateModified: publishedAt } : {}),
    publisher: { "@type": "Organization", name: SITE_NAME },
    ...(coverImageUrl ? { image: coverImageUrl } : {}),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

export default async function BlogSinglePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const dateStr = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <BlogPostJsonLd
        slug={slug}
        title={post.title}
        excerpt={post.excerpt}
        publishedAt={post.publishedAt}
        coverImageUrl={post.coverImageUrl}
      />
      <Link href="/blog" className="text-teal-600 hover:text-teal-700 text-sm font-medium mb-6 inline-block">
        ← Back to blog
      </Link>
      <article className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm">
        {post.coverImageUrl && (
          <div className="aspect-video bg-slate-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.coverImageUrl} alt={post.coverImageAlt ?? post.title} className="w-full h-full object-cover" loading="lazy" />
          </div>
        )}
        <div className="p-6 sm:p-8">
          {dateStr && <time className="text-sm text-slate-500" dateTime={post.publishedAt ?? undefined}>{dateStr}</time>}
          <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900">{post.title}</h1>
          {post.excerpt && <p className="mt-3 text-lg text-slate-600">{post.excerpt}</p>}
          {post.body && post.body.length > 0 && (
            <div className="mt-8 pt-6 border-t border-slate-100 prose prose-slate max-w-none">
              <PortableText value={post.body} />
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
