import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://saveto-snippet.vercel.app" 
});

export const {  signIn, signOut, useSession } = authClient;