import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TestProviders } from "@/test/providers";
import type { ChecklistItem } from "../../types/checklist-item-types";
import { ChecklistType } from "../../types/checklist-item-types";
import { useChecklistItems } from "../use-checklist-items";

// Factories declared before vi.mock to avoid TDZ issues in factories.
// The mock factories use vi.fn() only; resolved values are set in beforeEach.
vi.mock(
  "@/features/commercial/checklist-item/actions/get-daily-checklist-items",
  () => ({ getDailyChecklistItems: vi.fn() }),
);
vi.mock(
  "@/features/commercial/checklist-item/actions/get-stand-checklist-items",
  () => ({ getStandChecklistItems: vi.fn() }),
);
vi.mock(
  "@/features/commercial/checklist-item/actions/get-award-checklist-items",
  () => ({ getAwardChecklistItems: vi.fn() }),
);

const dailyItem: ChecklistItem = {
  id: "d1",
  label: "Daily item",
  type: ChecklistType.DAILY,
  icon_name: "clipboard",
};
const baseItem: ChecklistItem = {
  id: "s1",
  label: "Base item",
  type: ChecklistType.BASE,
  icon_name: "home",
};
const awardItem: ChecklistItem = {
  id: "a1",
  label: "Award item",
  type: ChecklistType.AWARDS,
  icon_name: "trophy",
};

describe("useChecklistItems", () => {
  let getDailyChecklistItems: ReturnType<typeof vi.fn>;
  let getStandChecklistItems: ReturnType<typeof vi.fn>;
  let getAwardChecklistItems: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    const daily = await import(
      "@/features/commercial/checklist-item/actions/get-daily-checklist-items"
    );
    const stand = await import(
      "@/features/commercial/checklist-item/actions/get-stand-checklist-items"
    );
    const award = await import(
      "@/features/commercial/checklist-item/actions/get-award-checklist-items"
    );

    getDailyChecklistItems = vi.mocked(daily.getDailyChecklistItems);
    getStandChecklistItems = vi.mocked(stand.getStandChecklistItems);
    getAwardChecklistItems = vi.mocked(award.getAwardChecklistItems);

    getDailyChecklistItems.mockResolvedValue([dailyItem]);
    getStandChecklistItems.mockResolvedValue([baseItem]);
    getAwardChecklistItems.mockResolvedValue([awardItem]);
  });

  describe('filtro "all"', () => {
    it("combina resultados de daily, stand e award", async () => {
      const { result } = renderHook(() => useChecklistItems("all"), {
        wrapper: TestProviders,
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toHaveLength(3);
      const types = result.current.data!.map((i) => i.type);
      expect(types).toContain(ChecklistType.DAILY);
      expect(types).toContain(ChecklistType.BASE);
      expect(types).toContain(ChecklistType.AWARDS);
    });

    it("chama as três actions para o filtro all", async () => {
      const { result } = renderHook(() => useChecklistItems("all"), {
        wrapper: TestProviders,
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(getDailyChecklistItems).toHaveBeenCalled();
      expect(getStandChecklistItems).toHaveBeenCalled();
      expect(getAwardChecklistItems).toHaveBeenCalled();
    });
  });

  describe("filtros individuais", () => {
    it("retorna apenas itens DAILY quando filtro é DAILY", async () => {
      const { result } = renderHook(
        () => useChecklistItems(ChecklistType.DAILY),
        { wrapper: TestProviders },
      );

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toHaveLength(1);
      expect(result.current.data![0].type).toBe(ChecklistType.DAILY);
    });

    it("retorna apenas itens BASE quando filtro é BASE", async () => {
      const { result } = renderHook(
        () => useChecklistItems(ChecklistType.BASE),
        { wrapper: TestProviders },
      );

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toHaveLength(1);
      expect(result.current.data![0].type).toBe(ChecklistType.BASE);
    });

    it("retorna apenas itens AWARDS quando filtro é AWARDS", async () => {
      const { result } = renderHook(
        () => useChecklistItems(ChecklistType.AWARDS),
        { wrapper: TestProviders },
      );

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toHaveLength(1);
      expect(result.current.data![0].type).toBe(ChecklistType.AWARDS);
    });
  });

  describe("estado de loading e erro", () => {
    it("inicia em estado pending", () => {
      const { result } = renderHook(() => useChecklistItems(), {
        wrapper: TestProviders,
      });
      expect(result.current.isPending).toBe(true);
    });

    it("passa para isSuccess após carregar os dados", async () => {
      const { result } = renderHook(() => useChecklistItems(), {
        wrapper: TestProviders,
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toBeDefined();
    });

    it('usa "all" como filtro padrão', async () => {
      const { result } = renderHook(() => useChecklistItems(), {
        wrapper: TestProviders,
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toHaveLength(3);
    });
  });
});
