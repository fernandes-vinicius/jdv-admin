"use client";

import { parseAsStringLiteral, useQueryState } from "nuqs";
import type { FieldActionFilter } from "@/features/commercial/hooks/use-field-actions";
import { FieldActionType } from "@/features/commercial/types/commercial-types";

const PARAM_KEY = "fa_type";

const filterKeys = ["all", ...Object.keys(FieldActionType)] as const;

export type FieldActionFilterKey = (typeof filterKeys)[number];

const fieldActionFilterParser =
  parseAsStringLiteral(filterKeys).withDefault("all");

function keyToFilter(key: FieldActionFilterKey): FieldActionFilter {
  if (key === "all") return "all";
  return FieldActionType[key as keyof typeof FieldActionType];
}

export function useFieldActionTypeFilter() {
  const [key, setKey] = useQueryState(
    PARAM_KEY,
    fieldActionFilterParser.withOptions({ history: "replace", shallow: false }),
  );

  return { key, setKey, filter: keyToFilter(key) };
}
