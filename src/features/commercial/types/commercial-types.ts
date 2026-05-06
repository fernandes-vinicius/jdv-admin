export enum FieldActionType {
  FIELD_ACTION = "acao",
  TRAINING = "treinamento",
}

export interface FieldActionItem {
  id: string;
  icon_name: string;
  label: string;
  type: FieldActionType;
}

export interface ApiFieldActionItem {
  id: string;
  nome: string;
  code: string;
  type: string;
  icon_name: string;
  descricao: string;
  resultado: string;
  detalhe: string;
  custo: string;
  accent: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
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
