"use client";

import { useQuery } from "@tanstack/react-query";
import { getLoginHistory } from "@/features/auth/actions/get-login-history";

export function useLoginHistory() {
  return useQuery({
    queryKey: ["login-history"],
    queryFn: () => getLoginHistory(),
  });
}
