/** Base URL for the site (used for canonical, Open Graph, JSON-LD). */
export const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://samuihomecare.com";

export const SITE_NAME = "Samui Construction";

/** Phone number for tel: links (e.g. +66638419593 for international). */
export const SITE_PHONE_RAW =
  process.env.NEXT_PUBLIC_SITE_PHONE_RAW ?? "+66638419593";
