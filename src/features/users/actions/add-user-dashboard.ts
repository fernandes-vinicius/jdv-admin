"use server";

import { serverApi } from "@/lib/api/server";
import type { UserDashboardPermission } from "@/features/users/types/users-types";

export async function addUserDashboard(
  userId: string,
  dashboardId: string,
): Promise<UserDashboardPermission> {
  return serverApi.post<UserDashboardPermission>(
    `/users/${userId}/dashboards`,
    {
      dashboard_id: dashboardId,
    },
  );
}
