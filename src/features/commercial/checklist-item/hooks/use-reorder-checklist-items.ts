"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { reorderChecklistItems } from "@/features/commercial/checklist-item/actions/reorder-checklist-items";

export function useReorderChecklistItems() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reorderChecklistItems,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["checklist-items"] });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erro ao reordenar itens. Tente novamente.",
      );
    },
  });
}
