"use server";

import type { Building } from "@/features/building/types/building-types";

const MOCK_BUILDINGS: Building[] = [
  { id: "1", name: "Jardim das Violetas", empreendimento_id: "1" },
  { id: "2", name: "Residencial Solar das Flores", empreendimento_id: "2" },
  { id: "3", name: "Parque das Acácias", empreendimento_id: "3" },
  { id: "4", name: "Reserva Verde", empreendimento_id: "4" },
  { id: "5", name: "Alto do Ipê", empreendimento_id: "5" },
  { id: "6", name: "Vila Primavera", empreendimento_id: "6" },
  { id: "7", name: "Terraço Nobre", empreendimento_id: "7" },
  { id: "8", name: "Bosque dos Cedros", empreendimento_id: "8" },
  { id: "9", name: "Quinta da Aurora", empreendimento_id: "9" },
  { id: "10", name: "Horizonte Sul", empreendimento_id: "10" },
  { id: "11", name: "Mirante das Palmeiras", empreendimento_id: "11" },
  { id: "12", name: "Espaço Cerrado", empreendimento_id: "12" },
];

export async function getBuildings(): Promise<Building[]> {
  return MOCK_BUILDINGS;
}
