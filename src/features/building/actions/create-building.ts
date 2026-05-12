"use server";

import type { Building, CreateBuildingPayload } from "@/features/building/types/building-types";
import { serverApi } from "@/lib/api/server";

export async function createBuilding(payload: CreateBuildingPayload): Promise<Building> {
  return serverApi.post<Building>("/empreendimentos", payload);
}
