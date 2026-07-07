"use server";

import type {
  FunnelConfig,
  UpsertFunnelConfigRequest,
} from "@/features/funnel-config/types/funnel-config-types";
import { serverApi } from "@/lib/api/server";

export async function upsertFunnelConfig(
  payload: UpsertFunnelConfigRequest,
): Promise<FunnelConfig> {
  return serverApi.put<FunnelConfig>("/funnel-config", payload);
}
