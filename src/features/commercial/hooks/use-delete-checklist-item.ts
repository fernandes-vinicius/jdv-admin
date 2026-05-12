"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteChecklistItem } from "@/features/commercial/actions/delete-checklist-item";
import type { ChecklistItem } from "@/features/commercial/types/commercial-types";

export function useDeleteChecklistItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (item: Pick<ChecklistItem, "id" | "type">) =>
      deleteChecklistItem(item.id, item.type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["checklist-items"] });
      toast.success("Item removido com sucesso.");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Erro ao remover item. Tente novamente.",
      );
    },
  });
}
