"use client";

import { parseAsStringLiteral, useQueryState } from "nuqs";

const PARAM_KEY = "tab";

const tabKeys = ["itens", "reordenar"] as const;

export type ChecklistPageTab = (typeof tabKeys)[number];

const checklistPageTabParser =
  parseAsStringLiteral(tabKeys).withDefault("itens");

export function useChecklistPageTab() {
  return useQueryState(
    PARAM_KEY,
    checklistPageTabParser.withOptions({ history: "replace", shallow: false }),
  );
}
