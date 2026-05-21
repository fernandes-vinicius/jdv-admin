import { ChecklistType } from "@/features/commercial/checklist-item/types/checklist-item-types";

export type ChecklistTypeEntry = {
  label: string;
  color: string;
  iconBgClass: string;
  iconTextClass: string;
};

export const checklistItemTypeMapping: Record<
  ChecklistType,
  ChecklistTypeEntry
> = {
  [ChecklistType.BASE]: {
    label: "Base do estande",
    color: "bg-green-500",
    iconBgClass: "bg-green-500/10",
    iconTextClass: "text-green-500",
  },
  [ChecklistType.DAILY]: {
    label: "Rotina diária",
    color: "bg-blue-500",
    iconBgClass: "bg-blue-500/10",
    iconTextClass: "text-blue-500",
  },
  [ChecklistType.AWARDS]: {
    label: "Premiação semanal",
    color: "bg-yellow-500",
    iconBgClass: "bg-yellow-500/10",
    iconTextClass: "text-yellow-500",
  },
};
