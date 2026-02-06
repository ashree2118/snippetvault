import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://snippet-two-rust.vercel.app" 
});

export const { signIn, signOut, useSession } = authClient;