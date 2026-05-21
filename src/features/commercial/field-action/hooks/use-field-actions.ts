"use client";

import { useQuery } from "@tanstack/react-query";
import { getFieldActions } from "@/features/commercial/field-action/actions/get-field-actions";
import type { FieldActionType } from "@/features/commercial/field-action/types/field-action-types";

export type FieldActionFilter = FieldActionType | "all";

export function useFieldActions(filter: FieldActionFilter = "all") {
  return useQuery({
    queryKey: ["field-actions"],
    queryFn: getFieldActions,
    select: (data) =>
      filter === "all" ? data : data.filter((item) => item.type === filter),
  });
}
