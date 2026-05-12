"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { toggleUserAdmin } from "@/features/users/actions/toggle-user-admin";
import type { User } from "@/features/users/types/users-types";

export function useToggleUserAdmin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user: Pick<User, "id" | "is_admin">) =>
      toggleUserAdmin(user.id, !user.is_admin),
    onSuccess: (_, user) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      const label = user.is_admin ? "revogado" : "concedido";
      toast.success(`Acesso de administrador ${label} com sucesso.`);
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Erro ao alterar permissão. Tente novamente.",
      );
    },
  });
}
