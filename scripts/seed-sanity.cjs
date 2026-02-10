// Seed Sanity with mock data from the website.
// Run from project root: node scripts/seed-sanity.cjs
// Requires: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN in environment

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN. Make sure these are set in your environment (for example via .env.local loaded by your shell)."
  );
  process.exit(1);
}

const site = {
  name: "Samui Home Care",
  tagline: "Full-service home repair & maintenance on Koh Samui",
  phone: "063-841-9593",
  phoneRaw: "0638419593",
  whatsapp: "https://wa.me/66638419593",
  line: "https://line.me/ti/p/samuifix",
  lineId: "samuifix",
  email: "hello@samuihomecare.com",
  address: "64/33 Moo 2, Mae Nam, Koh Samui, Surat Thani 84330",
  addressNote: "Between Mae Nam Soi 2-3, roadside",
  areas: "Chaweng, Bophut, Lamai, Maenam, Choeng Mon",
  hours: "24 hours, every day",
  servicesSectionTitle: "Our services",
  servicesSectionSubtitle:
    "Full-service home repair and maintenance with professional craftsmen",
  stats: [
    { value: "1000+", label: "Jobs completed" },
    { value: "5+", label: "Years experience" },
    { value: "24/7", label: "Service available" },
  ],
};

// Shared copy for Koh Samui–only service (used in travelCostOverview / termsOverview where same)
const TRAVEL_COST_STANDARD = `We serve all of Koh Samui (Chaweng, Bophut, Lamai, Mae Nam, Choeng Mon, and surrounding areas). Call-out fee is applied per visit and depends on your zone; same-day and emergency call-outs may incur an additional surcharge. You will receive a clear quote before any work begins.`;
const TERMS_STANDARD = `Appointments can be made by phone, WhatsApp, or Line. We recommend booking in advance for non-urgent work. Payment is due upon completion unless otherwise agreed; we accept cash and bank transfer. Our work is guaranteed: if an issue arises from our installation or repair within the agreed warranty period, we will return to fix it at no extra cost.`;

const services = [
  {
    id: "electrical",
    slug: "electrical",
    sortOrder: 0,
    title: "Electrical",
    short: "Wiring, breakers, all electrical systems",
    description:
      "Electrical repairs, new wiring, breaker installation, all types of electrical systems.",
    points: [
      "Electrical system inspection",
      "Breaker installation",
      "New wiring",
      "Power outage & flickering fixes",
    ],
    icon: "⚡",
    href: "#services",
    body: `We provide full electrical services for homes and villas on Koh Samui: wiring, breaker panels, lighting, sockets, and fault finding. All work is carried out by experienced technicians who follow local and international safety standards.\n\nServices include: new circuits and outlets, RCD/earth-leakage installation and testing, repair of power cuts and flickering lights, and upgrades for older properties. We do not work on high-voltage grid connections; for meter or supply issues, we can advise and coordinate with the local utility.`,
    pricingOverview: `Rates are quoted per job after a site visit. Typical ranges (for reference only): small repairs and fixture replacement from THB 800; new outlet or switch from THB 1,200; breaker panel inspection from THB 1,500; full room or circuit rewiring on quotation. Materials are charged separately at cost. Free estimate before starting.`,
    travelCostOverview: TRAVEL_COST_STANDARD,
    termsOverview: TERMS_STANDARD,
    priceLabel: "from 800 THB / visit",
    rating: 4.8,
    servicedCount: 312,
  },
  {
    id: "plumbing",
    slug: "plumbing",
    sortOrder: 1,
    title: "Plumbing",
    short: "Pipes, drainage, fixtures, all water systems",
    description:
      "Pipe repair, drainage, fixture installation, all types of water systems.",
    points: [
      "Drinking water systems",
      "Faucet repair",
      "Fixture installation",
      "Leak & pipe repair",
    ],
    icon: "💧",
    href: "#services",
    body: `Full plumbing services for Koh Samui: taps, toilets, pipes, drains, and water pumps. We repair leaks, unblock drains, install and replace fixtures, and maintain drinking-water and filtration systems.\n\nWe work with both standard and pressurized systems and can advise on water quality and simple filtration options. For large projects (e.g. full bathroom or pool plumbing), we provide a written quote after an on-site assessment.`,
    pricingOverview: `Pricing is job-based. Examples (indicative): tap or toilet repair from THB 1,000; drain unblocking from THB 1,500; new faucet or fixture installation from THB 1,200; pipe repair by quote. Parts and materials are additional. Free quote before work starts.`,
    travelCostOverview: TRAVEL_COST_STANDARD,
    termsOverview: TERMS_STANDARD,
    priceLabel: "from 1,000 THB / visit",
    rating: 4.7,
    servicedCount: 428,
  },
  {
    id: "aircon",
    slug: "aircon",
    sortOrder: 2,
    title: "Air Conditioning",
    short: "Repair, cleaning, new installation",
    description: "AC repair, cleaning, new installation — full service.",
    points: [
      "Refrigerant top-up",
      "New AC installation",
      "Cleaning & maintenance",
      "AC not cooling repair",
    ],
    icon: "❄️",
    href: "#services",
    body: `We install, repair, and maintain air conditioning units across Koh Samui. Services include: fault diagnosis and repair (not cooling, leaking, noisy), gas top-up where appropriate, indoor/outdoor cleaning, and new unit supply and installation.\n\nWe work with major brands and can advise on sizing (BTU) and inverter vs non-inverter. Regular cleaning prolongs unit life and improves efficiency; we offer one-off and recurring maintenance plans.`,
    pricingOverview: `Costs depend on the job. Cleaning (indoor + outdoor) from THB 800 per unit; repair and gas top-up from THB 1,500; new AC installation from THB 4,000 (unit and materials extra). We give a fixed quote after checking the unit and site.`,
    travelCostOverview: TRAVEL_COST_STANDARD,
    termsOverview: TERMS_STANDARD,
    priceLabel: "from 800 THB / unit",
    rating: 4.9,
    servicedCount: 567,
  },
  {
    id: "construction",
    slug: "construction",
    sortOrder: 3,
    title: "Construction",
    short: "Extensions, repairs, wood, steel, painting",
    description:
      "Home extensions, repairs, woodwork, steelwork, painting.",
    points: ["Wood & steel work", "Painting", "Roof repair", "Room extensions"],
    icon: "🔨",
    href: "#services",
    body: `General construction and repair for villas and homes on Koh Samui: small extensions, wood and steel work, roof repairs, and painting. We handle interior and exterior work and coordinate with your plans or provide simple design input where needed.\n\nAll work is quoted after a site visit. For larger projects we can provide a phased schedule and progress updates. We use quality materials suited to the island climate.`,
    pricingOverview: `Quoted per project. Small repairs and carpentry from THB 2,000; painting from THB 150/m² (surface-dependent); roof repair and steel work by quotation. Materials are quoted separately. Free site visit and estimate.`,
    travelCostOverview: TRAVEL_COST_STANDARD,
    termsOverview: TERMS_STANDARD,
    priceLabel: "from 2,000 THB / job",
    rating: 4.6,
    servicedCount: 189,
  },
  {
    id: "renovation",
    slug: "renovation",
    sortOrder: 4,
    title: "Renovation & Interior",
    short: "Design, decor, extensions with architects",
    description:
      "Design, decor, extensions with professional architects and craftsmen.",
    points: [
      "Weekly TH/EN progress reports",
      "Built-in & interior design",
      "Kitchen & bathroom upgrades",
      "Full house renovation",
    ],
    icon: "✨",
    href: "#services",
    body: `Full renovation and interior services for Koh Samui properties: kitchen and bathroom upgrades, built-in furniture, and whole-house refurbishment. We work with architects and designers when required and provide weekly progress updates in English and Thai.\n\nScope and timeline are agreed before starting; we quote on a project basis with clear milestones. Suitable for villa owners and long-term rental operators who want a single point of contact for quality finish and reliable scheduling.`,
    pricingOverview: `Project-based pricing. We provide a detailed quote after reviewing plans and site. Deposit and stage payments are agreed in advance. No hidden costs; variations are documented and agreed before extra work.`,
    travelCostOverview: TRAVEL_COST_STANDARD,
    termsOverview: TERMS_STANDARD,
    priceLabel: "quoted per project",
    rating: 4.8,
    servicedCount: 94,
  },
  {
    id: "cleaning",
    slug: "cleaning",
    sortOrder: 5,
    title: "Cleaning",
    short: "Home, office, floors, windows",
    description:
      "Home and office cleaning, floor and window cleaning.",
    points: [
      "One-time or monthly service",
      "Office cleaning",
      "Window cleaning",
      "House cleaning",
    ],
    icon: "🧹",
    href: "#services",
    body: `Professional cleaning across Koh Samui: homes, villas, and offices. We offer one-off deep cleans, regular weekly or monthly housekeeping, and specialist services such as window and floor care.\n\nRates depend on property size, frequency, and scope (e.g. inside only, or including exterior windows). We supply standard cleaning products unless you prefer your own. Ideal for holiday rentals, resident owners, and small businesses.`,
    pricingOverview: `Pricing by property size and frequency. One-off house clean from THB 1,500; regular weekly from THB 2,500 per visit (size-dependent). Office and window cleaning quoted on request. No contract required for one-off or trial cleans.`,
    travelCostOverview: TRAVEL_COST_STANDARD,
    termsOverview: TERMS_STANDARD,
    priceLabel: "from 1,500 THB / visit",
    rating: 4.7,
    servicedCount: 276,
  },
  {
    id: "emergency",
    slug: "emergency",
    sortOrder: 6,
    title: "Emergency Service",
    short: "24-hour urgent repairs",
    description: "24-hour service for urgent and emergency jobs.",
    points: ["AC breakdown", "Power or water outage", "Urgent repairs", "24-hour availability"],
    icon: "🚨",
    href: "#contact",
    cta: "Call now",
    body: `We offer 24/7 call-out for urgent issues on Koh Samui: no power, no water, AC failure, leaks, or other emergencies that cannot wait until the next working day.\n\nWhen you call, we will confirm the issue and give an estimated arrival window. Emergency call-outs include a surcharge; labour and parts are quoted on site. For life-threatening situations (e.g. gas smell, major electrical hazard), please contact emergency services first, then call us for repair.`,
    pricingOverview: `Emergency call-out: base fee from THB 1,500 (in addition to labour and parts). Labour is charged at the emergency rate; we will confirm the total before starting work. Payment on completion.`,
    travelCostOverview: TRAVEL_COST_STANDARD,
    termsOverview: `Call us directly for emergencies; we aim to respond as quickly as possible. Payment is due on completion. By requesting an emergency visit you agree to the emergency rate and call-out fee.`,
    priceLabel: "from 1,500 THB call-out",
    rating: 4.9,
    servicedCount: 203,
  },
  {
    id: "welding",
    slug: "welding",
    sortOrder: 7,
    title: "Welding",
    short: "Steel, structures, doors, windows, fences",
    description:
      "Steel welding, structural work, doors, windows, fences.",
    points: [
      "Welding repairs",
      "Steel fences",
      "Steel doors & windows",
      "Structural welding",
    ],
    icon: "🔧",
    href: "#services",
    body: `Welding and metalwork for Koh Samui: gates, fences, security bars, doors, windows, and small structural repairs. We work on-site with portable equipment and use materials suited to the coastal environment.\n\nAll work is quoted after inspection. We do not undertake load-bearing structural steel design; for major structural work we can recommend an engineer and then execute the approved design.`,
    pricingOverview: `Quoted per job. Small repairs and brackets from THB 1,500; gate or fence sections by size and design; full gate/fence projects on quotation. Materials charged separately. Free site visit.`,
    travelCostOverview: TRAVEL_COST_STANDARD,
    termsOverview: TERMS_STANDARD,
    priceLabel: "from 1,500 THB / job",
    rating: 4.6,
    servicedCount: 145,
  },
  {
    id: "painting",
    slug: "painting",
    sortOrder: 8,
    title: "Painting",
    short: "House, building, walls, fences",
    description:
      "House painting, building, walls, fences — full service.",
    points: [
      "Surface preparation",
      "Fence, door & window painting",
      "Interior & exterior walls",
      "Full house painting",
    ],
    icon: "🎨",
    href: "#services",
    body: `Interior and exterior painting for homes and buildings on Koh Samui. We prepare surfaces (filling, sanding, priming where needed), then apply quality paint suitable for tropical conditions. We cover walls, ceilings, doors, windows, and fences.\n\nWe use durable, weather-resistant products for exterior work and can advise on colours and finishes. Full house or single-room projects are quoted after a site visit.`,
    pricingOverview: `Price depends on area and surface type. Interior from THB 150/m²; exterior from THB 180/m²; doors/windows/fences by item or m². Paint and materials are quoted separately. Free estimate on site.`,
    travelCostOverview: TRAVEL_COST_STANDARD,
    termsOverview: TERMS_STANDARD,
    priceLabel: "from 150 THB / m²",
    rating: 4.7,
    servicedCount: 318,
  },
  // --- Example services (Koh Samui) with mock data + images ---
  {
    id: "toilet-replacement",
    slug: "toilet-replacement",
    sortOrder: 9,
    title: "Toilet replacement & installation",
    short: "New toilet supply, removal of old unit, and professional installation on Koh Samui",
    description: "Full toilet replacement and installation service for homes and villas on Koh Samui.",
    points: [
      "Supply of quality toilet units (standard & wall-hung)",
      "Removal and disposal of old toilet",
      "Sealing, connection to waste pipe, and testing",
      "Clean finish and leak-free guarantee",
    ],
    icon: "🚽",
    href: "#services",
    externalImageUrl: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=80",
    body: `We supply and install new toilets for homes and villas across Koh Samui. Our team removes the old unit, prepares the connection, and fits the new toilet with correct sealing and waste connection so you get a leak-free, reliable result.\n\nWe work with standard floor-mounted and wall-hung models and can advise on suitable options for your bathroom. All work is carried out with care to avoid damage to tiles or plumbing. We serve Chaweng, Bophut, Lamai, Mae Nam, Choeng Mon, and the rest of the island.`,
    pricingOverview: `Quoted per job. Typical range: standard toilet supply and installation from THB 4,500 (unit and labour); wall-hung from THB 6,500. Removal of old toilet and disposal included. Additional costs only if pipework or floor repairs are needed. Free site visit and quote.`,
    travelCostOverview: TRAVEL_COST_STANDARD,
    termsOverview: TERMS_STANDARD,
    priceLabel: "from 4,500 THB / job",
    rating: 4.8,
    servicedCount: 127,
  },
  {
    id: "tree-cutting",
    slug: "tree-cutting",
    sortOrder: 10,
    title: "Tree cutting & removal",
    short: "Safe tree trimming, pruning, and removal for villas and land on Koh Samui",
    description: "Professional tree cutting, trimming, and removal service on Koh Samui.",
    points: [
      "Tree trimming and pruning",
      "Full tree removal when required",
      "Branch and debris disposal",
      "Safe work near buildings and power lines",
    ],
    icon: "🌳",
    href: "#services",
    externalImageUrl: "https://images.unsplash.com/photo-1598902108854-10e335adac99?w=1200&q=80",
    body: `We offer tree cutting, pruning, and removal for private land and villas on Koh Samui. Our team works safely with hand and power tools to trim overhanging branches, shape trees, or remove whole trees when necessary. We take care around buildings, fences, and power lines and clear away branches and debris after the job.\n\nIdeal for overgrown gardens, storm damage, or preparing land. We cover the whole island and can give you a clear quote after an on-site visit.`,
    pricingOverview: `Price depends on tree size, access, and scope. Small pruning from THB 2,500; medium tree removal from THB 5,000; large trees and difficult access by quotation. We confirm the price before starting.`,
    travelCostOverview: TRAVEL_COST_STANDARD,
    termsOverview: TERMS_STANDARD,
    priceLabel: "from 2,500 THB / job",
    rating: 4.7,
    servicedCount: 86,
  },
  {
    id: "garden-care",
    slug: "garden-care",
    sortOrder: 11,
    title: "Garden care & maintenance",
    short: "Regular garden upkeep, lawn mowing, and landscaping support on Koh Samui",
    description: "Garden care and maintenance services for villas and homes on Koh Samui.",
    points: [
      "Lawn mowing and edging",
      "Weeding and basic landscaping",
      "Hedge trimming",
      "One-off or regular maintenance plans",
    ],
    icon: "🌿",
    href: "#services",
    externalImageUrl: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1200&q=80",
    body: `We provide garden care and maintenance for properties on Koh Samui: lawn mowing, weeding, hedge trimming, and general landscaping support. Services can be one-off or on a regular schedule (e.g. weekly or fortnightly) to keep your garden tidy and healthy in the tropical climate.\n\nWe work with private villas, rental properties, and small estates. You can choose a fixed plan or book ad hoc. All equipment is supplied; we only ask for access to water when needed. We serve the whole island including Chaweng, Bophut, Lamai, and Mae Nam.`,
    pricingOverview: `Rates depend on garden size and frequency. One-off garden tidy from THB 2,000; regular weekly maintenance from THB 3,500 per visit. We give a fixed quote after a quick site visit.`,
    travelCostOverview: TRAVEL_COST_STANDARD,
    termsOverview: TERMS_STANDARD,
    priceLabel: "from 2,000 THB / visit",
    rating: 4.6,
    servicedCount: 164,
  },
];

const whyUs = [
  {
    title: "Professional craftsmen",
    description:
      "Trained technicians with over 5 years of experience and certified standards.",
  },
  {
    title: "24/7 service",
    description:
      "Available every day, around the clock, including night-time emergencies.",
  },
  {
    title: "Island-wide coverage",
    description:
      "We serve all of Koh Samui — Chaweng, Bophut, Lamai, Maenam and more.",
  },
  {
    title: "Transparent pricing",
    description:
      "Clear quotes with no hidden costs. Free estimates before work starts.",
  },
  {
    title: "Work guarantee",
    description:
      "Every job is guaranteed with after-sales support and free repair if issues arise.",
  },
  {
    title: "Happy customers",
    description:
      "Over 1,000 customers trust us with many positive reviews.",
  },
];

const reviews = [
  {
    name: "David Johnson",
    category: "Construction",
    rating: 5,
    text: "Samui Home Care was fast and very professional. Our new kitchen looks exactly as designed.",
    date: "19 Nov 2025",
  },
  {
    name: "Lisa Chen",
    category: "Electrical",
    rating: 5,
    text: "Highly skilled technicians. The electrical system is safe and works perfectly with no issues.",
    date: "19 Nov 2025",
  },
  {
    name: "Sarah Williams",
    category: "Construction",
    rating: 5,
    text: "Polite team and great attention to detail. Our bathroom looks much more modern now.",
    date: "18 Nov 2025",
  },
  {
    name: "James Wilson",
    category: "Plumbing",
    rating: 5,
    text: "Fixed our water pressure and leak quickly. Fair price and tidy work.",
    date: "17 Nov 2025",
  },
];

const portfolio = [
  {
    slug: "spa-pool-structure",
    title: "Spa pool structure & full swimming pool system — Private villa, Koh Samui",
    excerpt:
      "High-standard spa pool construction on Koh Samui. Solid structure, excellent waterproofing, professional team with over 10 years of experience.",
    category: "Pool & structure",
    body:
      "We delivered a complete spa pool and swimming pool system for a private villa on Koh Samui. The project included structural work, waterproofing, and integration of filtration and heating systems.\n\nOur team has over 10 years of experience in pool construction on the island. We work with durable materials suited to the tropical climate and ensure every detail meets the highest standards. The client was involved from design through to handover, and we provided clear timelines and regular updates.\n\nIf you are planning a new pool or spa on Koh Samui, contact us for a free quote and site visit.",
  },
  {
    slug: "steel-roof-installation",
    title: "Steel roof installation — Koh Samui",
    excerpt:
      "Steel roof structure and home repair in Koh Samui. Over 10 years of experience, 3,000+ homes serviced. Durable and resistant to island conditions.",
    category: "Roofing",
    body:
      "This project involved a full steel roof structure for a residential property on Koh Samui. We designed and installed a frame that can withstand heavy rain, wind, and salt air typical of the island.\n\nWe have serviced over 3,000 homes on Koh Samui and understand the local conditions. Our steel work is treated for corrosion resistance and installed with proper drainage and ventilation. The result is a long-lasting roof that protects the property and looks clean and professional.\n\nFor steel roofing, extensions, or repairs anywhere on the island, get in touch for a no-obligation assessment.",
  },
  {
    slug: "wood-stair-handrail-led",
    title: "Wood stair handrail with hidden LED — Koh Samui",
    excerpt:
      "Solid wood handrails with hidden LED lighting, modern design. Expert craftsmen with over 10 years of experience.",
    category: "Interior",
    body:
      "We built custom wood stair handrails with integrated LED lighting for a modern villa interior. The handrails are made from solid wood, finished for durability and a smooth feel, with a discreet LED strip that provides safe night-time lighting without affecting the daytime look.\n\nOur carpenters have over 10 years of experience in high-end interior work on Koh Samui. We can match existing wood species and finishes, and we work closely with electricians to ensure wiring and switches are correctly installed.\n\nWhether you need handrails, built-in furniture, or full interior woodwork, we can help from design to installation.",
  },
  {
    slug: "outdoor-shower-stone-wall",
    title: "Outdoor shower stone wall — Jigsaw tile installation",
    excerpt:
      "Natural stone feature wall for outdoor shower by the pool. Beautiful, weather-resistant work by our Koh Samui team.",
    category: "Outdoor",
    body:
      "This outdoor shower area features a natural stone wall installed in a jigsaw pattern. The wall was designed to complement the pool and garden, with careful attention to drainage and exposure to sun and rain.\n\nWe selected stone that performs well in tropical conditions and installed it with proper waterproofing and support. The result is a striking feature that is both functional and easy to maintain.\n\nFor outdoor tiling, stone work, or pool-area upgrades on Koh Samui, contact our team for a site visit and quote.",
  },
];

// Portable Text block helpers for Sanity (block content)
let blockKey = 0;
function blockParagraph(text) {
  const key = `b-${++blockKey}`;
  return {
    _type: "block",
    _key: key,
    style: "normal",
    children: [{ _type: "span", _key: `${key}-0`, text, marks: [] }],
    markDefs: [],
  };
}
function blockHeading(text, style = "h2") {
  const key = `b-${++blockKey}`;
  return {
    _type: "block",
    _key: key,
    style,
    children: [{ _type: "span", _key: `${key}-0`, text, marks: [] }],
    markDefs: [],
  };
}

const posts = [
  {
    slug: "home-maintenance-tips-koh-samui",
    title: "Home maintenance tips for Koh Samui",
    excerpt: "Keep your villa or home in top condition with these practical tips for the island climate.",
    publishedAt: "2025-01-15T09:00:00.000Z",
    body: [
      blockHeading("Why regular maintenance matters"),
      blockParagraph(
        "Koh Samui's tropical climate—high humidity, salt air, and heavy rain—can take a toll on buildings, electrical systems, and fixtures. Regular checks and small fixes help avoid bigger problems and keep your property safe and comfortable."
      ),
      blockHeading("What to check regularly", "h3"),
      blockParagraph(
        "Inspect roof and gutters for damage and blockages. Test circuit breakers and RCDs. Check AC filters and drain lines. Look for leaks around taps, toilets, and under sinks. Keep outdoor wood and metal painted or treated to prevent rot and rust."
      ),
      blockHeading("When to call a professional", "h3"),
      blockParagraph(
        "For anything involving electricity, gas, or structural changes, always use a qualified technician. Samui Home Care offers 24/7 emergency call-outs and scheduled maintenance plans so you can enjoy your home with peace of mind."
      ),
    ],
  },
  {
    slug: "choosing-air-conditioning-koh-samui",
    title: "Choosing the right air conditioning for your Koh Samui home",
    excerpt: "Size, efficiency, and installation matter. Here is what to consider before you buy.",
    publishedAt: "2025-01-08T10:00:00.000Z",
    body: [
      blockHeading("Getting the size right"),
      blockParagraph(
        "An undersized unit will run constantly and still not cool the room. An oversized unit will short-cycle and may leave the air damp. We can do a simple load calculation based on your room size, insulation, and sun exposure to recommend the right BTU."
      ),
      blockHeading("Inverter vs non-inverter"),
      blockParagraph(
        "Inverter ACs adjust compressor speed to match demand, so they use less power and are quieter. For a home on Koh Samui where AC runs often, an inverter model usually pays back the extra cost through lower electricity bills."
      ),
      blockHeading("Installation and maintenance"),
      blockParagraph(
        "Proper installation—level mounting, correct refrigerant charge, and clean drainage—extends the life of your unit. We install and service all major brands and offer cleaning and maintenance plans to keep your AC running efficiently year-round."
      ),
    ],
  },
  {
    slug: "electrical-safety-villa",
    title: "Electrical safety in your villa: what to know",
    excerpt: "Simple steps to keep your property and family safe from electrical hazards.",
    publishedAt: "2025-01-02T08:00:00.000Z",
    body: [
      blockHeading("Older villas and wiring"),
      blockParagraph(
        "Many villas on Koh Samui were built years ago and may have outdated wiring, undersized breakers, or no earth leakage protection. If you notice flickering lights, tripping breakers, or warm outlets, have a qualified electrician inspect the system."
      ),
      blockHeading("RCDs and earthing"),
      blockParagraph(
        "An RCD (residual current device) cuts power quickly if it detects a fault, reducing the risk of shock or fire. Proper earthing is essential, especially in wet areas like bathrooms and outdoor sockets. We can test your installation and recommend upgrades."
      ),
      blockHeading("24/7 support"),
      blockParagraph(
        "Samui Home Care provides round-the-clock electrical call-outs for emergencies such as power loss, burning smells, or sparking. Do not attempt to repair mains electricity yourself—call us and we will send a technician as soon as possible."
      ),
    ],
  },
];

const categories = [
  { name: "Floor & wall", count: 3, href: "/services/construction/" },
  { name: "Doors / Windows / Fences / Stairs", count: 23, href: "/services/welding/" },
  { name: "Roof & ceiling", count: 1, href: "/services/construction/" },
  { name: "Bathroom & fixtures", count: 17, href: "/services/plumbing/" },
  { name: "Solar — Koh Samui", count: 20, href: "/services/electrical/" },
  { name: "Home maintenance — Koh Samui", count: 51, href: "/services/cleaning/" },
];

const seoHome = {
  pageSlug: "home",
  metaTitle: "Samui Home Care — Repair & Maintenance on Koh Samui",
  metaDescription:
    "Full-service home repair and maintenance on Koh Samui. Electrical, plumbing, AC, construction, renovation & cleaning. 24/7 service. 5+ years experience.",
  metaKeywords:
    "Koh Samui home repair, Samui maintenance, electrical Samui, plumbing Koh Samui, AC repair Samui, construction Koh Samui",
  ogTitle: "Samui Home Care — Repair & Maintenance on Koh Samui",
  ogDescription:
    "Full-service home repair and maintenance on Koh Samui. 24/7 service. Professional craftsmen.",
  twitterCard: "summary_large_image",
  twitterTitle: "Samui Home Care — Repair & Maintenance on Koh Samui",
  twitterDescription:
    "Full-service home repair and maintenance on Koh Samui. 24/7 service.",
  canonicalUrl: "https://samuihomecare.com",
  robots: "index, follow",
};

const mutations = [
  { createOrReplace: { _id: "siteSettings", _type: "siteSettings", ...site } },
  { createOrReplace: { _id: "seo-home", _type: "seoSettings", ...seoHome } },
  ...services.map(({ id, ...rest }) => ({
    createOrReplace: { _id: id, _type: "service", ...rest },
  })),
  ...whyUs.map((item, i) => ({
    createOrReplace: { _id: `whyUs-${i}`, _type: "whyUs", ...item },
  })),
  ...reviews.map((item, i) => ({
    createOrReplace: { _id: `review-${i}`, _type: "review", ...item },
  })),
  ...portfolio.map((item, i) => ({
    createOrReplace: {
      _id: `portfolio-${i + 1}`,
      _type: "portfolioItem",
      ...item,
    },
  })),
  ...categories.map((item, i) => ({
    createOrReplace: { _id: `category-${i}`, _type: "category", ...item },
  })),
  ...posts.map((p) => ({
    createOrReplace: {
      _id: `post-${p.slug}`,
      _type: "post",
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      publishedAt: p.publishedAt,
      body: p.body,
    },
  })),
];

async function main() {
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
  console.log(
    "Open Sanity Studio (http://localhost:3333) and Publish the documents to see them on the site."
  );
}

main().catch((err) => {
  console.error("Unexpected error while seeding Sanity:", err);
  process.exit(1);
});

