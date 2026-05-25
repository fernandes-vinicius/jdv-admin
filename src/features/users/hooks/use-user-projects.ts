"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserProjects } from "@/features/users/actions/get-user-projects";

export function useUserProjects(userId: string) {
  return useQuery({
    queryKey: ["user-projects", userId],
    queryFn: () => getUserProjects(userId),
    enabled: !!userId,
  });
}
