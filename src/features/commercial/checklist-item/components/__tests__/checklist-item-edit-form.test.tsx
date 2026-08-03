import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TestProviders } from "@/test/providers";
import {
  type ChecklistItem,
  ChecklistPeriod,
  ChecklistType,
} from "../../types/checklist-item-types";
import { ChecklistItemEditForm } from "../checklist-item-edit-form";

vi.mock(
  "@/features/commercial/checklist-item/components/checklist-icon-select",
  () => ({
    ChecklistIconSelect: ({
      onValueChange,
      value,
      id,
    }: {
      onValueChange: (v: string) => void;
      value?: string;
      id?: string;
    }) => (
      <select
        id={id}
        data-testid="icon-select"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
      >
        <option value="">Selecione um ícone</option>
        <option value="BookOpenCheck">book</option>
        <option value="Trophy">vendas</option>
      </select>
    ),
    CHECKLIST_ICONS: [],
  }),
);

const mockUpdateItem = vi.fn();

vi.mock(
  "@/features/commercial/checklist-item/hooks/use-update-checklist-item",
  () => ({
    useUpdateChecklistItem: () => ({ mutateAsync: mockUpdateItem }),
  }),
);

const dailyItem: ChecklistItem = {
  id: "d1",
  label: "Verificar funil",
  type: ChecklistType.DAILY,
  icon_name: "BookOpenCheck",
  start_time: "09:00",
  end_time: "11:00",
  period: ChecklistPeriod.MORNING,
};

const baseItem: ChecklistItem = {
  id: "b1",
  label: "Abrir estande",
  type: ChecklistType.BASE,
  icon_name: "BookOpenCheck",
};

function renderForm(
  item: ChecklistItem,
  props?: { onSuccess?: () => void; onCancel?: () => void },
) {
  return render(
    <TestProviders>
      <ChecklistItemEditForm item={item} {...props} />
    </TestProviders>,
  );
}

describe("ChecklistItemEditForm", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    mockUpdateItem.mockReset();
  });

  afterEach(() => {
    cleanup();
  });

  describe("item BASE (sem horário)", () => {
    it("não exibe campos de horário", () => {
      renderForm(baseItem);
      expect(screen.queryByLabelText(/início/i)).not.toBeInTheDocument();
      expect(screen.queryByLabelText(/fim/i)).not.toBeInTheDocument();
    });

    it("submete sem start_time/end_time", async () => {
      mockUpdateItem.mockResolvedValue({ id: "b1" });
      renderForm(baseItem);

      await user.click(screen.getByRole("button", { name: /salvar/i }));

      await waitFor(() => {
        expect(mockUpdateItem).toHaveBeenCalledWith(
          expect.objectContaining({ id: "b1", type: ChecklistType.BASE }),
        );
      });
      const payload = mockUpdateItem.mock.calls[0][0];
      expect(payload).not.toHaveProperty("start_time");
      expect(payload).not.toHaveProperty("end_time");
    });
  });

  describe("item DAILY (com horário)", () => {
    it("precarrega start_time/end_time do item", () => {
      renderForm(dailyItem);
      expect(screen.getByLabelText(/início/i)).toHaveValue("09:00");
      expect(screen.getByLabelText(/fim/i)).toHaveValue("11:00");
    });

    it("exibe badge de período derivado do end_time precarregado", () => {
      renderForm(dailyItem);
      expect(screen.getByText("Manhã")).toBeInTheDocument();
    });

    it("envia start_time/end_time atualizados no submit", async () => {
      mockUpdateItem.mockResolvedValue({ id: "d1" });
      renderForm(dailyItem);

      fireEvent.change(screen.getByLabelText(/fim/i), {
        target: { value: "12:00" },
      });
      await user.click(screen.getByRole("button", { name: /salvar/i }));

      await waitFor(() => {
        expect(mockUpdateItem).toHaveBeenCalledWith(
          expect.objectContaining({
            id: "d1",
            start_time: "09:00",
            end_time: "12:00",
          }),
        );
      });
    });

    it("exibe erro quando fim não é depois do início", async () => {
      renderForm(dailyItem);

      fireEvent.change(screen.getByLabelText(/fim/i), {
        target: { value: "08:00" },
      });
      await user.click(screen.getByRole("button", { name: /salvar/i }));

      await waitFor(() => {
        expect(
          screen.getByText(/fim deve ser depois do início/i),
        ).toBeInTheDocument();
      });
      expect(mockUpdateItem).not.toHaveBeenCalled();
    });
  });
});
