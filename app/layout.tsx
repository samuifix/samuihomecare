import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { getPageData, getSeo } from "@/lib/sanity";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0d9488",
};

const defaultBaseUrl = "https://samuihomecare.com";
const defaultTitle = "Samui Construction — Repair & Maintenance on Koh Samui";
const defaultDescription =
  "Full-service home repair and maintenance on Koh Samui. Electrical, plumbing, AC, construction, renovation & cleaning. 24/7 service. 5+ years experience.";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeo("home");
  const data = await getPageData();
  const site = data.site;
  const baseUrl = seo?.canonicalUrl ?? defaultBaseUrl;
  const title = seo?.metaTitle ?? defaultTitle;
  const description = seo?.metaDescription ?? defaultDescription;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: title,
      template: "%s | Samui Construction",
    },
    description,
    keywords: seo?.metaKeywords
      ? seo.metaKeywords.split(",").map((k) => k.trim()).filter(Boolean)
      : [
          "Koh Samui home repair",
          "Samui maintenance",
          "electrical Samui",
          "plumbing Koh Samui",
          "AC repair Samui",
          "construction Koh Samui",
        ],
    openGraph: {
      type: "website",
      locale: "en_US",
      url: baseUrl,
      siteName: site.name,
      title: seo?.ogTitle ?? title,
      description: seo?.ogDescription ?? description,
      ...(seo?.ogImageUrl ? { images: [{ url: seo.ogImageUrl }] } : {}),
    },
    twitter: {
      card: (seo?.twitterCard as "summary_large_image") ?? "summary_large_image",
      title: seo?.twitterTitle ?? title,
      description: seo?.twitterDescription ?? description,
    },
    robots: (seo?.robots as Metadata["robots"]) ?? "index, follow",
    alternates: { canonical: baseUrl },
    verification: {
      google: "P0SeN1wqKIwJyAzMGcHGVsq7urBg5XufRD_Y15AIeAU",
    },
  };
}

function JsonLd({ site }: { site: { name: string; tagline?: string; email: string; address: string; phoneRaw?: string } }) {
  const baseUrl = "https://samuihomecare.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    description: site.tagline || defaultDescription,
    url: baseUrl,
    telephone: site.phoneRaw ? `+66-${String(site.phoneRaw).replace(/\D/g, "").slice(1)}` : undefined,
    email: site.email,
    address: site.address
      ? { "@type": "PostalAddress", streetAddress: site.address.split(",")[0]?.trim() ?? site.address, addressLocality: "Koh Samui", addressCountry: "TH" }
      : undefined,
    areaServed: "Koh Samui, Thailand",
    openingHours: "Mo-Su 00:00-23:59",
    priceRange: "$$",
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getPageData();
  const site = data.site;

  return (
    <html lang="en" className={dmSans.variable}>
      <body className="antialiased min-h-screen flex flex-col">
        <JsonLd site={site} />
        <Header site={site} />
        <main className="flex-1">{children}</main>
        <Footer site={site} />
        <FloatingContact site={site} />
      </body>
    </html>
  );
}
