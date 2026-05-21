"use server";

import { serverApi } from "@/lib/api/server";

export async function removeUserDashboard(
  userId: string,
  permissionId: string,
): Promise<void> {
  return serverApi.delete(`/users/${userId}/dashboards/${permissionId}`);
}
