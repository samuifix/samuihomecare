import { defineType, defineField } from "sanity";

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "count", title: "Count", type: "number", initialValue: 0 }),
    defineField({ name: "href", title: "Link", type: "string", initialValue: "#services" }),
  ],
});
