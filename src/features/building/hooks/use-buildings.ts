"use client";

import { useQuery } from "@tanstack/react-query";
import { getBuildings } from "@/features/building/actions/get-buildings";

export function useBuildings() {
  return useQuery({
    queryKey: ["buildings"],
    queryFn: getBuildings,
  });
}
