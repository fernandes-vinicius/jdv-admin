"use server";

import { ChecklistType } from "@/features/commercial/checklist-item/types/checklist-item-types";
import { serverApi } from "@/lib/api/server";

const endpointMap: Record<ChecklistType, string> = {
  [ChecklistType.BASE]: "/stand-check-items",
  [ChecklistType.DAILY]: "/check-items-daily",
  [ChecklistType.AWARDS]: "/check-items-award",
};

export async function deleteChecklistItem(id: string, type: ChecklistType) {
  return serverApi.delete(`${endpointMap[type]}/${id}`);
}
