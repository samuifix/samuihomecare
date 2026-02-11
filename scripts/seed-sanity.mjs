/**
 * Seed Sanity with mock data from the website.
 * Run from project root: npm run seed:sanity (uses seed-sanity.cjs with dotenv)
 * Requires: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN in .env.local
 */

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN. Use: node --env-file=.env.local scripts/seed-sanity.mjs");
  process.exit(1);
}

const site = {
  name: "Samui Home Care",
  tagline: "Full-service home repair & maintenance on Koh Samui",
  phone: "063-841-9593",
  phoneRaw: "0638419593",
  whatsapp: "https://wa.me/66638419593",
  line: "https://line.me/ti/p/~samuifix",
  lineId: "samuifix",
  email: "hello@samuihomecare.com",
  address: "64/33 Moo 2, Mae Nam, Koh Samui, Surat Thani 84330",
  addressNote: "Between Mae Nam Soi 2-3, roadside",
  areas: "Chaweng, Bophut, Lamai, Maenam, Choeng Mon",
  hours: "24 hours, every day",
  servicesSectionTitle: "Our services",
  servicesSectionSubtitle: "Full-service home repair and maintenance with professional craftsmen",
  stats: [
    { value: "1000+", label: "Jobs completed" },
    { value: "5+", label: "Years experience" },
    { value: "24/7", label: "Service available" },
  ],
};

const services = [
  { id: "electrical", sortOrder: 0, title: "Electrical", short: "Wiring, breakers, all electrical systems", description: "Electrical repairs, new wiring, breaker installation, all types of electrical systems.", points: ["Electrical system inspection", "Breaker installation", "New wiring", "Power outage & flickering fixes"], icon: "⚡", href: "#services" },
  { id: "plumbing", sortOrder: 1, title: "Plumbing", short: "Pipes, drainage, fixtures, all water systems", description: "Pipe repair, drainage, fixture installation, all types of water systems.", points: ["Drinking water systems", "Faucet repair", "Fixture installation", "Leak & pipe repair"], icon: "💧", href: "#services" },
  { id: "aircon", sortOrder: 2, title: "Air Conditioning", short: "Repair, cleaning, new installation", description: "AC repair, cleaning, new installation — full service.", points: ["Refrigerant top-up", "New AC installation", "Cleaning & maintenance", "AC not cooling repair"], icon: "❄️", href: "#services" },
  { id: "construction", sortOrder: 3, title: "Construction", short: "Extensions, repairs, wood, steel, painting", description: "Home extensions, repairs, woodwork, steelwork, painting.", points: ["Wood & steel work", "Painting", "Roof repair", "Room extensions"], icon: "🔨", href: "#services" },
  { id: "renovation", sortOrder: 4, title: "Renovation & Interior", short: "Design, decor, extensions with architects", description: "Design, decor, extensions with professional architects and craftsmen.", points: ["Weekly TH/EN progress reports", "Built-in & interior design", "Kitchen & bathroom upgrades", "Full house renovation"], icon: "✨", href: "#services" },
  { id: "cleaning", sortOrder: 5, title: "Cleaning", short: "Home, office, floors, windows", description: "Home and office cleaning, floor and window cleaning.", points: ["One-time or monthly service", "Office cleaning", "Window cleaning", "House cleaning"], icon: "🧹", href: "#services" },
  { id: "emergency", sortOrder: 6, title: "Emergency Service", short: "24-hour urgent repairs", description: "24-hour service for urgent and emergency jobs.", points: ["AC breakdown", "Power or water outage", "Urgent repairs", "24-hour availability"], icon: "🚨", href: "#contact", cta: "Call now" },
  { id: "welding", sortOrder: 7, title: "Welding", short: "Steel, structures, doors, windows, fences", description: "Steel welding, structural work, doors, windows, fences.", points: ["Welding repairs", "Steel fences", "Steel doors & windows", "Structural welding"], icon: "🔧", href: "#services" },
  { id: "painting", sortOrder: 8, title: "Painting", short: "House, building, walls, fences", description: "House painting, building, walls, fences — full service.", points: ["Surface preparation", "Fence, door & window painting", "Interior & exterior walls", "Full house painting"], icon: "🎨", href: "#services" },
];

const whyUs = [
  { title: "Professional craftsmen", description: "Trained technicians with over 5 years of experience and certified standards." },
  { title: "24/7 service", description: "Available every day, around the clock, including night-time emergencies." },
  { title: "Island-wide coverage", description: "We serve all of Koh Samui — Chaweng, Bophut, Lamai, Maenam and more." },
  { title: "Transparent pricing", description: "Clear quotes with no hidden costs. Free estimates before work starts." },
  { title: "Work guarantee", description: "Every job is guaranteed with after-sales support and free repair if issues arise." },
  { title: "Happy customers", description: "Over 1,000 customers trust us with many positive reviews." },
];

const reviews = [
  { name: "David Johnson", category: "Construction", rating: 5, text: "Samui Home Care was fast and very professional. Our new kitchen looks exactly as designed.", date: "19 Nov 2025" },
  { name: "Lisa Chen", category: "Electrical", rating: 5, text: "Highly skilled technicians. The electrical system is safe and works perfectly with no issues.", date: "19 Nov 2025" },
  { name: "Sarah Williams", category: "Construction", rating: 5, text: "Polite team and great attention to detail. Our bathroom looks much more modern now.", date: "18 Nov 2025" },
  { name: "James Wilson", category: "Plumbing", rating: 5, text: "Fixed our water pressure and leak quickly. Fair price and tidy work.", date: "17 Nov 2025" },
];

const portfolio = [
  { slug: "spa-pool-structure", title: "Spa pool structure & full swimming pool system — Private villa, Koh Samui", excerpt: "High-standard spa pool construction on Koh Samui. Solid structure, excellent waterproofing, professional team with over 10 years of experience.", category: "Pool & structure" },
  { slug: "steel-roof-installation", title: "Steel roof installation — Koh Samui", excerpt: "Steel roof structure and home repair in Koh Samui. Over 10 years of experience, 3,000+ homes serviced. Durable and resistant to island conditions.", category: "Roofing" },
  { slug: "wood-stair-handrail-led", title: "Wood stair handrail with hidden LED — Koh Samui", excerpt: "Solid wood handrails with hidden LED lighting, modern design. Expert craftsmen with over 10 years of experience.", category: "Interior" },
  { slug: "outdoor-shower-stone-wall", title: "Outdoor shower stone wall — Jigsaw tile installation", excerpt: "Natural stone feature wall for outdoor shower by the pool. Beautiful, weather-resistant work by our Koh Samui team.", category: "Outdoor" },
];

const categories = [
  { name: "Floor & wall", count: 3, href: "#services" },
  { name: "Doors / Windows / Fences / Stairs", count: 23, href: "#services" },
  { name: "Roof & ceiling", count: 1, href: "#services" },
  { name: "Bathroom & fixtures", count: 17, href: "#services" },
  { name: "Solar — Koh Samui", count: 20, href: "#services" },
  { name: "Home maintenance — Koh Samui", count: 51, href: "#services" },
];

const seoHome = {
  pageSlug: "home",
  metaTitle: "Samui Home Care — Repair & Maintenance on Koh Samui",
  metaDescription: "Full-service home repair and maintenance on Koh Samui. Electrical, plumbing, AC, construction, renovation & cleaning. 24/7 service. 5+ years experience.",
  metaKeywords: "Koh Samui home repair, Samui maintenance, electrical Samui, plumbing Koh Samui, AC repair Samui, construction Koh Samui",
  ogTitle: "Samui Home Care — Repair & Maintenance on Koh Samui",
  ogDescription: "Full-service home repair and maintenance on Koh Samui. 24/7 service. Professional craftsmen.",
  twitterCard: "summary_large_image",
  twitterTitle: "Samui Home Care — Repair & Maintenance on Koh Samui",
  twitterDescription: "Full-service home repair and maintenance on Koh Samui. 24/7 service.",
  canonicalUrl: "https://samuihomecare.com",
  robots: "index, follow",
};

const mutations = [
  { createOrReplace: { _id: "siteSettings", _type: "siteSettings", ...site } },
  { createOrReplace: { _id: "seo-home", _type: "seoSettings", ...seoHome } },
  ...services.map(({ id, ...rest }) => ({ createOrReplace: { _id: id, _type: "service", ...rest } })),
  ...whyUs.map((item, i) => ({ createOrReplace: { _id: `whyUs-${i}`, _type: "whyUs", ...item } })),
  ...reviews.map((item, i) => ({ createOrReplace: { _id: `review-${i}`, _type: "review", ...item } })),
  ...portfolio.map((item, i) => ({ createOrReplace: { _id: `portfolio-${i + 1}`, _type: "portfolioItem", ...item } })),
  ...categories.map((item, i) => ({ createOrReplace: { _id: `category-${i}`, _type: "category", ...item } })),
];

const url = `https://${projectId}.api.sanity.io/v2021-06-07/data/mutate/${dataset}`;
const res = await fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({ mutations }),
});

if (!res.ok) {
  const text = await res.text();
  console.error("Sanity mutate failed:", res.status, text);
  process.exit(1);
}

const result = await res.json();
console.log("Seed done. Transaction ID:", result.transactionId);
console.log("Open Sanity Studio (http://localhost:3333) and Publish the documents to see them on the site.");
