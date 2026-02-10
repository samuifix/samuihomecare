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
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text", description: "For accessibility and SEO" }],
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
