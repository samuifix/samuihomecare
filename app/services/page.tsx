import type { Metadata } from "next";
import Link from "next/link";
import { getServicesForAllPage } from "@/lib/sanity";
import { BASE_URL, SITE_NAME } from "@/lib/constants";
import type { ServiceCardItem } from "@/lib/types";

const DEFAULT_DESCRIPTION =
  "Browse all home repair and maintenance services on Koh Samui: electrical, plumbing, AC, construction, toilet replacement, tree cutting, garden care, and more. Transparent pricing and 24/7 support.";

export const metadata: Metadata = {
  title: "All services",
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: `${BASE_URL}/services/` },
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: `${BASE_URL}/services/`,
    siteName: SITE_NAME,
    title: "All services | Samui Home Care",
    description: DEFAULT_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "All services | Samui Home Care",
    description: DEFAULT_DESCRIPTION,
  },
};

function StarRating({ rating }: { rating: number }) {
  const value = Math.min(5, Math.max(0, rating));
  const full = Math.floor(value);
  const hasHalf = value % 1 >= 0.5;
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`Rating: ${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className="text-amber-400" aria-hidden>
          {i <= full ? "★" : i === full + 1 && hasHalf ? "★" : "☆"}
        </span>
      ))}
    </span>
  );
}

function ServiceCard({ s }: { s: ServiceCardItem }) {
  const href = s.href && s.href !== "#services" ? s.href : `/services/${s.slug}/`;
  return (
    <Link
      href={href}
      className="group block rounded-2xl border border-slate-200 bg-white overflow-hidden hover:border-teal-200 hover:shadow-lg transition-all"
    >
      {s.imageUrl ? (
        <div className="aspect-[4/3] bg-slate-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={s.imageUrl}
            alt={s.imageAlt ?? s.title}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="aspect-[4/3] bg-slate-100 flex items-center justify-center text-5xl">
          {s.icon}
        </div>
      )}
      <div className="p-5">
        <h2 className="text-lg font-semibold text-slate-900 group-hover:text-teal-700 transition-colors">
          {s.title}
        </h2>
        {s.short && <p className="mt-1 text-sm text-slate-600 line-clamp-2">{s.short}</p>}
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
          {s.priceLabel && (
            <span className="font-medium text-teal-700">{s.priceLabel}</span>
          )}
          {s.rating != null && (
            <span className="flex items-center gap-1">
              <StarRating rating={s.rating} />
              <span className="text-slate-500">{s.rating.toFixed(1)}</span>
            </span>
          )}
          {s.servicedCount != null && (
            <span className="text-slate-500">
              Serviced {s.servicedCount.toLocaleString()} times
            </span>
          )}
        </div>
        <p className="mt-3 text-teal-600 font-medium text-sm group-hover:text-teal-700">
          View details →
        </p>
      </div>
    </Link>
  );
}

function AllServicesJsonLd({ services }: { services: ServiceCardItem[] }) {
  const itemListElement = services.slice(0, 20).map((s, i) => ({
    "@type": "ListItem" as const,
    position: i + 1,
    item: {
      "@type": "Service" as const,
      name: s.title,
      url: `${BASE_URL}/services/${s.slug}/`,
    },
  }));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "All services",
    description: DEFAULT_DESCRIPTION,
    url: `${BASE_URL}/services/`,
    numberOfItems: services.length,
    itemListElement,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function AllServicesPage() {
  const services = await getServicesForAllPage();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <AllServicesJsonLd services={services} />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">All services</h1>
        <p className="mt-2 text-slate-600 max-w-2xl mx-auto">
          Home repair and maintenance on Koh Samui. Choose a service for details, pricing, and to
          request a quote.
        </p>
      </div>
      {services.length === 0 ? (
        <p className="text-slate-500 text-center py-12">
          No services yet. Add services in Sanity Studio or run the seed script.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <ServiceCard key={s.id} s={s} />
          ))}
        </div>
      )}
    </div>
  );
}
