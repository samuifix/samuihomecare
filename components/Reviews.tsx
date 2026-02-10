import type { ReviewItem } from "@/lib/types";

export function Reviews({ reviews }: { reviews: ReviewItem[] }) {
  return (
    <section id="reviews" className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">What our clients say</h2>
          <p className="mt-2 text-slate-600 max-w-2xl mx-auto">
            Feedback from customers who trust us to take care of their homes
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((r) => (
            <blockquote
              key={r.name + r.date}
              className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 hover-lift"
            >
              <div className="flex items-center gap-2 text-amber-500">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <span key={i} aria-hidden>★</span>
                ))}
                <span className="text-slate-500 text-sm ml-1">{r.rating}/5</span>
              </div>
              <p className="mt-3 text-slate-700">&ldquo;{r.text}&rdquo;</p>
              <footer className="mt-4 flex items-center justify-between text-sm">
                <cite className="not-italic font-semibold text-slate-900">{r.name}</cite>
                <span className="text-slate-500">{r.category} · {r.date}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
