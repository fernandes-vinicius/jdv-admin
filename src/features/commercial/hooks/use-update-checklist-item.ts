"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateChecklistItem } from "@/features/commercial/actions/update-checklist-item";

export function useUpdateChecklistItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateChecklistItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["checklist-items"] });
      toast.success("Item atualizado com sucesso.");
    },
    onError: () => {
      toast.error("Erro ao atualizar item. Tente novamente.");
    },
  });
}
