"use server";

import type { FunnelConfig } from "@/features/funnel-config/types/funnel-config-types";
import { serverApi } from "@/lib/api/server";
import { ApiError } from "@/types/api";

export async function getFunnelConfig(): Promise<FunnelConfig | null> {
  try {
    return await serverApi.get<FunnelConfig>("/funnel-config");
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }
    throw error;
  }
}
