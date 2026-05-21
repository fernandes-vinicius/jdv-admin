"use server";

import type { SalesPlan } from "@/features/commercial/goals/types/goals-types";
import { serverApi } from "@/lib/api/server";

export async function getSalesPlans(year?: number): Promise<SalesPlan[]> {
  const params = year ? `?year=${year}` : "";
  return serverApi.get<SalesPlan[]>(`/sales-plans${params}`);
}
