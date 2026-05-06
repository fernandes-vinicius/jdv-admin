"use client";

import { useQuery } from "@tanstack/react-query";
import { getAwardChecklistItems } from "@/features/commercial/actions/get-award-checklist-items";
import { getDailyChecklistItems } from "@/features/commercial/actions/get-daily-checklist-items";
import { getStandChecklistItems } from "@/features/commercial/actions/get-stand-checklist-items";
import { ChecklistType } from "@/features/commercial/types/commercial-types";

export type ChecklistFilter = ChecklistType | "all";

const queryFnMap: Record<
  ChecklistFilter,
  () => Promise<Awaited<ReturnType<typeof getDailyChecklistItems>>>
> = {
  all: () =>
    Promise.all([
      getDailyChecklistItems(),
      getAwardChecklistItems(),
      getStandChecklistItems(),
    ]).then((results) => results.flat()),
  [ChecklistType.DAILY]: getDailyChecklistItems,
  [ChecklistType.AWARDS]: getAwardChecklistItems,
  [ChecklistType.BASE]: getStandChecklistItems,
};

export function useChecklistItems(filter: ChecklistFilter = "all") {
  return useQuery({
    queryKey: ["checklist-items", filter],
    queryFn: queryFnMap[filter],
  });
}
