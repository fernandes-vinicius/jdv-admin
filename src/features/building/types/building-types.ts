export interface Building {
  id: string;
  empreendimento_id: number;
  name: string;
  codigo_interno_do_empreendimento: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateBuildingPayload {
  empreendimento_id: number;
  name: string;
  codigo_interno_do_empreendimento?: string | null;
  is_active?: boolean;
}

export interface UpdateBuildingPayload {
  name?: string;
  codigo_interno_do_empreendimento?: string | null;
  is_active?: boolean;
}
