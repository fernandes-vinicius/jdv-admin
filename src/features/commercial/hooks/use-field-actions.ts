"use client";

import { useQuery } from "@tanstack/react-query";
import { getFieldActions } from "@/features/commercial/actions/get-field-actions";
import { FieldActionType } from "@/features/commercial/types/commercial-types";

export type FieldActionFilter = FieldActionType | "all";

const queryFnMap: Record<
  FieldActionFilter,
  () => Promise<Awaited<ReturnType<typeof getFieldActions>>>
> = {
  all: getFieldActions,
  [FieldActionType.FIELD_ACTION]: getFieldActions,
  [FieldActionType.TRAINING]: () => Promise.resolve([]),
};

export function useFieldActions(filter: FieldActionFilter = "all") {
  return useQuery({
    queryKey: ["field-actions", filter],
    queryFn: queryFnMap[filter],
  });
}
