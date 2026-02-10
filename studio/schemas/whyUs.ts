import { defineType, defineField } from "sanity";

export const whyUs = defineType({
  name: "whyUs",
  title: "Why us",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "text" }),
  ],
});
