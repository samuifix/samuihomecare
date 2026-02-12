import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getServiceBySlug, getServiceSlugs, getRelatedServices } from "@/lib/sanity";
import { BASE_URL, SITE_NAME, SITE_PHONE_RAW } from "@/lib/constants";
import type { ServiceCardItem } from "@/lib/types";

/** Fallback when Sanity is unavailable at build (e.g. Vercel). Add new slugs when you add services. */
const FALLBACK_SLUGS = [
  "electrical",
  "plumbing",
  "aircon",
  "construction",
  "renovation",
  "cleaning",
  "emergency",
  "welding",
  "painting",
  "toilet-replacement",
  "tree-cutting",
  "garden-care",
];

/** Required for output: "export" — must list all service paths to pre-render */
export async function generateStaticParams() {
  try {
    const slugs = await getServiceSlugs();
    const list = Array.isArray(slugs) && slugs.length > 0 ? slugs : FALLBACK_SLUGS;
    return list.map((slug) => ({ slug }));
  } catch {
    return FALLBACK_SLUGS.map((slug) => ({ slug }));
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: "Not found" };

  const canonical = `${BASE_URL}/services/${slug}/`;
  const rawDescription =
    service.short ||
    service.description ||
    `${service.title || "Service"} on Koh Samui. Professional home repair and maintenance.`;
  const description =
    (typeof rawDescription === "string" ? rawDescription : "").trim().slice(0, 160) ||
    "Professional home repair and maintenance on Koh Samui.";
  const ogImages = service.imageUrl
    ? [{ url: service.imageUrl, width: 1200, height: 630, alt: service.title }]
    : undefined;

  return {
    title: service.title,
    description,
    alternates: { canonical },
    robots: "index, follow",
    openGraph: {
      type: "website",
      url: canonical,
      siteName: SITE_NAME,
      title: service.title,
      description,
      locale: "en_US",
      ...(ogImages?.length ? { images: ogImages } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: service.title,
      description: description ?? "",
      ...(service.imageUrl ? { images: [service.imageUrl] } : {}),
    },
  };
}

function ServiceJsonLd({
  slug,
  title,
  short,
  description,
  imageUrl,
}: {
  slug: string;
  title: string;
  short: string;
  description?: string;
  imageUrl?: string;
}) {
  const url = `${BASE_URL}/services/${slug}/`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    description: description ?? short,
    url,
    ...(imageUrl ? { image: imageUrl } : {}),
    provider: { "@type": "LocalBusiness", name: SITE_NAME },
    areaServed: { "@type": "Place", name: "Koh Samui, Thailand" },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8">
      <h2 className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-2">
        {title}
      </h2>
      <div className="mt-3 text-slate-700 leading-relaxed whitespace-pre-wrap">
        {children}
      </div>
    </section>
  );
}

function RelatedCard({ s }: { s: ServiceCardItem }) {
  const href = `/services/${s.slug}/`;
  return (
    <Link
      href={href}
      className="block rounded-xl border border-slate-200 bg-white p-4 hover:border-teal-200 hover:shadow transition"
    >
      <span className="text-2xl" aria-hidden>{s.icon}</span>
      <h3 className="mt-2 font-semibold text-slate-900">{s.title}</h3>
      {s.priceLabel && <p className="mt-1 text-sm text-teal-700">{s.priceLabel}</p>}
      <span className="mt-2 inline-block text-sm text-teal-600">View details →</span>
    </Link>
  );
}

export default async function ServiceSinglePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [service, related] = await Promise.all([
    getServiceBySlug(slug),
    getRelatedServices(slug, 4),
  ]);

  if (!service) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <ServiceJsonLd
        slug={slug}
        title={service.title}
        short={service.short}
        description={service.description}
        imageUrl={service.imageUrl}
      />
      <Link
        href="/services/"
        className="text-teal-600 hover:text-teal-700 text-sm font-medium mb-6 inline-block"
      >
        ← Back to all services
      </Link>
      <article className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm">
        {service.imageUrl && (
          <div className="aspect-video bg-slate-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={service.imageUrl}
              alt={service.imageAlt ?? service.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        )}
        <div className="p-6 sm:p-8">
          <span className="text-3xl" aria-hidden>
            {service.icon}
          </span>
          <h1 className="mt-3 text-2xl sm:text-3xl font-bold text-slate-900">
            {service.title}
          </h1>
          {service.short && (
            <p className="mt-2 text-lg text-slate-600">{service.short}</p>
          )}
          {service.points?.length > 0 && (
            <ul className="mt-4 space-y-2 text-slate-600">
              {service.points.map((point, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-teal-500 mt-0.5">•</span>
                  {point}
                </li>
              ))}
            </ul>
          )}

          {service.body && (
            <Section title="Service details">{service.body}</Section>
          )}
          {service.pricingOverview && (
            <Section title="Rates & pricing">{service.pricingOverview}</Section>
          )}
          {service.travelCostOverview && (
            <Section title="Travel & call-out cost">
              {service.travelCostOverview}
            </Section>
          )}
          {service.termsOverview && (
            <Section title="Terms of service">
              {service.termsOverview}
            </Section>
          )}

          <div className="mt-10 pt-6 border-t border-slate-100">
            {service.cta === "Call now" ? (
              <a
                href={`tel:${SITE_PHONE_RAW}`}
                className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-white font-medium hover:bg-teal-700 transition-colors"
              >
                Call now
              </a>
            ) : (
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-white font-medium hover:bg-teal-700 transition-colors"
              >
                Request a quote
              </Link>
            )}
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="mt-16 pt-12 border-t border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Related services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {related.map((s) => (
              <RelatedCard key={s.id} s={s} />
            ))}
          </div>
          <Link
            href="/services/"
            className="inline-block mt-6 text-teal-600 font-medium hover:text-teal-700"
          >
            View all services →
          </Link>
        </section>
      )}
    </div>
  );
}
