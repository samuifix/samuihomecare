import Link from "next/link";
import type { CategoryItem } from "@/lib/types";

export function Categories({ categories }: { categories: CategoryItem[] }) {
  return (
    <section className="py-12 sm:py-16 bg-slate-100/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">
          Browse by category
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((c) => (
            <Link
              key={c.name}
              href={c.href}
              className="rounded-xl bg-white border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 hover:border-teal-300 hover:text-teal-700 hover:bg-teal-50/50 transition-colors"
            >
              {c.name} <span className="text-slate-400">({c.count})</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
