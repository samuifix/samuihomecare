/** Shape of data consumed by the frontend (from Sanity or fallback). */

export interface SiteSettings {
  name: string;
  tagline: string;
  phone: string;
  phoneRaw: string;
  whatsapp: string;
  line: string;
  lineId: string;
  email: string;
  address: string;
  addressNote: string;
  areas: string;
  hours: string;
  /** หัวข้อส่วนบริการ (เช่น Our services) */
  servicesSectionTitle?: string;
  /** คำอธิบายใต้หัวข้อส่วนบริการ */
  servicesSectionSubtitle?: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  short: string;
  description: string;
  points: string[];
  icon: string;
  href: string;
  cta?: string;
}

/** Service card for All Services page (with price, rating, serviced count) */
export interface ServiceCardItem {
  id: string;
  slug: string;
  title: string;
  short: string;
  points: string[];
  icon: string;
  href: string;
  cta?: string;
  imageUrl?: string;
  imageAlt?: string;
  priceLabel?: string;
  rating?: number;
  servicedCount?: number;
}

/** Single service (for /services/[slug]) */
export interface ServiceSingle {
  title: string;
  short: string;
  description?: string;
  points: string[];
  icon: string;
  href: string;
  cta?: string;
  imageUrl?: string;
  imageAlt?: string;
  body?: string;
  pricingOverview?: string;
  travelCostOverview?: string;
  termsOverview?: string;
  priceLabel?: string;
  rating?: number;
  servicedCount?: number;
}

export interface WhyUsItem {
  title: string;
  description: string;
}

export interface ReviewItem {
  name: string;
  category: string;
  rating: number;
  text: string;
  date: string;
}

export interface PortfolioItem {
  id: string;
  slug?: string;
  title: string;
  excerpt: string;
  category: string;
  imageUrl?: string;
  imageAlt?: string;
}

/** Single gallery image */
export interface PortfolioGalleryImage {
  url: string;
  alt?: string;
}

/** Single portfolio item (for /portfolio/[slug]) */
export interface PortfolioSingle {
  title: string;
  excerpt: string;
  category: string;
  imageUrl?: string;
  imageAlt?: string;
  /** Hero image (top of page); falls back to imageUrl if not set */
  heroImageUrl?: string;
  heroImageAlt?: string;
  /** Gallery images */
  gallery?: PortfolioGalleryImage[];
  body?: string;
  location?: string;
  workType?: string;
  duration?: string;
  review?: string;
}

/** Block content from Sanity (simple) */
export interface PostBlock {
  _type: string;
  children?: { _type: string; text?: string }[];
  alt?: string;
}

/** Single blog post (for /blog/[slug]) */
export interface PostSingle {
  title: string;
  excerpt: string | null;
  publishedAt: string | null;
  coverImageUrl?: string;
  coverImageAlt?: string;
  body?: PostBlock[];
}

export interface CategoryItem {
  name: string;
  count: number;
  href: string;
}

export interface PageData {
  site: SiteSettings;
  stats: StatItem[];
  services: ServiceItem[];
  whyUs: WhyUsItem[];
  reviews: ReviewItem[];
  portfolio: PortfolioItem[];
  categories: CategoryItem[];
}
