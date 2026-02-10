import { defineType, defineField } from "sanity";

export const review = defineType({
  name: "review",
  title: "Review",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Customer name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "category", title: "Category", type: "string", description: "e.g. Construction, Electrical" }),
    defineField({ name: "rating", title: "Rating (1-5)", type: "number", validation: (r) => r.min(1).max(5) }),
    defineField({ name: "text", title: "Review text", type: "text", validation: (r) => r.required() }),
    defineField({ name: "date", title: "Date", type: "string", description: "e.g. 19 Nov 2025" }),
  ],
});
