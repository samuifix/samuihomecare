import { defineType, defineField } from "sanity";

export const portfolioItem = defineType({
  name: "portfolioItem",
  title: "Portfolio item",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "string",
      description: "ใช้ใน URL หน้า single เช่น spa-pool-structure (ไม่ใส่ slash). ถ้าไม่ใส่จะไม่ลิงก์ไปหน้ารายละเอียด",
    }),
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text" }),
    defineField({ name: "category", title: "Category", type: "string" }),
    defineField({
      name: "location",
      title: "Location (สถานที่)",
      type: "string",
      description: "e.g. Chaweng, Koh Samui",
    }),
    defineField({
      name: "workType",
      title: "Work type (ประเภทงาน)",
      type: "string",
      description: "e.g. Pool construction, Roofing",
    }),
    defineField({
      name: "duration",
      title: "Duration (ระยะเวลา)",
      type: "string",
      description: "e.g. 3 weeks, 2 months",
    }),
    defineField({
      name: "review",
      title: "Review (รีวิว)",
      type: "text",
      description: "Client or project review quote",
    }),
    defineField({
      name: "image",
      title: "Image (card/thumbnail)",
      type: "image",
      options: { hotspot: true },
      description: "Used on portfolio list and as fallback hero if Hero image is empty",
      fields: [{ name: "alt", type: "string", title: "Alt text", description: "For accessibility and SEO" }],
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      options: { hotspot: true },
      description: "Large image at top of single portfolio page. If empty, main Image is used.",
      fields: [{ name: "alt", type: "string", title: "Alt text", description: "For accessibility and SEO" }],
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Alt text", description: "For accessibility and SEO" }],
        },
      ],
      description: "Additional images shown in gallery section on single portfolio page",
    }),
    defineField({
      name: "body",
      title: "เนื้อหาเต็ม (หน้า single)",
      type: "text",
      description: "ข้อความแสดงในหน้ารายละเอียดผลงาน (ถ้าไม่ใส่จะแสดงแค่ excerpt)",
    }),
  ],
  preview: {
    select: { title: "title", slug: "slug" },
    prepare({ title, slug }) {
      return { title: title ?? slug ?? "Portfolio item", subtitle: slug };
    },
  },
});
