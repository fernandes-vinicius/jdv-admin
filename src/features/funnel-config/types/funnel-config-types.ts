export interface FunnelConfig {
  id: number;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
}

export interface UpsertFunnelConfigRequest {
  start_date: string;
  end_date: string;
}
