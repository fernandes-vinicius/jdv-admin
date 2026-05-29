"use server";

import { getServerSession } from "next-auth";
import { api } from "@/lib/api";
import { authOptions } from "@/lib/auth";

export async function changePassword(
  current_password: string,
  new_password: string,
) {
  const session = await getServerSession(authOptions);
  return api.post(
    "/auth/password",
    { current_password, new_password },
    {
      headers: session?.accessToken
        ? { Authorization: `Bearer ${session.accessToken}` }
        : {},
    },
  );
}
