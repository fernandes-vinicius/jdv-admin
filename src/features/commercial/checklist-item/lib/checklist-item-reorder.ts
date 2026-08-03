import { arrayMove } from "@dnd-kit/sortable";
import {
  type ChecklistItem,
  ChecklistPeriod,
} from "@/features/commercial/checklist-item/types/checklist-item-types";

export function groupDailyItemsByPeriod(
  items: ChecklistItem[],
): Record<ChecklistPeriod, ChecklistItem[]> {
  const groups: Record<ChecklistPeriod, ChecklistItem[]> = {
    [ChecklistPeriod.MORNING]: [],
    [ChecklistPeriod.AFTERNOON]: [],
    [ChecklistPeriod.EVENING]: [],
  };

  for (const item of items) {
    if (item.period && item.period in groups) {
      groups[item.period].push(item);
    }
  }

  return groups;
}

/** Espelha o array de IDs movendo activeId pra posição de overId — o
 * mesmo cálculo que o onDragEnd de um DndContext do dnd-kit precisa,
 * extraído aqui pra ser testável sem simular um gesto de drag real. */
export function reorderIds(
  ids: string[],
  activeId: string,
  overId: string,
): string[] {
  const oldIndex = ids.indexOf(activeId);
  const newIndex = ids.indexOf(overId);
  if (oldIndex === -1 || newIndex === -1) return ids;
  return arrayMove(ids, oldIndex, newIndex);
}
