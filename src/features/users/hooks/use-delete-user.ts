"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteUser } from "@/features/users/actions/delete-user";

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Usuário removido com sucesso.");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Erro ao remover usuário. Tente novamente.",
      );
    },
  });
}
