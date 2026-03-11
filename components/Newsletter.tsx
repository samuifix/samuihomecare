"use client";

import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const response = await fetch("/api/newsletter.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ email }).toString(),
      });

      const data = await response.json();
      if (data.success) {
        setStatus("success");
        setEmail("");
        setMessage("Thank you for subscribing!");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage("Failed to connect to the server.");
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-teal-600 animate-section-in animate-delay-7">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-2xl font-bold text-white">
          Tips & special offers
        </h2>
        <p className="mt-2 text-teal-100 text-sm">
          Subscribe for maintenance tips and promotions.
        </p>
        
        {status === "success" ? (
          <div className="mt-6 p-4 bg-white/10 rounded-lg text-white font-medium">
            {message}
          </div>
        ) : (
          <form
            className="mt-6 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              required
              className="flex-1 min-w-0 px-4 py-3 rounded-lg border-0 text-slate-900 placeholder:text-slate-500"
              aria-label="Email for newsletter"
              disabled={status === "loading"}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-6 py-3 rounded-lg bg-white text-teal-700 font-medium hover:bg-slate-100 transition-colors disabled:opacity-50"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="mt-3 text-red-200 text-sm font-medium">{message}</p>
        )}
      </div>
    </section>
  );
}
