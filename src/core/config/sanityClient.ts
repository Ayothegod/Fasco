import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2024-06-01",
  useCdn: false,
});

export const server = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2024-06-01",
  token: import.meta.env.SANITY_TOKEN,
  useCdn: false,
});
