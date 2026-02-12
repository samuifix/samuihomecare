import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const dataset = process.env.SANITY_STUDIO_DATASET ?? process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

if (!projectId) {
  throw new Error(
    "Missing Sanity projectId. Add SANITY_STUDIO_PROJECT_ID=your_project_id to studio/.env (get it from https://manage.sanity.io → your project → API)."
  );
}

export default defineConfig({
  name: "samui-home-care",
  title: "Samui Construction CMS",
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
