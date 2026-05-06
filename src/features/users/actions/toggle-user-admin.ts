"use server";

import { serverApi } from "@/lib/api/server";

export async function toggleUserAdmin(id: string, is_admin: boolean) {
  return serverApi.patch(`/users/${id}`, { is_admin });
}
