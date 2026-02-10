import Link from "next/link";
import type { SiteSettings, StatItem } from "@/lib/types";

export function Hero({
  site,
  stats,
  heroTitle = "Full-service home repair & maintenance on Koh Samui",
  heroSubtitle = "Electrical, plumbing, AC, and every kind of home work — with professional craftsmen. 24-hour service.",
}: {
  site: SiteSettings;
  stats: StatItem[];
  heroTitle?: string;
  heroSubtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-teal-50/40">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(13,148,136,0.12),transparent)]" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight animate-fade-in-up">
            {heroTitle}
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-slate-600 animate-fade-in-up animate-delay-1">
            {heroSubtitle}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-6 animate-fade-in-up animate-delay-2">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <span className="block text-2xl sm:text-3xl font-bold text-teal-600">{s.value}</span>
                <span className="text-sm text-slate-500">{s.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-4 animate-fade-in-up animate-delay-3">
            <a
              href={`tel:${site.phoneRaw}`}
              className="inline-flex items-center justify-center bg-teal-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-teal-700 transition-colors shadow-lg shadow-teal-600/25"
            >
              Call now {site.phone}
            </a>
            <Link
              href="#services"
              className="inline-flex items-center justify-center bg-white text-slate-700 px-6 py-3 rounded-xl font-medium border border-slate-200 hover:border-teal-300 hover:bg-teal-50/50 transition-colors"
            >
              View all services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
