import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "../database/prisma";
import parsedEnv from "./parsedEnv";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: parsedEnv.GITHUB_CLIENT_ID,
      clientSecret: parsedEnv.GITHUB_CLIENT_SECRET,
    },
    google: {
      clientId: parsedEnv.GOOGLE_CLIENT_ID,
      clientSecret: parsedEnv.GOOGLE_CLIENT_SECRET,
    },
  },
  trustedOrigins: ["http://localhost:5173"],
  // NOTE: Optional - Magic link, passkey, username etc available
});
