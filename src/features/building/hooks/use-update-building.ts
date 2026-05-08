"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateBuilding } from "@/features/building/actions/update-building";

export function useUpdateBuilding() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      updateBuilding(id, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["buildings"] });
      toast.success("Empreendimento atualizado com sucesso.");
    },
    onError: () => {
      toast.error("Erro ao atualizar empreendimento. Tente novamente.");
    },
  });
}
