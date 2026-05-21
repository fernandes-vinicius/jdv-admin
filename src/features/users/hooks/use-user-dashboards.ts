"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserDashboards } from "@/features/users/actions/get-user-dashboards";

export function useUserDashboards(userId: string) {
  return useQuery({
    queryKey: ["user-dashboards", userId],
    queryFn: () => getUserDashboards(userId),
    enabled: !!userId,
  });
}
