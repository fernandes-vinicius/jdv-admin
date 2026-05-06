"use client";

import { getSession } from "next-auth/react";
import { createApi } from "@/lib/api";

export const clientApi = createApi(async (options) => {
  const session = await getSession();
  const token = session?.accessToken;

  return {
    ...options,
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };
});
