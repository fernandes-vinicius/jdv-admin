"use server";

import { getServerSession } from "next-auth";
import { api } from "@/lib/api";
import { authOptions } from "@/lib/auth";
import type { LoginHistoryEntry } from "@/features/auth/types/auth-types";

export async function getLoginHistory(
  limit = 20,
  offset = 0,
): Promise<LoginHistoryEntry[]> {
  const session = await getServerSession(authOptions);
  return api.get<LoginHistoryEntry[]>(
    `/auth/login-history?limit=${limit}&offset=${offset}`,
    {
      headers: session?.accessToken
        ? { Authorization: `Bearer ${session.accessToken}` }
        : {},
    },
  );
}
