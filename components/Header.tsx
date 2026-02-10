import Link from "next/link";
import type { SiteSettings } from "@/lib/types";
import { HeaderMobileMenu } from "./HeaderMobileMenu";

export function Header({ site }: { site: SiteSettings }) {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link
          href="/"
          className="font-semibold text-slate-800 hover:text-teal-600 transition-colors"
        >
          {site.name}
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/services/"
            className="text-slate-600 hover:text-teal-600 transition-colors text-sm font-medium"
          >
            All services
          </Link>
          <Link
            href="/#services"
            className="text-slate-600 hover:text-teal-600 transition-colors text-sm font-medium"
          >
            Services
          </Link>
          <Link
            href="/#why-us"
            className="text-slate-600 hover:text-teal-600 transition-colors text-sm font-medium"
          >
            Why Us
          </Link>
          <Link
            href="/#reviews"
            className="text-slate-600 hover:text-teal-600 transition-colors text-sm font-medium"
          >
            Reviews
          </Link>
          <Link
            href="/#portfolio"
            className="text-slate-600 hover:text-teal-600 transition-colors text-sm font-medium"
          >
            Portfolio
          </Link>
          <Link
            href="/blog/"
            className="text-slate-600 hover:text-teal-600 transition-colors text-sm font-medium"
          >
            Blog
          </Link>
          <Link
            href="/#contact"
            className="text-slate-600 hover:text-teal-600 transition-colors text-sm font-medium"
          >
            Contact
          </Link>
          <a
            href={`tel:${site.phoneRaw}`}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors"
          >
            Call {site.phone}
          </a>
        </nav>

        <HeaderMobileMenu site={site} />
      </div>
    </header>
  );
}
