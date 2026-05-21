"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createUser } from "@/features/users/actions/create-user";
import { toggleUserAdmin } from "@/features/users/actions/toggle-user-admin";
import type { CreateUserPayload } from "@/features/users/types/users-types";

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      email,
      password,
      is_admin,
    }: CreateUserPayload) => {
      const resp = await createUser({ name, email, password });
      if (is_admin) {
        await toggleUserAdmin(resp.user.id, true);
      }
      return resp;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Membro adicionado com sucesso.");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erro ao adicionar membro. Tente novamente.",
      );
    },
  });
}
