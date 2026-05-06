"use server";

import { api } from "@/lib/api";

type RefreshResponse = {
  access_token: string;
  refresh_token: string;
};

export async function refreshAccessToken(refreshToken: string) {
  return api.post<RefreshResponse>("/auth/refresh", {
    refresh_token: refreshToken,
  });
}
