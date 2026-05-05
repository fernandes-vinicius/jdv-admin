"use server";

import type { User } from "@/features/users/types/users-types";
import { serverApi } from "@/lib/api/server";

export async function getUsers(): Promise<User[]> {
  return serverApi.get<User[]>("/users");
}
