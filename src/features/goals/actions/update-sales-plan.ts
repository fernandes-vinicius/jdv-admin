"use server";

import type {
  SalesPlan,
  UpdateSalesPlanPayload,
} from "@/features/goals/types/goals-types";
import { serverApi } from "@/lib/api/server";

export async function updateSalesPlan(
  id: string,
  payload: UpdateSalesPlanPayload,
): Promise<SalesPlan> {
  return serverApi.put<SalesPlan>(`/sales-plans/${id}`, payload);
}
