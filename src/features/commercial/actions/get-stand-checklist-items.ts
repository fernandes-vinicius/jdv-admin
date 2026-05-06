"use server";

import type {
  ApiChecklistItem,
  ChecklistItem,
} from "@/features/commercial/types/commercial-types";
import { ChecklistType } from "@/features/commercial/types/commercial-types";
import { serverApi } from "@/lib/api/server";

export async function getStandChecklistItems(): Promise<ChecklistItem[]> {
  const raw = await serverApi.get<ApiChecklistItem[]>("/stand-check-items");
  return raw.map((item) => ({
    id: item.id,
    label: item.label,
    type: ChecklistType.BASE,
    icon_name: item.icon_name,
  }));
}
