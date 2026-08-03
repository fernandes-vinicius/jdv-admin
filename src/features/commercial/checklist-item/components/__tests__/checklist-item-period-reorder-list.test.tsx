import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { TestProviders } from "@/test/providers";
import {
  type ChecklistItem,
  ChecklistPeriod,
  ChecklistType,
} from "../../types/checklist-item-types";
import { ChecklistItemPeriodReorderList } from "../checklist-item-period-reorder-list";

const mockMutate = vi.fn();

vi.mock(
  "@/features/commercial/checklist-item/hooks/use-reorder-checklist-items",
  () => ({
    useReorderChecklistItems: () => ({ mutate: mockMutate }),
  }),
);

const mockUseChecklistItems = vi.fn();

vi.mock(
  "@/features/commercial/checklist-item/hooks/use-checklist-items",
  () => ({
    useChecklistItems: (...args: unknown[]) => mockUseChecklistItems(...args),
  }),
);

const mockSetTab = vi.fn();

vi.mock(
  "@/features/commercial/checklist-item/hooks/use-checklist-page-tab",
  () => ({
    useChecklistPageTab: () => ["reordenar", mockSetTab],
  }),
);

function makeItem(overrides: Partial<ChecklistItem>): ChecklistItem {
  return {
    id: "id",
    label: "Item",
    type: ChecklistType.DAILY,
    icon_name: "Target",
    ...overrides,
  };
}

function renderList() {
  return render(
    <TestProviders>
      <ChecklistItemPeriodReorderList />
    </TestProviders>,
  );
}

describe("ChecklistItemPeriodReorderList", () => {
  it("exibe as 3 colunas de período", () => {
    mockUseChecklistItems.mockReturnValue({
      data: [],
      isPending: false,
      isError: false,
    });
    renderList();

    expect(screen.getByText("Manhã")).toBeInTheDocument();
    expect(screen.getByText("Tarde")).toBeInTheDocument();
    expect(screen.getByText("Noite")).toBeInTheDocument();
  });

  it("coloca cada item na coluna do seu período", () => {
    mockUseChecklistItems.mockReturnValue({
      data: [
        makeItem({
          id: "m1",
          label: "Ranking na TV",
          period: ChecklistPeriod.MORNING,
        }),
        makeItem({
          id: "a1",
          label: "Verificar funil",
          period: ChecklistPeriod.AFTERNOON,
        }),
        makeItem({
          id: "e1",
          label: "Fechar caixa",
          period: ChecklistPeriod.EVENING,
        }),
      ],
      isPending: false,
      isError: false,
    });
    renderList();

    const morningColumn = screen.getByText("Manhã").closest("[data-slot=card]");
    const afternoonColumn = screen
      .getByText("Tarde")
      .closest("[data-slot=card]");
    const eveningColumn = screen.getByText("Noite").closest("[data-slot=card]");

    expect(morningColumn?.textContent).toContain("Ranking na TV");
    expect(morningColumn?.textContent).not.toContain("Verificar funil");
    expect(afternoonColumn?.textContent).toContain("Verificar funil");
    expect(eveningColumn?.textContent).toContain("Fechar caixa");
  });

  it('exibe "Nenhum item ainda." pra período vazio', () => {
    mockUseChecklistItems.mockReturnValue({
      data: [],
      isPending: false,
      isError: false,
    });
    renderList();

    expect(screen.getAllByText("Nenhum item ainda.").length).toBe(3);
  });

  it("busca itens com o filtro DAILY", () => {
    mockUseChecklistItems.mockReturnValue({
      data: [],
      isPending: false,
      isError: false,
    });
    renderList();

    expect(mockUseChecklistItems).toHaveBeenCalledWith(ChecklistType.DAILY);
  });

  it("exibe estado de erro", () => {
    mockUseChecklistItems.mockReturnValue({
      data: undefined,
      isPending: false,
      isError: true,
    });
    renderList();

    expect(
      screen.getByText(/erro ao carregar itens do checklist/i),
    ).toBeInTheDocument();
  });

  it('ao clicar em "Adicionar item" navega pra aba de itens', async () => {
    mockUseChecklistItems.mockReturnValue({
      data: [],
      isPending: false,
      isError: false,
    });
    mockSetTab.mockReset();
    const user = userEvent.setup();
    renderList();

    const [firstButton] = screen.getAllByRole("button", {
      name: /adicionar item/i,
    });
    await user.click(firstButton);

    expect(mockSetTab).toHaveBeenCalledWith("itens");
  });
});
