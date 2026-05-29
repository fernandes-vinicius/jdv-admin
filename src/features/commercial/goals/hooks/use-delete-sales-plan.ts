"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteSalesPlan } from "@/features/commercial/goals/actions/delete-sales-plan";

export function useDeleteSalesPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteSalesPlan(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sales-plans"] });
      toast.success("Meta removida com sucesso.");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erro ao remover meta. Tente novamente.",
      );
    },
  });
}
