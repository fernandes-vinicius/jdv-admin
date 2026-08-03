import { describe, expect, it } from "vitest";
import {
  type ChecklistItem,
  ChecklistPeriod,
  ChecklistType,
} from "../../types/checklist-item-types";
import { groupDailyItemsByPeriod, reorderIds } from "../checklist-item-reorder";

function makeItem(overrides: Partial<ChecklistItem>): ChecklistItem {
  return {
    id: "id",
    label: "Item",
    type: ChecklistType.DAILY,
    icon_name: "Target",
    ...overrides,
  };
}

describe("groupDailyItemsByPeriod", () => {
  it("agrupa itens pelo period de cada um", () => {
    const items = [
      makeItem({ id: "m1", period: ChecklistPeriod.MORNING }),
      makeItem({ id: "a1", period: ChecklistPeriod.AFTERNOON }),
      makeItem({ id: "m2", period: ChecklistPeriod.MORNING }),
      makeItem({ id: "e1", period: ChecklistPeriod.EVENING }),
    ];

    const groups = groupDailyItemsByPeriod(items);

    expect(groups[ChecklistPeriod.MORNING].map((i) => i.id)).toEqual([
      "m1",
      "m2",
    ]);
    expect(groups[ChecklistPeriod.AFTERNOON].map((i) => i.id)).toEqual(["a1"]);
    expect(groups[ChecklistPeriod.EVENING].map((i) => i.id)).toEqual(["e1"]);
  });

  it("ignora itens sem period", () => {
    const items = [makeItem({ id: "no-period", period: undefined })];

    const groups = groupDailyItemsByPeriod(items);

    expect(groups[ChecklistPeriod.MORNING]).toEqual([]);
    expect(groups[ChecklistPeriod.AFTERNOON]).toEqual([]);
    expect(groups[ChecklistPeriod.EVENING]).toEqual([]);
  });

  it("retorna as 3 chaves mesmo com lista vazia", () => {
    const groups = groupDailyItemsByPeriod([]);

    expect(groups).toEqual({
      [ChecklistPeriod.MORNING]: [],
      [ChecklistPeriod.AFTERNOON]: [],
      [ChecklistPeriod.EVENING]: [],
    });
  });
});

describe("reorderIds", () => {
  it("move o item ativo pra posição do item alvo", () => {
    expect(reorderIds(["a", "b", "c"], "a", "c")).toEqual(["b", "c", "a"]);
    expect(reorderIds(["a", "b", "c"], "c", "a")).toEqual(["c", "a", "b"]);
  });

  it("retorna a lista original quando activeId ou overId não existem", () => {
    expect(reorderIds(["a", "b"], "x", "a")).toEqual(["a", "b"]);
    expect(reorderIds(["a", "b"], "a", "x")).toEqual(["a", "b"]);
  });

  it("retorna a mesma ordem quando activeId === overId", () => {
    expect(reorderIds(["a", "b", "c"], "b", "b")).toEqual(["a", "b", "c"]);
  });
});
