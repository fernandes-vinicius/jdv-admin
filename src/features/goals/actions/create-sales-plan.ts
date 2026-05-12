"use server";

import type {
  CreateSalesPlanPayload,
  SalesPlan,
} from "@/features/goals/types/goals-types";
import { serverApi } from "@/lib/api/server";

export async function createSalesPlan(
  payload: CreateSalesPlanPayload,
): Promise<SalesPlan> {
  return serverApi.post<SalesPlan>("/sales-plans", payload);
}
