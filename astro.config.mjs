// @ts-check
import { defineConfig, envField } from "astro/config";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  env: {
    schema: {
      GITHUB_CLIENT_ID: envField.string({
        context: "client",
        access: "public",
      }),
      GITHUB_CLIENT_SECRET: envField.string({
        context: "server",
        access: "public",
      }),
      GOOGLE_CLIENT_ID: envField.string({
        context: "client",
        access: "public",
      }),
      GOOGLE_CLIENT_SECRET: envField.string({
        context: "server",
        access: "secret",
      }),
    },
  },
});
