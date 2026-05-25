export interface Building {
  id: string;
  empreendimento_id: number;
  name: string;
  codigo_interno_do_empreendimento: number | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateBuildingPayload {
  codigo_interno_do_empreendimento?: number | null;
  empreendimento_id: number;
  is_active?: boolean;
  name: string;
}

export interface UpdateBuildingPayload {
  name?: string;
  codigo_interno_do_empreendimento?: number | null;
  is_active?: boolean;
}
