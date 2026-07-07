"use client";

import { useQuery } from "@tanstack/react-query";
import { getFunnelConfig } from "@/features/funnel-config/actions/get-funnel-config";

export function useFunnelConfig() {
  return useQuery({
    queryKey: ["funnel-config"],
    queryFn: getFunnelConfig,
  });
}
