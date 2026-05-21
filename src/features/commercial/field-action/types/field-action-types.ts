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
