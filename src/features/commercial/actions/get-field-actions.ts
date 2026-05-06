"use server";

import type {
  ApiFieldActionItem,
  FieldActionItem,
} from "@/features/commercial/types/commercial-types";
import { FieldActionType } from "@/features/commercial/types/commercial-types";
import { serverApi } from "@/lib/api/server";

export async function getFieldActions(): Promise<FieldActionItem[]> {
  const raw = await serverApi.get<ApiFieldActionItem[]>("/field-actions");
  return raw.map((item) => ({
    id: item.id,
    label: item.nome,
    icon_name: item.icon_name,
    type: FieldActionType.FIELD_ACTION,
  }));
}
