"use server";

import { serverApi } from "@/lib/api/server";

export async function createBuilding(name: string) {
  return serverApi.post("/buildings", { name });
}
