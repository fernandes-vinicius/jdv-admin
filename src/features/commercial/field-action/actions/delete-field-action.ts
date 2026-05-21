"use server";

import { serverApi } from "@/lib/api/server";

export async function deleteFieldAction(id: string) {
  return serverApi.delete(`/field-actions/${id}`);
}
