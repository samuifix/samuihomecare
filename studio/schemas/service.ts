import { defineType, defineField } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service (การ์ดบริการ)",
  type: "document",
  fields: [
    defineField({
      name: "sortOrder",
      title: "ลำดับการแสดง (น้อย = ขึ้นก่อน)",
      type: "number",
      initialValue: 0,
      description: "ใช้เรียงลำดับการ์ดบนหน้าเว็บ (เลขน้อยแสดงก่อน)",
    }),
    defineField({
      name: "title",
      title: "หัวข้อการ์ด",
      type: "string",
      validation: (r) => r.required(),
      description: "แสดงเป็นหัวข้อใหญ่บนการ์ด (เช่น Electrical, Plumbing)",
    }),
    defineField({
      name: "short",
      title: "ข้อความสั้นใต้หัวข้อ",
      type: "string",
      description: "บรรทัดเดียวใต้หัวข้อ (เช่น Wiring, breakers, all electrical systems)",
    }),
    defineField({ name: "description", title: "รายละเอียดเต็ม (ไม่แสดงบนการ์ด)", type: "text" }),
    defineField({
      name: "points",
      title: "หัวข้อย่อย (bullet 4 ข้อ)",
      type: "array",
      of: [{ type: "string" }],
      description: "แสดงเป็นจุด • ในการ์ด (ใช้แค่ 4 ข้อแรก)",
    }),
    defineField({
      name: "icon",
      title: "ไอคอน (emoji)",
      type: "string",
      description: "เช่น ⚡ 💧 🔨 ❄️ ✨ 🧹 🚨 🔧 🎨",
    }),
    defineField({
      name: "href",
      title: "ลิงก์ปุ่ม",
      type: "string",
      initialValue: "#services",
      description: "เมื่อกด View details จะไปลิงก์นี้ (หรือเว้นว่างจะใช้ /services/[slug])",
    }),
    defineField({
      name: "cta",
      title: "ปุ่มโทร (ถ้าใส่จะแสดง Call now แทน View details)",
      type: "string",
      description: "ใส่คำว่า Call now ถ้าต้องการให้ปุ่มโทรศัพท์",
    }),
    defineField({
      name: "slug",
      title: "Slug (URL หน้า single)",
      type: "string",
      description: "ใช้ใน URL หน้า single เช่น electrical (ไม่ใส่จะใช้ id ของ document)",
    }),
    defineField({
      name: "image",
      title: "รูปปกบริการ (หน้า single)",
      type: "image",
      options: { hotspot: true },
      description: "รูปแสดงด้านบนหน้ารายละเอียดบริการ",
      fields: [{ name: "alt", type: "string", title: "Alt text", description: "For accessibility and SEO" }],
    }),
    defineField({
      name: "externalImageUrl",
      title: "URL รูปภายนอก (ถ้าไม่อัปโหลดรูป)",
      type: "string",
      description: "ใช้เมื่อต้องการใส่ลิงก์รูปจากภายนอก (เช่น สำหรับ mock data)",
    }),
    defineField({
      name: "body",
      title: "รายละเอียดบริการเต็ม (หน้า single)",
      type: "text",
      description: "เนื้อหาหน้า single: รายละเอียดการบริการ, สิ่งที่รวมในบริการ",
    }),
    defineField({
      name: "pricingOverview",
      title: "อัตราค่าบริการ (หน้า single)",
      type: "text",
      description: "สรุปอัตราค่า, การคิดราคา, ตัวอย่างช่วงราคา (ภาษาอังกฤษ)",
    }),
    defineField({
      name: "travelCostOverview",
      title: "ค่าเดินทาง / Call-out (หน้า single)",
      type: "text",
      description: "นโยบายค่าเดินทางบนเกาะสมุย, โซน, เงื่อนไข",
    }),
    defineField({
      name: "termsOverview",
      title: "เงื่อนไขการใช้บริการ (หน้า single)",
      type: "text",
      description: "เงื่อนไขทั่วไป, การนัดหมาย, การรับประกัน, การชำระเงิน",
    }),
    defineField({
      name: "priceLabel",
      title: "ราคาแสดงบนการ์ด (หน้า All Services)",
      type: "string",
      description: "เช่น from 1,000 THB / visit หรือ 1,000.-/ ครั้ง",
    }),
    defineField({
      name: "rating",
      title: "คะแนนดาว (1-5)",
      type: "number",
      validation: (r) => r.min(1).max(5),
      description: "ใช้แสดงบนการ์ดหน้า All Services",
    }),
    defineField({
      name: "servicedCount",
      title: "จำนวนครั้งที่บริการแล้ว (แสดงบนการ์ด)",
      type: "number",
      description: "เช่น 234 ใช้แสดง Serviced 234 times",
    }),
  ],
  orderings: [
    { title: "ลำดับ (น้อยก่อน)", name: "sortOrderAsc", by: [{ field: "sortOrder", direction: "asc" }] },
    { title: "สร้างล่าสุด", name: "createdDesc", by: [{ field: "_createdAt", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", icon: "icon", sortOrder: "sortOrder" },
    prepare({ title, icon, sortOrder }) {
      return {
        title: [icon, title].filter(Boolean).join(" ") || "Service",
        subtitle: sortOrder != null ? `Order: ${sortOrder}` : undefined,
      };
    },
  },
});
