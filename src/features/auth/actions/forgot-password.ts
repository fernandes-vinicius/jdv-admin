"use server";

import { api } from "@/lib/api";

export async function forgotPassword(email: string) {
  return api.post<{ status: string }>("/auth/password/forgot", { email });
}
