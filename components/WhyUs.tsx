import type { WhyUsItem } from "@/lib/types";

const icons = [
  "👷",
  "🕐",
  "📍",
  "💰",
  "✅",
  "⭐",
];

export function WhyUs({ whyUs }: { whyUs: WhyUsItem[] }) {
  return (
    <section id="why-us" className="py-16 sm:py-24 bg-slate-50 animate-section-in animate-delay-3">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Why choose us</h2>
          <p className="mt-2 text-slate-600 max-w-2xl mx-auto">
            Reasons our customers trust us with their homes
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
          {whyUs.map((item, i) => (
            <div
              key={item.title}
              className="rounded-2xl bg-white border border-slate-200 p-6 hover-lift"
            >
              <span className="text-2xl" aria-hidden>{icons[i % icons.length]}</span>
              <h3 className="mt-3 text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-slate-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
