import Link from "next/link";
import type { SiteSettings } from "@/lib/types";

export function Footer({ site }: { site: SiteSettings }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-white text-lg mb-3">{site.name}</h3>
            <p className="text-sm">
              Full-service home repair and maintenance on Koh Samui. We serve the whole island.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-3">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={`tel:${site.phoneRaw}`} className="hover:text-teal-400 transition-colors">
                  {site.phone} (24H)
                </a>
              </li>
              <li>
                <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={site.line} target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors">
                  Line: {site.lineId}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-teal-400 transition-colors">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-3">Address</h3>
            <p className="text-sm">
              {site.address}
              <br />
              <span className="text-slate-500">{site.addressNote}</span>
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-3">Quick links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#services" className="hover:text-teal-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/#why-us" className="hover:text-teal-400 transition-colors">
                  Why Us
                </Link>
              </li>
              <li>
                <Link href="/#reviews" className="hover:text-teal-400 transition-colors">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-teal-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-slate-700 text-center text-sm text-slate-500">
          © {year} {site.name}. Koh Samui service only.
        </div>
      </div>
    </footer>
  );
}
