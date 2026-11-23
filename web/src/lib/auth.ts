import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { bearer } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { prisma } from "./prisma"; // Your existing prisma client

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  session: {
    // Sliding session: valid for 90 days, and every request made after the
    // session is a day old pushes the expiry another 90 days out. Users who
    // save a snippet at least once every 90 days never have to log in again.
    expiresIn: 60 * 60 * 24 * 90,
    updateAge: 60 * 60 * 24,
  },
  plugins: [
    // Lets the browser extension authenticate with `Authorization: Bearer <token>`
    // instead of relying on the browser cookie, which can expire or be cleared
    // independently of the server-side session.
    bearer(),
    // Makes session refreshes done via auth.api.getSession() inside route
    // handlers actually write the refreshed cookie back to the browser.
    // Must be the last plugin.
    nextCookies(),
  ],
});
