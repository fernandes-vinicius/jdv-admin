"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateSalesPlan } from "@/features/commercial/goals/actions/update-sales-plan";
import type { UpdateSalesPlanPayload } from "@/features/commercial/goals/types/goals-types";

interface UpdateSalesPlanArgs {
  id: string;
  payload: UpdateSalesPlanPayload;
}

export function useUpdateSalesPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: UpdateSalesPlanArgs) =>
      updateSalesPlan(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sales-plans"] });
      toast.success("Meta atualizada com sucesso.");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Erro ao atualizar meta. Tente novamente.",
      );
    },
  });
}
