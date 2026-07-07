import { cleanup, render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useFunnelConfig } from "@/features/funnel-config/hooks/use-funnel-config";
import { TestProviders } from "@/test/providers";
import { FunnelConfigSection } from "../funnel-config-section";

vi.mock("next-auth/react", () => ({
  useSession: vi.fn(),
}));

vi.mock("@/features/funnel-config/hooks/use-funnel-config", () => ({
  useFunnelConfig: vi.fn(),
}));

vi.mock("@/features/funnel-config/actions/upsert-funnel-config", () => ({
  upsertFunnelConfig: vi.fn(),
}));

function mockSession(isAdmin: boolean) {
  vi.mocked(useSession).mockReturnValue({
    data: { user: { is_admin: isAdmin } },
    status: "authenticated",
    // biome-ignore lint/suspicious/noExplicitAny: partial session shape is enough for this test
  } as any);
}

function renderSection() {
  return render(
    <TestProviders>
      <FunnelConfigSection />
    </TestProviders>,
  );
}

describe("FunnelConfigSection", () => {
  beforeEach(() => {
    vi.mocked(useFunnelConfig).mockReset();
  });

  afterEach(() => {
    cleanup();
  });

  it("mostra skeletons enquanto carrega, sem form nem resumo", () => {
    mockSession(true);
    vi.mocked(useFunnelConfig).mockReturnValue({
      data: undefined,
      isPending: true,
      // biome-ignore lint/suspicious/noExplicitAny: partial query result is enough for this test
    } as any);

    renderSection();

    expect(
      screen.queryByText(/Nenhum período definido/i),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /salvar/i }),
    ).not.toBeInTheDocument();
  });

  it("não-admin vê o resumo configurado, sem inputs nem botão salvar", () => {
    mockSession(false);
    vi.mocked(useFunnelConfig).mockReturnValue({
      data: {
        id: 1,
        start_date: "2025-01-01",
        end_date: "2025-12-31",
        created_at: "2026-07-03T12:00:00Z",
        updated_at: "2026-07-03T12:00:00Z",
      },
      isPending: false,
      // biome-ignore lint/suspicious/noExplicitAny: partial query result is enough for this test
    } as any);

    renderSection();

    expect(
      screen.getByText("Período atual: de 2025-01-01 até 2025-12-31."),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /salvar/i }),
    ).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/data inicial/i)).not.toBeInTheDocument();
  });

  it("admin vê o form de edição preenchido com o config atual", () => {
    mockSession(true);
    vi.mocked(useFunnelConfig).mockReturnValue({
      data: {
        id: 1,
        start_date: "2025-01-01",
        end_date: "2025-12-31",
        created_at: "2026-07-03T12:00:00Z",
        updated_at: "2026-07-03T12:00:00Z",
      },
      isPending: false,
      // biome-ignore lint/suspicious/noExplicitAny: partial query result is enough for this test
    } as any);

    renderSection();

    expect(screen.getByLabelText(/data inicial/i)).toHaveValue("2025-01-01");
    expect(screen.getByLabelText(/data final/i)).toHaveValue("2025-12-31");
    expect(screen.getByRole("button", { name: /salvar/i })).toBeInTheDocument();
  });

  it("estado 404 (config null) mostra texto de 'não configurado', sem toast de erro", () => {
    mockSession(false);
    vi.mocked(useFunnelConfig).mockReturnValue({
      data: null,
      isPending: false,
      // biome-ignore lint/suspicious/noExplicitAny: partial query result is enough for this test
    } as any);

    renderSection();

    expect(
      screen.getByText(
        "Nenhum período definido no momento — o gráfico está mostrando todo o histórico.",
      ),
    ).toBeInTheDocument();
  });

  it("admin com config null vê o form vazio (não um erro)", () => {
    mockSession(true);
    vi.mocked(useFunnelConfig).mockReturnValue({
      data: null,
      isPending: false,
      // biome-ignore lint/suspicious/noExplicitAny: partial query result is enough for this test
    } as any);

    renderSection();

    expect(screen.getByLabelText(/data inicial/i)).toHaveValue("");
    expect(screen.getByLabelText(/data final/i)).toHaveValue("");
  });
});
