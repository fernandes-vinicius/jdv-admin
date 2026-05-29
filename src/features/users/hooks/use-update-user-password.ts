"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateUserPassword } from "@/features/users/actions/update-user-password";

interface UpdatePasswordVars {
  id: string;
  new_password: string;
  must_change_password: boolean;
}

export function useUpdateUserPassword() {
  return useMutation({
    mutationFn: ({
      id,
      new_password,
      must_change_password,
    }: UpdatePasswordVars) =>
      updateUserPassword(id, new_password, must_change_password),
    onSuccess: (_, variables) => {
      toast.success("Senha atualizada com sucesso.", {
        action: {
          label: "Copiar senha",
          onClick: () => navigator.clipboard.writeText(variables.new_password),
        },
      });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erro ao atualizar senha. Tente novamente.",
      );
    },
  });
}
