import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "../database/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: import.meta.env.GITHUB_CLIENT_ID,
      clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
    },
    google: {
      clientId: import.meta.env.GOOGLE_CLIENT_ID,
      clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
    },
  },
  trustedOrigins: ["http://localhost:4321"],
  // NOTE: Optional - Magic link, passkey, username etc available
});
