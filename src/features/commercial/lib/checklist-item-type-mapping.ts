import { ChecklistType } from "@/features/commercial/types/commercial-types";

export type ChecklistTypeEntry = {
  label: string;
  color: string;
};

export const checklistItemTypeMapping: Record<
  ChecklistType,
  ChecklistTypeEntry
> = {
  [ChecklistType.BASE]: { label: "Base do estande", color: "bg-green-500" },
  [ChecklistType.DAILY]: { label: "Rotina diária", color: "bg-blue-500" },
  [ChecklistType.AWARDS]: {
    label: "Premiação semanal",
    color: "bg-yellow-500",
  },
};
