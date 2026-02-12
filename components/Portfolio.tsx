import Link from "next/link";
import type { PortfolioItem } from "@/lib/types";

export function Portfolio({ portfolio }: { portfolio: PortfolioItem[] }) {
  return (
    <section id="portfolio" className="py-16 sm:py-24 bg-slate-50 animate-section-in animate-delay-5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Recent projects</h2>
          <p className="mt-2 text-slate-600 max-w-2xl mx-auto">
            Real work from customers who trust us
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 stagger-children">
          {portfolio.map((p) => {
            const href = p.slug ? `/portfolio/${p.slug}/` : undefined;
            const content = (
              <>
                <div className="aspect-video bg-gradient-to-br from-teal-100 to-slate-200 flex items-center justify-center">
                  {p.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.imageUrl} alt={p.imageAlt ?? p.title ?? ""} className="w-full h-full object-cover" loading="lazy" />
                  ) : (
                    <span className="text-5xl opacity-60">🏠</span>
                  )}
                </div>
                <div className="p-5">
                  <span className="text-xs font-medium text-teal-600 uppercase tracking-wider">
                    {p.category}
                  </span>
                  <h3 className="mt-1 text-lg font-semibold text-slate-900 line-clamp-2">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 line-clamp-2">{p.excerpt}</p>
                </div>
              </>
            );
            return (
              <article
                key={p.id}
                className="rounded-2xl bg-white border border-slate-200 overflow-hidden hover-lift"
              >
                {href ? (
                  <Link href={href} className="block">
                    {content}
                  </Link>
                ) : (
                  content
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
