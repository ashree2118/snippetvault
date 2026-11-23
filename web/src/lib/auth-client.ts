import { createAuthClient } from "better-auth/react";

// No baseURL: the client talks to whatever domain the site is served from
// (snippet.anushreesh.com in production, localhost in development).
export const authClient = createAuthClient();

export const {  signIn, signOut, useSession } = authClient;
