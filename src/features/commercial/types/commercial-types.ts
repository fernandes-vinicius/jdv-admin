export enum ChecklistType {
  BASE = "base",
  DAILY = "diario",
  AWARDS = "premiacao",
}

export interface ChecklistItem {
  id: string;
  label: string;
  type: ChecklistType;
}

export interface ApiChecklistItem {
  id: string;
  label: string;
  code: string;
  icon_name: string;
  is_active: boolean;
  display_order: number;
  empreendimento_id: number;
  created_at: string;
  updated_at: string;
}
