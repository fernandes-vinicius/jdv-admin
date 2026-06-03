"use client";

import { parseAsStringLiteral, useQueryState } from "nuqs";

const PARAM_KEY = "is_admin";

const filterKeys = ["all", "true", "false"] as const;

export type UserAdminFilterKey = (typeof filterKeys)[number];

const adminFilterParser = parseAsStringLiteral(filterKeys).withDefault("all");

export function useUserAdminFilter() {
  const [key, setKey] = useQueryState(
    PARAM_KEY,
    adminFilterParser.withOptions({ history: "replace", shallow: false }),
  );

  return { key, setKey };
}
