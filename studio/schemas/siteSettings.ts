import { defineType, defineField, defineArrayMember } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Site name", type: "string", initialValue: "Samui Home Care" }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "phone", title: "Phone (display)", type: "string" }),
    defineField({ name: "phoneRaw", title: "Phone (raw, for tel: link)", type: "string", description: "e.g. 0638419593" }),
    defineField({ name: "whatsapp", title: "WhatsApp URL", type: "url" }),
    defineField({ name: "line", title: "Line URL", type: "url" }),
    defineField({ name: "lineId", title: "Line ID", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "address", title: "Address", type: "string" }),
    defineField({ name: "addressNote", title: "Address note", type: "string" }),
    defineField({ name: "areas", title: "Service areas", type: "string", description: "e.g. Chaweng, Bophut, Lamai" }),
    defineField({ name: "hours", title: "Hours", type: "string", description: "e.g. 24 hours, every day" }),
    defineField({
      name: "servicesSectionTitle",
      title: "หัวข้อส่วนบริการ (หน้าเว็บ)",
      type: "string",
      description: "เช่น Our services (แสดงเหนือการ์ดบริการ)",
      initialValue: "Our services",
    }),
    defineField({
      name: "servicesSectionSubtitle",
      title: "คำอธิบายใต้หัวข้อส่วนบริการ",
      type: "string",
      description: "ข้อความใต้หัวข้อ Our services",
      initialValue: "Full-service home repair and maintenance with professional craftsmen",
    }),
    defineField({
      name: "stats",
      title: "Hero stats",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "value", type: "string", title: "Value" },
            { name: "label", type: "string", title: "Label" },
          ],
        }),
      ],
    }),
  ],
});
