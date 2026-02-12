"use client";

export function Newsletter() {
  return (
    <section className="py-12 sm:py-16 bg-teal-600 animate-section-in animate-delay-7">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-2xl font-bold text-white">
          Tips & special offers
        </h2>
        <p className="mt-2 text-teal-100 text-sm">
          Subscribe for maintenance tips and promotions (mock — no form submission).
        </p>
        <form
          className="mt-6 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Your email"
            className="flex-1 min-w-0 px-4 py-3 rounded-lg border-0 text-slate-900 placeholder:text-slate-500"
            aria-label="Email for newsletter"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-white text-teal-700 font-medium hover:bg-slate-100 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
