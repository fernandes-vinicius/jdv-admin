"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { saveUserProjects } from "@/features/users/actions/save-user-projects";

interface SaveUserProjectsPayload {
  userId: string;
  projectIds: number[];
}

export function useSaveUserProjects() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, projectIds }: SaveUserProjectsPayload) =>
      saveUserProjects(userId, projectIds),
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ["user-projects", userId] });
      toast.success("Permissões salvas com sucesso.");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erro ao salvar permissões. Tente novamente.",
      );
    },
  });
}
