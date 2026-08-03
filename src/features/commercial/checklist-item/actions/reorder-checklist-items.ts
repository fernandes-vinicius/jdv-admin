"use server";

import type { ChecklistPeriod } from "@/features/commercial/checklist-item/types/checklist-item-types";
import { serverApi } from "@/lib/api/server";

interface ReorderChecklistItemsPayload {
  period: ChecklistPeriod;
  item_ids: string[];
}

export async function reorderChecklistItems({
  period,
  item_ids,
}: ReorderChecklistItemsPayload) {
  return serverApi.put("/check-items-daily/reorder", { period, item_ids });
}
