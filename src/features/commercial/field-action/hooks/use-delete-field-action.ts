"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteFieldAction } from "@/features/commercial/field-action/actions/delete-field-action";

export function useDeleteFieldAction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteFieldAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["field-actions"] });
      toast.success("Ação removida com sucesso.");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erro ao remover ação. Tente novamente.",
      );
    },
  });
}
