import Link from "next/link";
import type { SiteSettings, ServiceItem } from "@/lib/types";
import { ServicesList } from "./ServicesList";

export function Services({
  site,
  services,
}: {
  site: SiteSettings;
  services: ServiceItem[];
}) {
  const sectionTitle = site.servicesSectionTitle ?? "Our services";
  const sectionSubtitle = site.servicesSectionSubtitle ?? "Full-service home repair and maintenance with professional craftsmen";

  return (
    <section id="services" className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">{sectionTitle}</h2>
          <p className="mt-2 text-slate-600 max-w-2xl mx-auto">
            {sectionSubtitle}
          </p>
          <Link
            href="/services/"
            className="inline-block mt-4 text-teal-600 font-medium hover:text-teal-700"
          >
            View all services →
          </Link>
        </div>
        <ServicesList site={site} services={services} />
      </div>
    </section>
  );
}
