"use client";

import Link from "next/link";
import { useState } from "react";
import type { SiteSettings } from "@/lib/types";

export function HeaderMobileMenu({ site }: { site: SiteSettings }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="md:hidden p-3 text-slate-600 min-touch"
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 flex flex-col gap-1 absolute left-0 right-0 top-16 z-50">
          <Link href="/services/" className="min-touch text-slate-700 font-medium py-3" onClick={() => setOpen(false)}>All services</Link>
          <Link href="/#services" className="min-touch text-slate-700 font-medium py-3" onClick={() => setOpen(false)}>Services</Link>
          <Link href="/#why-us" className="min-touch text-slate-700 font-medium py-3" onClick={() => setOpen(false)}>Why Us</Link>
          <Link href="/#reviews" className="min-touch text-slate-700 font-medium py-3" onClick={() => setOpen(false)}>Reviews</Link>
          <Link href="/#portfolio" className="min-touch text-slate-700 font-medium py-3" onClick={() => setOpen(false)}>Portfolio</Link>
          <Link href="/blog/" className="min-touch text-slate-700 font-medium py-3" onClick={() => setOpen(false)}>Blog</Link>
          <Link href="/#contact" className="min-touch text-slate-700 font-medium py-3" onClick={() => setOpen(false)}>Contact</Link>
          <a href={`tel:${site.phoneRaw}`} className="min-touch bg-teal-600 text-white rounded-lg text-center font-medium mt-2">Call {site.phone}</a>
        </div>
      )}
    </>
  );
}
