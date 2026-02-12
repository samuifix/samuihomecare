import type { SiteSettings } from "@/lib/types";

export function Contact({ site }: { site: SiteSettings }) {
  return (
    <section id="contact" className="py-16 sm:py-24 bg-white animate-section-in animate-delay-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Contact us</h2>
          <p className="mt-2 text-slate-600">We&apos;re here every day, 24 hours</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-slate-900">Phone</h3>
            <a href={`tel:${site.phoneRaw}`} className="text-teal-600 hover:text-teal-700 font-medium mt-1 block">
              {site.phone}
            </a>
          </div>
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-slate-900">Line</h3>
            <a href={site.line} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 font-medium mt-1 block">
              {site.lineId}
            </a>
          </div>
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-slate-900">Service area</h3>
            <p className="text-slate-600 mt-1">{site.areas}</p>
          </div>
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-slate-900">Hours</h3>
            <p className="text-slate-600 mt-1">{site.hours}</p>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href={`tel:${site.phoneRaw}`}
            className="inline-flex items-center justify-center bg-teal-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-teal-700 transition-colors"
          >
            Call {site.phone}
          </a>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-white text-slate-700 px-6 py-3 rounded-xl font-medium border border-slate-200 hover:border-teal-300 hover:bg-teal-50/50 transition-colors"
          >
            WhatsApp
          </a>
          <a
            href={site.line}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-white text-slate-700 px-6 py-3 rounded-xl font-medium border border-slate-200 hover:border-teal-300 hover:bg-teal-50/50 transition-colors"
          >
            Line
          </a>
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center justify-center bg-white text-slate-700 px-6 py-3 rounded-xl font-medium border border-slate-200 hover:border-teal-300 hover:bg-teal-50/50 transition-colors"
          >
            Email
          </a>
        </div>
        <p className="mt-8 text-center text-sm text-slate-500">
          {site.address} · {site.addressNote}
        </p>
      </div>
    </section>
  );
}
