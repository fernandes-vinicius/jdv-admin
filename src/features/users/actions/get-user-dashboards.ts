"use server";

import { serverApi } from "@/lib/api/server";
import type { UserDashboardPermission } from "@/features/users/types/users-types";

export async function getUserDashboards(
  userId: string,
): Promise<UserDashboardPermission[]> {
  return serverApi.get<UserDashboardPermission[]>(`/users/${userId}/dashboards`);
}
