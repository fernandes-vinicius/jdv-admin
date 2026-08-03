import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { toast } from "sonner";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ChecklistPeriod } from "../../types/checklist-item-types";
import { useReorderChecklistItems } from "../use-reorder-checklist-items";

const mockReorderChecklistItems = vi.fn();

vi.mock(
  "@/features/commercial/checklist-item/actions/reorder-checklist-items",
  () => ({
    reorderChecklistItems: (...args: unknown[]) =>
      mockReorderChecklistItems(...args),
  }),
);

function renderReorderHook() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  vi.spyOn(queryClient, "invalidateQueries");

  const { result } = renderHook(() => useReorderChecklistItems(), {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  });

  return { result, queryClient };
}

describe("useReorderChecklistItems", () => {
  beforeEach(() => {
    mockReorderChecklistItems.mockReset();
    vi.mocked(toast.error).mockReset();
    vi.mocked(toast.success).mockReset();
  });

  it("invalida a query checklist-items em caso de sucesso", async () => {
    mockReorderChecklistItems.mockResolvedValue(undefined);
    const { result, queryClient } = renderReorderHook();

    result.current.mutate({
      period: ChecklistPeriod.MORNING,
      item_ids: ["a", "b"],
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(queryClient.invalidateQueries).toHaveBeenCalledWith(
      expect.objectContaining({ queryKey: ["checklist-items"] }),
    );
  });

  it("exibe toast de erro quando a mutação falha", async () => {
    mockReorderChecklistItems.mockRejectedValue(new Error("falhou"));
    const { result } = renderReorderHook();

    result.current.mutate({
      period: ChecklistPeriod.AFTERNOON,
      item_ids: ["a"],
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(toast.error).toHaveBeenCalled();
  });
});
