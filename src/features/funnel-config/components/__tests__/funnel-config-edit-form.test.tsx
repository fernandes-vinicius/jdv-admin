import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toast } from "sonner";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TestProviders } from "@/test/providers";
import { ApiError } from "@/types/api";
import {
  FunnelConfigEditForm,
  funnelConfigFormSchema,
} from "../funnel-config-edit-form";

const mockUpsertFunnelConfig = vi.fn();
const mockSetQueryData = vi.fn();

vi.mock("@/features/funnel-config/actions/upsert-funnel-config", () => ({
  upsertFunnelConfig: (...args: unknown[]) => mockUpsertFunnelConfig(...args),
}));

vi.mock("@tanstack/react-query", async (importOriginal) => {
  const original =
    await importOriginal<typeof import("@tanstack/react-query")>();
  return {
    ...original,
    useQueryClient: () => ({
      setQueryData: mockSetQueryData,
    }),
  };
});

function renderForm(
  config: { start_date: string; end_date: string; id: number } | null = null,
) {
  return render(
    <TestProviders>
      <FunnelConfigEditForm
        config={
          config && {
            ...config,
            created_at: "2026-07-03T12:00:00Z",
            updated_at: "2026-07-03T12:00:00Z",
          }
        }
      />
    </TestProviders>,
  );
}

async function fillAndSubmit(
  user: ReturnType<typeof userEvent.setup>,
  start: string,
  end: string,
) {
  const startInput = screen.getByLabelText(/data inicial/i);
  const endInput = screen.getByLabelText(/data final/i);
  await user.clear(startInput);
  await user.type(startInput, start);
  await user.clear(endInput);
  await user.type(endInput, end);
  await user.click(screen.getByRole("button", { name: /salvar/i }));
}

describe("FunnelConfigEditForm", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    mockUpsertFunnelConfig.mockReset();
    mockSetQueryData.mockReset();
    vi.mocked(toast.error).mockReset();
    vi.mocked(toast.success).mockReset();
  });

  afterEach(() => {
    cleanup();
  });

  it("renderiza os inputs de data preenchidos a partir do config", () => {
    renderForm({ id: 1, start_date: "2025-01-01", end_date: "2025-12-31" });

    expect(screen.getByLabelText(/data inicial/i)).toHaveValue("2025-01-01");
    expect(screen.getByLabelText(/data final/i)).toHaveValue("2025-12-31");
  });

  it("renderiza os inputs vazios quando config é null", () => {
    renderForm(null);

    expect(screen.getByLabelText(/data inicial/i)).toHaveValue("");
    expect(screen.getByLabelText(/data final/i)).toHaveValue("");
  });

  it("bloqueia o submit e mostra erro quando end_date é anterior a start_date", async () => {
    renderForm();

    await fillAndSubmit(user, "2025-12-31", "2025-01-01");

    await waitFor(() => {
      expect(
        screen.getByText(
          "A data final deve ser igual ou posterior à data inicial",
        ),
      ).toBeInTheDocument();
    });
    expect(mockUpsertFunnelConfig).not.toHaveBeenCalled();
  });

  it("salva com sucesso e atualiza o cache", async () => {
    const saved = {
      id: 1,
      start_date: "2025-01-01",
      end_date: "2025-12-31",
      created_at: "2026-07-03T12:00:00Z",
      updated_at: "2026-07-03T12:30:00Z",
    };
    mockUpsertFunnelConfig.mockResolvedValue(saved);
    renderForm();

    await fillAndSubmit(user, "2025-01-01", "2025-12-31");

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Período salvo com sucesso.");
    });
    expect(mockSetQueryData).toHaveBeenCalledWith(["funnel-config"], saved);
  });

  it("mapeia erro 422 com fields para o campo correspondente, sem toast genérico", async () => {
    const validationError = new ApiError("validation failed", 422, {
      error: "validation failed",
      code: "VALIDATION_ERROR",
      fields: { end_date: ["must be on or after start_date"] },
    });
    mockUpsertFunnelConfig.mockRejectedValue(validationError);
    renderForm();

    await fillAndSubmit(user, "2025-01-01", "2025-12-31");

    await waitFor(() => {
      expect(
        screen.getByText("must be on or after start_date"),
      ).toBeInTheDocument();
    });
    expect(toast.error).not.toHaveBeenCalled();
  });

  it("mostra toast genérico quando o erro não tem fields", async () => {
    const serverError = new ApiError("Internal Error", 500, {
      error: "Internal Error",
      code: "INTERNAL_ERROR",
    });
    mockUpsertFunnelConfig.mockRejectedValue(serverError);
    renderForm();

    await fillAndSubmit(user, "2025-01-01", "2025-12-31");

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Internal Error");
    });
  });

  it("degrada para toast em um 403 (sessão dessincronizada)", async () => {
    const forbiddenError = new ApiError("forbidden", 403, {
      error: "forbidden",
      code: "FORBIDDEN",
    });
    mockUpsertFunnelConfig.mockRejectedValue(forbiddenError);
    renderForm();

    await fillAndSubmit(user, "2025-01-01", "2025-12-31");

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("forbidden");
    });
    expect(screen.getByRole("button", { name: /salvar/i })).not.toBeDisabled();
  });
});

describe("funnelConfigFormSchema", () => {
  // O <input type="date"> nativo já sanitiza datas inexistentes no
  // calendário para string vazia (não dá pra digitar "30 de fevereiro" via
  // DOM), então essa regra só é testável direto no schema — é uma defesa
  // extra caso o valor chegue por outro caminho que não o date picker.
  it("rejeita uma data que não existe no calendário (30 de fevereiro)", () => {
    const result = funnelConfigFormSchema.safeParse({
      start_date: "2025-02-30",
      end_date: "2025-03-01",
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe("Data inválida");
  });

  it("rejeita um mês fora do intervalo 01-12", () => {
    const result = funnelConfigFormSchema.safeParse({
      start_date: "2025-13-01",
      end_date: "2025-12-31",
    });

    expect(result.success).toBe(false);
  });

  it("aceita 29 de fevereiro em ano bissexto", () => {
    const result = funnelConfigFormSchema.safeParse({
      start_date: "2024-02-29",
      end_date: "2024-12-31",
    });

    expect(result.success).toBe(true);
  });

  it("rejeita 29 de fevereiro em ano não bissexto", () => {
    const result = funnelConfigFormSchema.safeParse({
      start_date: "2025-02-29",
      end_date: "2025-12-31",
    });

    expect(result.success).toBe(false);
  });
});
