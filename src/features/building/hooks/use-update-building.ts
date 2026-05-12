"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateBuilding } from "@/features/building/actions/update-building";
import type { UpdateBuildingPayload } from "@/features/building/types/building-types";

export function useUpdateBuilding() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateBuildingPayload }) =>
      updateBuilding(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["buildings"] });
      toast.success("Empreendimento atualizado com sucesso.");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Erro ao atualizar empreendimento. Tente novamente.",
      );
    },
  });
}
