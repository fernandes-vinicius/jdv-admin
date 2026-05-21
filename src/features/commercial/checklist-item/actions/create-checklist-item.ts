"use server";

import { ChecklistType } from "@/features/commercial/checklist-item/types/checklist-item-types";
import { serverApi } from "@/lib/api/server";
import { slugify } from "@/lib/utils";

interface CreateChecklistItemPayload {
  label: string;
  type: ChecklistType;
  icon_name: string;
}

const endpointMap: Record<ChecklistType, string> = {
  [ChecklistType.BASE]: "/stand-check-items",
  [ChecklistType.DAILY]: "/check-items-daily",
  [ChecklistType.AWARDS]: "/check-items-award",
};

export async function createChecklistItem({
  label,
  type,
  icon_name,
}: CreateChecklistItemPayload) {
  return serverApi.post(endpointMap[type], {
    code: slugify(label),
    label,
    icon_name,
    display_order: 0,
    is_active: true,
  });
}
