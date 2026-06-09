import { beforeEach, describe, expect, it, vi } from "vitest";
import { ApiError } from "@/types/api";
import { createChecklistItem } from "../create-checklist-item";
import { ChecklistType } from "../../types/checklist-item-types";

const mockPost = vi.fn();

vi.mock("@/lib/api/server", () => ({
  serverApi: {
    post: (...args: unknown[]) => mockPost(...args),
  },
}));

vi.mock("@/lib/utils", () => ({
  slugify: (label: string) =>
    `${label.toLowerCase().replace(/\s+/g, "_")}_abc123`,
}));

describe("createChecklistItem", () => {
  beforeEach(() => {
    mockPost.mockReset();
  });

  describe("endpoint routing", () => {
    it("envia para /check-items-daily quando tipo é DAILY", async () => {
      mockPost.mockResolvedValue({ id: "1" });

      await createChecklistItem({
        label: "Verificar leads",
        type: ChecklistType.DAILY,
        icon_name: "clipboard",
      });

      expect(mockPost).toHaveBeenCalledWith(
        "/check-items-daily",
        expect.any(Object),
      );
    });

    it("envia para /stand-check-items quando tipo é BASE", async () => {
      mockPost.mockResolvedValue({ id: "2" });

      await createChecklistItem({
        label: "Abrir estande",
        type: ChecklistType.BASE,
        icon_name: "door",
      });

      expect(mockPost).toHaveBeenCalledWith(
        "/stand-check-items",
        expect.any(Object),
      );
    });

    it("envia para /check-items-award quando tipo é AWARDS", async () => {
      mockPost.mockResolvedValue({ id: "3" });

      await createChecklistItem({
        label: "Ranking da semana",
        type: ChecklistType.AWARDS,
        icon_name: "trophy",
      });

      expect(mockPost).toHaveBeenCalledWith(
        "/check-items-award",
        expect.any(Object),
      );
    });
  });

  describe("payload", () => {
    it("inclui label, icon_name, is_active e display_order no payload", async () => {
      mockPost.mockResolvedValue({ id: "1" });

      await createChecklistItem({
        label: "Cadastrar ações",
        type: ChecklistType.DAILY,
        icon_name: "book",
      });

      expect(mockPost).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          label: "Cadastrar ações",
          icon_name: "book",
          is_active: true,
          display_order: 0,
        }),
      );
    });

    it("gera o campo code via slugify a partir do label", async () => {
      mockPost.mockResolvedValue({ id: "1" });

      await createChecklistItem({
        label: "Verificar leads",
        type: ChecklistType.DAILY,
        icon_name: "search",
      });

      const payload = mockPost.mock.calls[0][1] as Record<string, unknown>;
      expect(typeof payload.code).toBe("string");
      expect(payload.code).toBeTruthy();
    });

    it("não envia o campo type no payload (mapeado apenas para o endpoint)", async () => {
      mockPost.mockResolvedValue({ id: "1" });

      await createChecklistItem({
        label: "Item test",
        type: ChecklistType.DAILY,
        icon_name: "book",
      });

      const payload = mockPost.mock.calls[0][1] as Record<string, unknown>;
      expect(payload).not.toHaveProperty("type");
    });
  });

  describe("tratamento de erros", () => {
    it("propaga ApiError lançado pelo serverApi", async () => {
      const apiError = new ApiError("Conflito de código", 409, {
        error: "Conflito de código",
      });
      mockPost.mockRejectedValue(apiError);

      await expect(
        createChecklistItem({
          label: "Item duplicado",
          type: ChecklistType.DAILY,
          icon_name: "book",
        }),
      ).rejects.toThrow(apiError);
    });

    it("propaga ApiError 422 (validação no backend)", async () => {
      const validationError = new ApiError("Unprocessable Entity", 422, {
        message: "label já existe",
      });
      mockPost.mockRejectedValue(validationError);

      await expect(
        createChecklistItem({
          label: "Item existente",
          type: ChecklistType.BASE,
          icon_name: "home",
        }),
      ).rejects.toThrowError(ApiError);
    });

    it("propaga erros de rede (não-ApiError)", async () => {
      mockPost.mockRejectedValue(new TypeError("Failed to fetch"));

      await expect(
        createChecklistItem({
          label: "Item qualquer",
          type: ChecklistType.AWARDS,
          icon_name: "star",
        }),
      ).rejects.toThrow("Failed to fetch");
    });
  });
});
