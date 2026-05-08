"use server";

import type { Building } from "@/features/building/types/building-types";

const MOCK_BUILDINGS: Building[] = [
  { id: "1", name: "Jardim das Violetas" },
  { id: "2", name: "Residencial Solar das Flores" },
  { id: "3", name: "Parque das Acácias" },
  { id: "4", name: "Reserva Verde" },
  { id: "5", name: "Alto do Ipê" },
  { id: "6", name: "Vila Primavera" },
  { id: "7", name: "Terraço Nobre" },
  { id: "8", name: "Bosque dos Cedros" },
  { id: "9", name: "Quinta da Aurora" },
  { id: "10", name: "Horizonte Sul" },
  { id: "11", name: "Mirante das Palmeiras" },
  { id: "12", name: "Espaço Cerrado" },
];

export async function getBuildings(): Promise<Building[]> {
  return MOCK_BUILDINGS;
}
