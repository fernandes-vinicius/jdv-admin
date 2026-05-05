"use server";

import { api } from "@/lib/api";

export async function resetPassword(token: string, new_password: string) {
  return api.post<{ status: string }>("/auth/password/reset", {
    token,
    new_password,
  });
}
