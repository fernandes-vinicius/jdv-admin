export enum ChecklistType {
  BASE = "base",
  DAILY = "diario",
  AWARDS = "premiacao",
}

export enum ChecklistPeriod {
  MORNING = "morning",
  AFTERNOON = "afternoon",
  EVENING = "evening",
}

export interface ChecklistItem {
  id: string;
  label: string;
  type: ChecklistType;
  icon_name: string;
  /** Só populados para type === ChecklistType.DAILY. */
  start_time?: string;
  end_time?: string;
  /** Derivado de end_time pelo backend — somente leitura. */
  period?: ChecklistPeriod;
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
  /** Presentes apenas na resposta de /check-items-daily. */
  start_time?: string;
  end_time?: string;
  period?: string;
}
