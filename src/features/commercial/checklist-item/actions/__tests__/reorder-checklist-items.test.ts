import { beforeEach, describe, expect, it, vi } from "vitest";
import { ApiError } from "@/types/api";
import { ChecklistPeriod } from "../../types/checklist-item-types";
import { reorderChecklistItems } from "../reorder-checklist-items";

const mockPut = vi.fn();

vi.mock("@/lib/api/server", () => ({
  serverApi: {
    put: (...args: unknown[]) => mockPut(...args),
  },
}));

describe("reorderChecklistItems", () => {
  beforeEach(() => {
    mockPut.mockReset();
  });

  it("chama PUT /check-items-daily/reorder com period e item_ids", async () => {
    mockPut.mockResolvedValue(undefined);

    await reorderChecklistItems({
      period: ChecklistPeriod.MORNING,
      item_ids: ["a", "b", "c"],
    });

    expect(mockPut).toHaveBeenCalledWith("/check-items-daily/reorder", {
      period: ChecklistPeriod.MORNING,
      item_ids: ["a", "b", "c"],
    });
  });

  it("propaga ApiError 422 quando um item_id não pertence ao período", async () => {
    const apiError = new ApiError("Unprocessable Entity", 422, {
      message: "item does not belong to period morning",
    });
    mockPut.mockRejectedValue(apiError);

    await expect(
      reorderChecklistItems({
        period: ChecklistPeriod.MORNING,
        item_ids: ["a"],
      }),
    ).rejects.toThrow(apiError);
  });

  it("propaga erros de rede", async () => {
    mockPut.mockRejectedValue(new TypeError("Failed to fetch"));

    await expect(
      reorderChecklistItems({
        period: ChecklistPeriod.AFTERNOON,
        item_ids: ["x"],
      }),
    ).rejects.toThrow("Failed to fetch");
  });
});
