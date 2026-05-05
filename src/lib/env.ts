import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NEXTAUTH_SECRET: z.string().min(32),
    API_URL: z.url(),
    API_VERSION: z.string().min(1),
  },
  client: {},
  runtimeEnv: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    API_URL: process.env.API_URL,
    API_VERSION: process.env.API_VERSION,
  },
});
