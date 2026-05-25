"use server";

import type { UserProjectPermission } from "@/features/users/types/users-types";
import { serverApi } from "@/lib/api/server";

export async function saveUserProjects(
  userId: string,
  projectIds: number[],
): Promise<UserProjectPermission[]> {
  return serverApi.put<UserProjectPermission[]>(`/users/${userId}/projects`, {
    project_ids: projectIds,
  });
}
