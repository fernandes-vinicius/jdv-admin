"use server";

import type { FieldActionType } from "@/features/commercial/field-action/types/field-action-types";
import { serverApi } from "@/lib/api/server";
import { slugify } from "@/lib/utils";

interface CreateFieldActionPayload {
  nome: string;
  descricao: string;
  resultado: string;
  custo?: string;
  detalhe?: string;
  icon_name: string;
  accent: string;
  type: FieldActionType;
  display_order?: number;
}

export async function createFieldAction({
  nome,
  descricao,
  resultado,
  custo,
  detalhe,
  icon_name,
  accent,
  type,
  display_order = 0,
}: CreateFieldActionPayload) {
  return serverApi.post("/field-actions", {
    code: slugify(nome),
    nome,
    descricao,
    resultado,
    icon_name,
    accent,
    type,
    display_order,
    is_active: true,
    ...(custo !== undefined && { custo }),
    ...(detalhe !== undefined && { detalhe }),
  });
}
