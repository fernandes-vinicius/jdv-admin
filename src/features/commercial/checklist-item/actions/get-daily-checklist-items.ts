"use server";

import type {
  ApiChecklistItem,
  ChecklistItem,
} from "@/features/commercial/checklist-item/types/checklist-item-types";
import { ChecklistType } from "@/features/commercial/checklist-item/types/checklist-item-types";
import { serverApi } from "@/lib/api/server";

export async function getDailyChecklistItems(): Promise<ChecklistItem[]> {
  const raw = await serverApi.get<ApiChecklistItem[]>("/check-items-daily");
  return raw.map((item) => ({
    id: item.id,
    label: item.label,
    type: ChecklistType.DAILY,
    icon_name: item.icon_name,
  }));
}
