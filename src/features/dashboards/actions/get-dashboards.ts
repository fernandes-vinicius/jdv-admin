"use server";

import { serverApi } from "@/lib/api/server";
import type { Dashboard } from "@/features/dashboards/types/dashboard-types";

export async function getDashboards(): Promise<Dashboard[]> {
  return serverApi.get<Dashboard[]>("/dashboards?is_active=true");
}
