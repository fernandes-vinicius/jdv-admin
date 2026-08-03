import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TestProviders } from "@/test/providers";
import {
  type ChecklistItem,
  ChecklistPeriod,
  ChecklistType,
} from "../../types/checklist-item-types";
import { ChecklistItemDataTable } from "../checklist-item-datatable";

const items: ChecklistItem[] = [
  {
    id: "d1",
    label: "Verificar funil",
    type: ChecklistType.DAILY,
    icon_name: "Target",
    end_time: "10:00",
    period: ChecklistPeriod.MORNING,
  },
  {
    id: "b1",
    label: "Abrir estande",
    type: ChecklistType.BASE,
    icon_name: "Flag",
  },
];

vi.mock(
  "@/features/commercial/checklist-item/hooks/use-checklist-items",
  () => ({
    useChecklistItems: () => ({
      data: items,
      isPending: false,
      isError: false,
    }),
  }),
);

vi.mock(
  "@/features/commercial/checklist-item/hooks/use-checklist-type-filter",
  () => ({
    useChecklistTypeFilter: () => ({
      key: "all",
      setKey: vi.fn(),
      filter: "all",
    }),
  }),
);

function renderTable() {
  return render(
    <TestProviders>
      <ChecklistItemDataTable />
    </TestProviders>,
  );
}

describe("ChecklistItemDataTable", () => {
  it("exibe o badge de período para item DAILY", () => {
    renderTable();
    expect(screen.getByText("Manhã")).toBeInTheDocument();
  });

  it("não exibe badge de período para item BASE", () => {
    renderTable();
    const row = screen.getByText("Abrir estande").closest("tr");
    expect(row).not.toBeNull();
    expect(row?.textContent).not.toContain("Manhã");
  });
});
