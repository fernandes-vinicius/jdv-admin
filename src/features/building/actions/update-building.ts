"use server";

import { serverApi } from "@/lib/api/server";

export async function updateBuilding(id: string, name: string) {
  return serverApi.put(`/buildings/${id}`, { name });
}
