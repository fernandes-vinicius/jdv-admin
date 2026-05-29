"use server";

import type {
  Building,
  UpdateBuildingPayload,
} from "@/features/building/types/building-types";
import { serverApi } from "@/lib/api/server";

export async function updateBuilding(
  id: string,
  payload: UpdateBuildingPayload,
): Promise<Building> {
  return serverApi.put<Building>(`/empreendimentos/${id}`, payload);
}
