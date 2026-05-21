"use server";

import type { FieldAction } from "@/features/commercial/field-action/types/field-action-types";
import { serverApi } from "@/lib/api/server";

export async function getFieldActions(): Promise<FieldAction[]> {
  return serverApi.get<FieldAction[]>("/field-actions");
}
