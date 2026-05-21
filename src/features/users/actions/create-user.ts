"use server";

import type { User } from "@/features/users/types/users-types";
import { serverApi } from "@/lib/api/server";

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export async function createUser(
  payload: RegisterPayload,
): Promise<{ user: User }> {
  return serverApi.post<{ user: User }>("/auth/register", payload);
}
