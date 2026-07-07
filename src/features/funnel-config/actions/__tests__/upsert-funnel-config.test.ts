import { beforeEach, describe, expect, it, vi } from "vitest";
import { ApiError } from "@/types/api";
import { upsertFunnelConfig } from "../upsert-funnel-config";

const mockPut = vi.fn();

vi.mock("@/lib/api/server", () => ({
  serverApi: {
    put: (...args: unknown[]) => mockPut(...args),
  },
}));

describe("upsertFunnelConfig", () => {
  beforeEach(() => {
    mockPut.mockReset();
  });

  it("chama serverApi.put em /funnel-config com start_date e end_date", async () => {
    const config = {
      id: 1,
      start_date: "2025-01-01",
      end_date: "2025-12-31",
      created_at: "2026-07-03T12:00:00Z",
      updated_at: "2026-07-03T12:30:00Z",
    };
    mockPut.mockResolvedValue(config);

    await upsertFunnelConfig({
      start_date: "2025-01-01",
      end_date: "2025-12-31",
    });

    expect(mockPut).toHaveBeenCalledWith("/funnel-config", {
      start_date: "2025-01-01",
      end_date: "2025-12-31",
    });
  });

  it("retorna o config salvo em caso de sucesso", async () => {
    const config = {
      id: 1,
      start_date: "2025-01-01",
      end_date: "2025-12-31",
      created_at: "2026-07-03T12:00:00Z",
      updated_at: "2026-07-03T12:30:00Z",
    };
    mockPut.mockResolvedValue(config);

    await expect(
      upsertFunnelConfig({ start_date: "2025-01-01", end_date: "2025-12-31" }),
    ).resolves.toEqual(config);
  });

  it("propaga ApiError 422 (validação) sem alterar o formato", async () => {
    const validationError = new ApiError("validation failed", 422, {
      error: "validation failed",
      code: "VALIDATION_ERROR",
      fields: { end_date: ["must be on or after start_date"] },
    });
    mockPut.mockRejectedValue(validationError);

    await expect(
      upsertFunnelConfig({ start_date: "2025-12-31", end_date: "2025-01-01" }),
    ).rejects.toBe(validationError);
  });

  it("propaga ApiError 403 (não-admin)", async () => {
    const forbiddenError = new ApiError("forbidden", 403, {
      error: "forbidden",
      code: "FORBIDDEN",
    });
    mockPut.mockRejectedValue(forbiddenError);

    await expect(
      upsertFunnelConfig({ start_date: "2025-01-01", end_date: "2025-12-31" }),
    ).rejects.toBe(forbiddenError);
  });
});
