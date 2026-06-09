import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toast } from "sonner";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ApiError } from "@/types/api";
import { TestProviders } from "@/test/providers";
import { ChecklistItemCreateForm } from "../checklist-item-create-form";

// Mock the icon select as a plain <select> to avoid Radix UI jsdom incompatibilities
vi.mock(
  "@/features/commercial/checklist-item/components/checklist-icon-select",
  () => ({
    ChecklistIconSelect: ({
      onValueChange,
      id,
    }: {
      onValueChange: (v: string) => void;
      id?: string;
      value?: string;
      "aria-invalid"?: boolean;
    }) => (
      <select
        id={id}
        data-testid="icon-select"
        onChange={(e) => onValueChange(e.target.value)}
        defaultValue=""
      >
        <option value="">Selecione um ícone</option>
        <option value="BookOpenCheck">book</option>
        <option value="Trophy">vendas</option>
        <option value="Flag">banner</option>
      </select>
    ),
    CHECKLIST_ICONS: [],
  }),
);

const mockCreateChecklistItem = vi.fn();
const mockInvalidateQueries = vi.fn();

vi.mock(
  "@/features/commercial/checklist-item/actions/create-checklist-item",
  () => ({
    createChecklistItem: (...args: unknown[]) =>
      mockCreateChecklistItem(...args),
  }),
);

vi.mock("@tanstack/react-query", async (importOriginal) => {
  const original =
    await importOriginal<typeof import("@tanstack/react-query")>();
  return {
    ...original,
    useQueryClient: () => ({
      invalidateQueries: mockInvalidateQueries,
    }),
  };
});

function renderForm(props?: { onSuccess?: () => void; onCancel?: () => void }) {
  return render(
    <TestProviders>
      <ChecklistItemCreateForm {...props} />
    </TestProviders>,
  );
}

async function fillAndSubmit(user: ReturnType<typeof userEvent.setup>) {
  await user.type(
    screen.getByPlaceholderText("Ex. Acompanhar ações do dia"),
    "Cadastrar ações da semana",
  );
  await user.selectOptions(screen.getByTestId("icon-select"), "BookOpenCheck");
  await user.click(screen.getByRole("button", { name: /adicionar/i }));
}

describe("ChecklistItemCreateForm", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    mockCreateChecklistItem.mockReset();
    mockInvalidateQueries.mockReset();
    vi.mocked(toast.error).mockReset();
  });

  afterEach(() => {
    cleanup();
  });

  describe("renderização", () => {
    it("exibe campo label com placeholder correto", () => {
      renderForm();
      expect(
        screen.getByPlaceholderText("Ex. Acompanhar ações do dia"),
      ).toBeInTheDocument();
    });

    it("exibe botão de submit", () => {
      renderForm();
      expect(
        screen.getByRole("button", { name: /adicionar/i }),
      ).toBeInTheDocument();
    });

    it("não exibe botão cancelar quando onCancel não é fornecido", () => {
      renderForm();
      expect(
        screen.queryByRole("button", { name: /cancelar/i }),
      ).not.toBeInTheDocument();
    });

    it("exibe botão cancelar quando onCancel é fornecido", () => {
      renderForm({ onCancel: vi.fn() });
      expect(
        screen.getByRole("button", { name: /cancelar/i }),
      ).toBeInTheDocument();
    });
  });

  describe("validação do formulário", () => {
    it("exibe erro de validação do label quando label está vazio ao submeter", async () => {
      renderForm();
      await user.click(screen.getByRole("button", { name: /adicionar/i }));
      await waitFor(() => {
        const errors = screen.getAllByText("Campo obrigatório");
        expect(errors.length).toBeGreaterThanOrEqual(1);
      });
      expect(mockCreateChecklistItem).not.toHaveBeenCalled();
    });

    it("exibe erro quando label excede 160 caracteres", async () => {
      renderForm();
      await user.type(
        screen.getByPlaceholderText("Ex. Acompanhar ações do dia"),
        "a".repeat(161),
      );
      await user.click(screen.getByRole("button", { name: /adicionar/i }));
      await waitFor(() => {
        expect(
          screen.getByText("O campo deve ter no máximo 160 caracteres"),
        ).toBeInTheDocument();
      });
      expect(mockCreateChecklistItem).not.toHaveBeenCalled();
    });

    it("não submete quando icon_name está vazio", async () => {
      renderForm();
      await user.type(
        screen.getByPlaceholderText("Ex. Acompanhar ações do dia"),
        "Item sem ícone",
      );
      await user.click(screen.getByRole("button", { name: /adicionar/i }));
      await waitFor(() => {
        const errors = screen.getAllByText("Campo obrigatório");
        expect(errors.length).toBeGreaterThanOrEqual(1);
      });
      expect(mockCreateChecklistItem).not.toHaveBeenCalled();
    });
  });

  describe("submissão com sucesso", () => {
    it("chama createChecklistItem com label e icon_name do formulário", async () => {
      mockCreateChecklistItem.mockResolvedValue({ id: "new-1" });
      renderForm();

      await fillAndSubmit(user);

      await waitFor(() => {
        expect(mockCreateChecklistItem).toHaveBeenCalledWith(
          expect.objectContaining({
            label: "Cadastrar ações da semana",
            icon_name: "BookOpenCheck",
          }),
        );
      });
    });

    it("invalida a query checklist-items após criação bem-sucedida", async () => {
      mockCreateChecklistItem.mockResolvedValue({ id: "new-1" });
      renderForm();

      await fillAndSubmit(user);

      await waitFor(() => {
        expect(mockInvalidateQueries).toHaveBeenCalledWith(
          expect.objectContaining({ queryKey: ["checklist-items"] }),
        );
      });
    });

    it("chama onSuccess após criação bem-sucedida", async () => {
      mockCreateChecklistItem.mockResolvedValue({ id: "new-1" });
      const onSuccess = vi.fn();
      renderForm({ onSuccess });

      await fillAndSubmit(user);

      await waitFor(() => {
        expect(onSuccess).toHaveBeenCalled();
      });
    });

    it("desabilita o botão durante a submissão", async () => {
      let resolveCreate!: (v: unknown) => void;
      mockCreateChecklistItem.mockImplementation(
        () =>
          new Promise((res) => {
            resolveCreate = res;
          }),
      );
      renderForm();

      await user.type(
        screen.getByPlaceholderText("Ex. Acompanhar ações do dia"),
        "Item de teste",
      );
      await user.selectOptions(
        screen.getByTestId("icon-select"),
        "BookOpenCheck",
      );
      await user.click(screen.getByRole("button", { name: /adicionar/i }));

      await waitFor(() => {
        expect(
          screen.getByRole("button", { name: /adicionando/i }),
        ).toBeDisabled();
      });

      resolveCreate({ id: "1" });
    });
  });

  describe("tratamento de erros", () => {
    it("exibe toast.error com mensagem do ApiError quando API retorna erro", async () => {
      const apiError = new ApiError("Label já existe no sistema", 422, {
        error: "Label já existe no sistema",
      });
      mockCreateChecklistItem.mockRejectedValue(apiError);
      renderForm();

      await fillAndSubmit(user);

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith("Label já existe no sistema");
      });
      expect(mockInvalidateQueries).not.toHaveBeenCalled();
    });

    it("exibe mensagem fallback quando erro não tem message (message é undefined/null)", async () => {
      // tryCatch catches any error and casts to ApiError — it does not validate the type.
      // Throwing a plain object with message=undefined triggers the ?? fallback in the form.
      const errorSemMessage = { message: undefined } as unknown as ApiError;
      mockCreateChecklistItem.mockRejectedValue(errorSemMessage);
      renderForm();

      await fillAndSubmit(user);

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith(
          "Erro ao criar item. Tente novamente.",
        );
      });
    });

    it("não chama onSuccess quando ocorre erro", async () => {
      mockCreateChecklistItem.mockRejectedValue(
        new ApiError("Erro", 500, null),
      );
      const onSuccess = vi.fn();
      renderForm({ onSuccess });

      await fillAndSubmit(user);

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalled();
      });
      expect(onSuccess).not.toHaveBeenCalled();
    });

    it("o botão fica habilitado novamente após erro", async () => {
      mockCreateChecklistItem.mockRejectedValue(
        new ApiError("Erro", 422, null),
      );
      renderForm();

      await fillAndSubmit(user);

      await waitFor(() => {
        expect(
          screen.getByRole("button", { name: /adicionar/i }),
        ).not.toBeDisabled();
      });
    });
  });

  describe("botão cancelar", () => {
    it("chama onCancel ao clicar em cancelar", async () => {
      const onCancel = vi.fn();
      renderForm({ onCancel });

      await user.click(screen.getByRole("button", { name: /cancelar/i }));

      expect(onCancel).toHaveBeenCalled();
    });

    it("desabilita botão cancelar durante submissão", async () => {
      let resolveCreate!: (v: unknown) => void;
      mockCreateChecklistItem.mockImplementation(
        () =>
          new Promise((res) => {
            resolveCreate = res;
          }),
      );
      const onCancel = vi.fn();
      renderForm({ onCancel });

      await fillAndSubmit(user);

      await waitFor(() => {
        expect(
          screen.getByRole("button", { name: /cancelar/i }),
        ).toBeDisabled();
      });

      resolveCreate({ id: "1" });
    });
  });
});
