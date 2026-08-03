import {
  type IconComponentType,
  MoonIcon,
  SunIcon,
  SunriseIcon,
} from "@/components/icons";
import { ChecklistPeriod } from "@/features/commercial/checklist-item/types/checklist-item-types";

export type ChecklistPeriodEntry = {
  label: string;
  color: string;
};

export const checklistItemPeriodMapping: Record<
  ChecklistPeriod,
  ChecklistPeriodEntry
> = {
  [ChecklistPeriod.MORNING]: {
    label: "Manhã",
    color: "bg-amber-500",
  },
  [ChecklistPeriod.AFTERNOON]: {
    label: "Tarde",
    color: "bg-orange-500",
  },
  [ChecklistPeriod.EVENING]: {
    label: "Noite",
    color: "bg-indigo-500",
  },
};

/** Estilo do quadro kanban de reordenação (checklist-item-period-reorder-list) —
 * um período por coluna, com cor forte no header pra diferenciar à distância. */
export type ChecklistPeriodTheme = {
  timeLabel: string;
  Icon: IconComponentType;
  headerClassName: string;
  contentClassName: string;
  itemIconClassName: string;
  btnClassname: string;
};

export const checklistItemPeriodTheme: Record<
  ChecklistPeriod,
  ChecklistPeriodTheme
> = {
  [ChecklistPeriod.MORNING]: {
    timeLabel: "até 12:00",
    Icon: SunriseIcon,
    headerClassName: `bg-gradient-to-br from-yellow-500 text-white to-yellow-600`,
    contentClassName: "bg-yellow-50 dark:bg-yellow-950/20",
    itemIconClassName: "bg-yellow-500/10 text-yellow-600",
    btnClassname: "border-yellow-500 text-yellow-600 dark:text-yellow-200",
  },
  [ChecklistPeriod.AFTERNOON]: {
    timeLabel: "até 18:00",
    Icon: SunIcon,
    headerClassName: `bg-gradient-to-br from-orange-400 text-white to-orange-600`,
    contentClassName: "bg-orange-50 dark:bg-orange-950/20",
    itemIconClassName: "bg-orange-500/10 text-orange-600",
    btnClassname: "border-orange-500 text-orange-600 dark:text-orange-200",
  },
  [ChecklistPeriod.EVENING]: {
    timeLabel: "após 18:00",
    Icon: MoonIcon,
    headerClassName: `bg-gradient-to-br from-indigo-400 text-white to-indigo-600`,
    contentClassName: "bg-indigo-50 dark:bg-indigo-950/20",
    itemIconClassName: "bg-indigo-500/10 text-indigo-600",
    btnClassname: "border-indigo-500 text-indigo-600 dark:text-indigo-200",
  },
};
