"use server";

import { serverApi } from "@/lib/api/server";

export async function updateUserPassword(
  id: string,
  new_password: string,
  must_change_password: boolean,
) {
  return serverApi.put(`/users/${id}/password`, {
    new_password,
    must_change_password,
  });
}
