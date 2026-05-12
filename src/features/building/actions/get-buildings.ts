"use server";

import type { Building } from "@/features/building/types/building-types";
import { serverApi } from "@/lib/api/server";

export async function getBuildings(): Promise<Building[]> {
  return serverApi.get<Building[]>("/empreendimentos");
}
