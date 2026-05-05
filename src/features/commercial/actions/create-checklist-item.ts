"use server";

import { serverApi } from "@/lib/api/server";
import { ChecklistType } from "@/features/commercial/types/commercial-types";

interface CreateChecklistItemPayload {
  label: string;
  type: ChecklistType;
}

const endpointMap: Record<ChecklistType, string> = {
  [ChecklistType.BASE]: "/stand-check-items",
  [ChecklistType.DAILY]: "/check-items-daily",
  [ChecklistType.AWARDS]: "/check-items-award",
};

export async function createChecklistItem({ label, type }: CreateChecklistItemPayload) {
  return serverApi.post(endpointMap[type], {
    code: type,
    display_order: 1,
    icon_name: "",
    is_active: true,
    label,
  });
}
