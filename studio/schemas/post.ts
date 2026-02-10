import { defineType, defineField } from "sanity";

export const post = defineType({
  name: "post",
  title: "บทความ",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "string",
      description: "ใช้ใน URL เช่น my-first-post (ไม่ใส่ slash)",
      validation: (r) => r.required(),
    }),
    defineField({ name: "title", title: "หัวข้อ", type: "string", validation: (r) => r.required() }),
    defineField({ name: "excerpt", title: "สรุปสั้น", type: "text" }),
    defineField({
      name: "publishedAt",
      title: "วันที่เผยแพร่",
      type: "datetime",
    }),
    defineField({
      name: "coverImage",
      title: "รูปปก",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text", description: "For accessibility and SEO" }],
    }),
    defineField({
      name: "body",
      title: "เนื้อหา",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Alt text" }],
        },
      ],
    }),
  ],
  orderings: [
    { title: "วันที่เผยแพร่ (ใหม่ก่อน)", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] },
    { title: "วันที่สร้าง", name: "createdDesc", by: [{ field: "_createdAt", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", slug: "slug", publishedAt: "publishedAt" },
    prepare({ title, slug, publishedAt }) {
      return {
        title: title ?? slug ?? "บทความ",
        subtitle: publishedAt ? new Date(publishedAt).toLocaleDateString("th-TH") : slug,
      };
    },
  },
});
