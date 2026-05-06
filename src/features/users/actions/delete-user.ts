"use server";

import { serverApi } from "@/lib/api/server";

export async function deleteUser(id: string) {
  return serverApi.delete(`/users/${id}`);
}
