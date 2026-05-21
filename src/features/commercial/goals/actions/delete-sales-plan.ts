"use server";

import { serverApi } from "@/lib/api/server";

export async function deleteSalesPlan(id: string): Promise<void> {
  return serverApi.delete(`/sales-plans/${id}`);
}
