import { beforeEach, describe, expect, it, vi } from "vitest";
import { ApiError } from "@/types/api";
import { getFunnelConfig } from "../get-funnel-config";

const mockGet = vi.fn();

vi.mock("@/lib/api/server", () => ({
  serverApi: {
    get: (...args: unknown[]) => mockGet(...args),
  },
}));

describe("getFunnelConfig", () => {
  beforeEach(() => {
    mockGet.mockReset();
  });

  it("retorna o config quando a API responde 200", async () => {
    const config = {
      id: 1,
      start_date: "2025-01-01",
      end_date: "2025-12-31",
      created_at: "2026-07-03T12:00:00Z",
      updated_at: "2026-07-03T12:30:00Z",
    };
    mockGet.mockResolvedValue(config);

    await expect(getFunnelConfig()).resolves.toEqual(config);
    expect(mockGet).toHaveBeenCalledWith("/funnel-config");
  });

  it("retorna null quando a API responde 404", async () => {
    mockGet.mockRejectedValue(
      new ApiError("funnel_config with id 'current' not found", 404, {
        error: "funnel_config with id 'current' not found",
        code: "NOT_FOUND",
      }),
    );

    await expect(getFunnelConfig()).resolves.toBeNull();
  });

  it("propaga ApiError não-404 (ex.: 500)", async () => {
    const apiError = new ApiError("Internal Error", 500, {
      error: "Internal Error",
      code: "INTERNAL_ERROR",
    });
    mockGet.mockRejectedValue(apiError);

    await expect(getFunnelConfig()).rejects.toThrow(apiError);
  });

  it("propaga erros de rede (não-ApiError)", async () => {
    mockGet.mockRejectedValue(new TypeError("Failed to fetch"));

    await expect(getFunnelConfig()).rejects.toThrow("Failed to fetch");
  });
});
