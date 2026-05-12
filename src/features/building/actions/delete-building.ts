"use server";

import { serverApi } from "@/lib/api/server";

export async function deleteBuilding(id: string): Promise<void> {
  return serverApi.delete<void>(`/empreendimentos/${id}`);
}
