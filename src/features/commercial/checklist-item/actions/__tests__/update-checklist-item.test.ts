import { beforeEach, describe, expect, it, vi } from "vitest";
import { ApiError } from "@/types/api";
import { ChecklistType } from "../../types/checklist-item-types";
import { updateChecklistItem } from "../update-checklist-item";

const mockPut = vi.fn();

vi.mock("@/lib/api/server", () => ({
  serverApi: {
    put: (...args: unknown[]) => mockPut(...args),
  },
}));

vi.mock("@/lib/utils", () => ({
  slugify: (label: string) =>
    `${label.toLowerCase().replace(/\s+/g, "_")}_abc123`,
}));

describe("updateChecklistItem", () => {
  beforeEach(() => {
    mockPut.mockReset();
  });

  it("envia para /check-items-daily/{id} quando tipo é DAILY", async () => {
    mockPut.mockResolvedValue({ id: "1" });

    await updateChecklistItem({
      id: "1",
      type: ChecklistType.DAILY,
      label: "Verificar leads",
      icon_name: "clipboard",
      start_time: "09:00",
      end_time: "11:00",
    });

    expect(mockPut).toHaveBeenCalledWith(
      "/check-items-daily/1",
      expect.any(Object),
    );
  });

  it("envia para /stand-check-items/{id} quando tipo é BASE", async () => {
    mockPut.mockResolvedValue({ id: "2" });

    await updateChecklistItem({
      id: "2",
      type: ChecklistType.BASE,
      label: "Abrir estande",
      icon_name: "door",
    });

    expect(mockPut).toHaveBeenCalledWith(
      "/stand-check-items/2",
      expect.any(Object),
    );
  });

  it("inclui start_time/end_time no payload quando tipo é DAILY", async () => {
    mockPut.mockResolvedValue({ id: "1" });

    await updateChecklistItem({
      id: "1",
      type: ChecklistType.DAILY,
      label: "Verificar leads",
      icon_name: "clipboard",
      start_time: "09:00",
      end_time: "11:00",
    });

    expect(mockPut).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ start_time: "09:00", end_time: "11:00" }),
    );
  });

  it("não inclui start_time/end_time no payload quando tipo não é DAILY", async () => {
    mockPut.mockResolvedValue({ id: "2" });

    await updateChecklistItem({
      id: "2",
      type: ChecklistType.AWARDS,
      label: "Ranking da semana",
      icon_name: "trophy",
    });

    const payload = mockPut.mock.calls[0][1] as Record<string, unknown>;
    expect(payload).not.toHaveProperty("start_time");
    expect(payload).not.toHaveProperty("end_time");
  });

  it("propaga ApiError lançado pelo serverApi", async () => {
    const apiError = new ApiError("Validação falhou", 422, {
      message: "end_time must be after start_time",
    });
    mockPut.mockRejectedValue(apiError);

    await expect(
      updateChecklistItem({
        id: "1",
        type: ChecklistType.DAILY,
        label: "Item",
        icon_name: "book",
        start_time: "11:00",
        end_time: "09:00",
      }),
    ).rejects.toThrow(apiError);
  });
});
