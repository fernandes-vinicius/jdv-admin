"use client";

import { useQuery } from "@tanstack/react-query";
import { getDashboards } from "@/features/dashboards/actions/get-dashboards";

export function useDashboards() {
  return useQuery({
    queryKey: ["dashboards"],
    queryFn: getDashboards,
  });
}
