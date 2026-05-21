export interface SalesPlanMonth {
  month: number;
  planned_sales: number;
}

export interface SalesPlan {
  id: string;
  empreendimento_id: number;
  empreendimento_name: string;
  year: number;
  estoque_inicial: number;
  vendas_total: number;
  estoque_final: number;
  months: SalesPlanMonth[];
  created_at: string;
  updated_at: string;
}

export interface CreateSalesPlanPayload {
  empreendimento_id: number;
  year: number;
  estoque_inicial: number;
  monthly_sales: number[];
}

export interface UpdateSalesPlanPayload {
  estoque_inicial?: number;
  monthly_sales?: number[];
}
