"use client";

import { parseAsStringLiteral, useQueryState } from "nuqs";
import type { ChecklistFilter } from "@/features/commercial/checklist-item/hooks/use-checklist-items";
import { ChecklistType } from "@/features/commercial/checklist-item/types/checklist-item-types";

const PARAM_KEY = "item_type";

const filterKeys = ["all", ...Object.keys(ChecklistType)] as const;

export type ChecklistFilterKey = (typeof filterKeys)[number];

const checklistFilterParser =
  parseAsStringLiteral(filterKeys).withDefault("all");

function keyToFilter(key: ChecklistFilterKey): ChecklistFilter {
  if (key === "all") return "all";
  return ChecklistType[key as keyof typeof ChecklistType];
}

export function useChecklistTypeFilter() {
  const [key, setKey] = useQueryState(
    PARAM_KEY,
    checklistFilterParser.withOptions({ history: "replace", shallow: false }),
  );

  return { key, setKey, filter: keyToFilter(key) };
}
