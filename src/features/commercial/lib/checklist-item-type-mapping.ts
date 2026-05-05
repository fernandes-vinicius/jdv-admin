import { ChecklistType } from "@/features/commercial/types/commercial-types";

export const checklistItemTypeMapping: Record<ChecklistType, string> = {
  [ChecklistType.BASE]: "Base do estande",
  [ChecklistType.DAILY]: "Rotina diária",
  [ChecklistType.AWARDS]: "Premiação semanal",
};
