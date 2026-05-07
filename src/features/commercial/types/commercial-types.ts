export enum FieldActionType {
  FIELD_ACTION = "field_action",
  TRAINING = "training",
}

export interface FieldAction {
  id: string;
  code: string;
  nome: string;
  descricao: string;
  resultado: string;
  custo: string;
  detalhe: string;
  icon_name: string;
  accent: string;
  type: FieldActionType;
  is_active: boolean;
  display_order: number;
}

export enum ChecklistType {
  BASE = "base",
  DAILY = "diario",
  AWARDS = "premiacao",
}

export interface ChecklistItem {
  id: string;
  label: string;
  type: ChecklistType;
  icon_name: string;
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
