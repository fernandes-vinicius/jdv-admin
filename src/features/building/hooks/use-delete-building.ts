"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteBuilding } from "@/features/building/actions/delete-building";

export function useDeleteBuilding() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteBuilding(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["buildings"] });
      toast.success("Empreendimento removido com sucesso.");
    },
    onError: () => {
      toast.error("Erro ao remover empreendimento. Tente novamente.");
    },
  });
}
