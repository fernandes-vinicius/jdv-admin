"use client";

import { useQuery } from "@tanstack/react-query";
import { getSalesPlans } from "@/features/goals/actions/get-sales-plans";

export function useSalesPlans(year?: number) {
  return useQuery({
    queryKey: ["sales-plans", year],
    queryFn: () => getSalesPlans(year),
  });
}
