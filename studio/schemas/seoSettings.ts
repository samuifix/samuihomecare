import { defineType, defineField } from "sanity";

export const seoSettings = defineType({
  name: "seoSettings",
  title: "SEO Settings",
  type: "document",
  fields: [
    defineField({
      name: "pageSlug",
      title: "Page (slug)",
      type: "string",
      initialValue: "home",
      description: "home, about, etc.",
    }),
    defineField({ name: "metaTitle", title: "Meta Title", type: "string" }),
    defineField({ name: "metaDescription", title: "Meta Description", type: "text" }),
    defineField({ name: "metaKeywords", title: "Meta Keywords (comma-separated)", type: "string" }),
    defineField({ name: "ogTitle", title: "Open Graph Title", type: "string" }),
    defineField({ name: "ogDescription", title: "Open Graph Description", type: "text" }),
    defineField({ name: "ogImage", title: "Open Graph Image", type: "image" }),
    defineField({ name: "twitterCard", title: "Twitter Card", type: "string", initialValue: "summary_large_image" }),
    defineField({ name: "twitterTitle", title: "Twitter Title", type: "string" }),
    defineField({ name: "twitterDescription", title: "Twitter Description", type: "text" }),
    defineField({ name: "canonicalUrl", title: "Canonical URL", type: "url" }),
    defineField({ name: "robots", title: "Robots", type: "string", initialValue: "index, follow", description: "e.g. index, follow" }),
  ],
});
