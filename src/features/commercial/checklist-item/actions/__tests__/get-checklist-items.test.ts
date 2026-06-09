import { beforeEach, describe, expect, it, vi } from "vitest";
import type { ApiChecklistItem } from "../../types/checklist-item-types";
import { ChecklistType } from "../../types/checklist-item-types";
import { getAwardChecklistItems } from "../get-award-checklist-items";
import { getDailyChecklistItems } from "../get-daily-checklist-items";
import { getStandChecklistItems } from "../get-stand-checklist-items";

const mockGet = vi.fn();

vi.mock("@/lib/api/server", () => ({
  serverApi: {
    get: (...args: unknown[]) => mockGet(...args),
  },
}));

const makeApiItem = (
  overrides?: Partial<ApiChecklistItem>,
): ApiChecklistItem => ({
  id: "item-1",
  label: "Item teste",
  code: "item_teste_abc",
  icon_name: "book",
  is_active: true,
  display_order: 0,
  empreendimento_id: 1,
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z",
  ...overrides,
});

describe("getDailyChecklistItems", () => {
  beforeEach(() => mockGet.mockReset());

  it("busca de /check-items-daily", async () => {
    mockGet.mockResolvedValue([]);
    await getDailyChecklistItems();
    expect(mockGet).toHaveBeenCalledWith("/check-items-daily");
  });

  it("transforma ApiChecklistItem para ChecklistItem com type DAILY", async () => {
    mockGet.mockResolvedValue([
      makeApiItem({ id: "d1", label: "Verificar leads" }),
    ]);

    const result = await getDailyChecklistItems();

    expect(result).toEqual([
      {
        id: "d1",
        label: "Verificar leads",
        type: ChecklistType.DAILY,
        icon_name: "book",
      },
    ]);
  });

  it("retorna array vazio quando API retorna vazio", async () => {
    mockGet.mockResolvedValue([]);
    const result = await getDailyChecklistItems();
    expect(result).toEqual([]);
  });

  it("propaga erros da API", async () => {
    // mockImplementationOnce to avoid unhandled rejection leaking to other tests
    const networkError = new Error("Network error");
    mockGet.mockImplementationOnce(() => Promise.reject(networkError));
    let caughtError: unknown;
    try {
      await getDailyChecklistItems();
    } catch (e) {
      caughtError = e;
    }
    expect(caughtError).toBeInstanceOf(Error);
    expect((caughtError as Error).message).toBe("Network error");
  });
});

describe("getStandChecklistItems", () => {
  beforeEach(() => mockGet.mockReset());

  it("busca de /stand-check-items", async () => {
    mockGet.mockResolvedValue([]);
    await getStandChecklistItems();
    expect(mockGet).toHaveBeenCalledWith("/stand-check-items");
  });

  it("transforma ApiChecklistItem para ChecklistItem com type BASE", async () => {
    mockGet.mockResolvedValue([
      makeApiItem({ id: "s1", label: "Abrir estande" }),
    ]);

    const result = await getStandChecklistItems();

    expect(result).toEqual([
      {
        id: "s1",
        label: "Abrir estande",
        type: ChecklistType.BASE,
        icon_name: "book",
      },
    ]);
  });
});

describe("getAwardChecklistItems", () => {
  beforeEach(() => mockGet.mockReset());

  it("busca de /check-items-award", async () => {
    mockGet.mockResolvedValue([]);
    await getAwardChecklistItems();
    expect(mockGet).toHaveBeenCalledWith("/check-items-award");
  });

  it("transforma ApiChecklistItem para ChecklistItem com type AWARDS", async () => {
    mockGet.mockResolvedValue([
      makeApiItem({ id: "a1", label: "Ranking da semana" }),
    ]);

    const result = await getAwardChecklistItems();

    expect(result).toEqual([
      {
        id: "a1",
        label: "Ranking da semana",
        type: ChecklistType.AWARDS,
        icon_name: "book",
      },
    ]);
  });
});
