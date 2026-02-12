"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { SiteSettings, ServiceItem } from "@/lib/types";

export function ServicesList({
  site,
  services,
}: {
  site: SiteSettings;
  services: ServiceItem[];
}) {
  const [mounted, setMounted] = useState(false);
  const list = services ?? [];
  useEffect(() => setMounted(true), []);

  // จำนวน placeholder คงที่ เพื่อให้ server กับ client เรนเดอร์เหมือนกันเสมอ (แก้ hydration mismatch)
  const PLACEHOLDER_COUNT = 9;
  if (!mounted) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: PLACEHOLDER_COUNT }, (_, i) => (
          <div
            key={`ph-${i}`}
            className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 h-[322px] animate-pulse"
            aria-hidden
          >
            <div className="h-8 w-8 rounded bg-slate-200" />
            <div className="mt-3 h-6 w-32 bg-slate-200 rounded" />
            <div className="mt-2 h-4 w-full bg-slate-200 rounded" />
            <div className="mt-4 space-y-2">
              <div className="h-3 bg-slate-200 rounded w-full" />
<div className="h-3 bg-slate-200 rounded w-2/3" />
                <div className="h-3 bg-slate-200 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
      {list.map((s, index) => (
        <article
          key={s?.id ? String(s.id) : `service-${index}`}
          className="group rounded-2xl border border-slate-200 bg-slate-50/50 p-6 hover-lift hover:border-teal-200 hover:bg-white"
        >
          <span className="text-3xl" aria-hidden>{s.icon ?? ""}</span>
          <h3 className="mt-3 text-xl font-semibold text-slate-900">{s.title ?? ""}</h3>
          <p className="mt-1 text-slate-600 text-sm">{s.short ?? ""}</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {(Array.isArray(s.points) ? s.points.slice(0, 4) : []).map((point, i) => (
              <li key={`${index}-${i}-${String(point).slice(0, 20)}`} className="flex items-start gap-2">
                <span className="text-teal-500 mt-0.5">•</span>
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-5">
            {"cta" in s && s.cta === "Call now" ? (
              <a
                href={`tel:${site.phoneRaw}`}
                className="text-teal-600 font-medium hover:text-teal-700 transition-colors"
              >
                Call now →
              </a>
            ) : (
              <Link
                href={s.href && s.href !== "#services" ? s.href : `/services/${s.id}/`}
                className="text-teal-600 font-medium hover:text-teal-700 transition-colors"
              >
                View details →
              </Link>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
