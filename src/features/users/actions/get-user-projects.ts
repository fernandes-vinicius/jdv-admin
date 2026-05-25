"use server";

import type { UserProjectPermission } from "@/features/users/types/users-types";
import { serverApi } from "@/lib/api/server";

export async function getUserProjects(
  userId: string,
): Promise<UserProjectPermission[]> {
  return serverApi.get<UserProjectPermission[]>(`/users/${userId}/projects`);
}
