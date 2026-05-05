"use server";

import { ChecklistType } from "@/features/commercial/types/commercial-types";
import { serverApi } from "@/lib/api/server";

interface UpdateChecklistItemPayload {
  id: string;
  type: ChecklistType;
  label: string;
}

const endpointMap: Record<ChecklistType, string> = {
  [ChecklistType.BASE]: "/stand-check-items",
  [ChecklistType.DAILY]: "/check-items-daily",
  [ChecklistType.AWARDS]: "/check-items-award",
};

export async function updateChecklistItem({
  id,
  type,
  label,
}: UpdateChecklistItemPayload) {
  return serverApi.put(`${endpointMap[type]}/${id}`, {
    // code: type,
    display_order: 1,
    // icon_name: "",
    is_active: true,
    label,
  });
}
