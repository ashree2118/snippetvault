import { auth } from "@/lib/auth"; // import from your lib/auth.ts
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);