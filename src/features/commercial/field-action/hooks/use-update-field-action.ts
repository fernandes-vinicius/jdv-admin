"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateFieldAction } from "@/features/commercial/field-action/actions/update-field-action";

export function useUpdateFieldAction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateFieldAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["field-actions"] });
      toast.success("Ação atualizada com sucesso.");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erro ao atualizar ação. Tente novamente.",
      );
    },
  });
}
