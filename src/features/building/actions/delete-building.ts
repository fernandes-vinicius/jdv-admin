"use server";

import { serverApi } from "@/lib/api/server";

export async function deleteBuilding(id: string) {
  return serverApi.delete(`/buildings/${id}`);
}
