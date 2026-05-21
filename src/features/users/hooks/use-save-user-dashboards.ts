"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addUserDashboard } from "@/features/users/actions/add-user-dashboard";
import { removeUserDashboard } from "@/features/users/actions/remove-user-dashboard";
import type { UserDashboardPermission } from "@/features/users/types/users-types";

interface SaveUserDashboardsPayload {
  userId: string;
  selectedIds: string[];
  originalPermissions: UserDashboardPermission[];
}

export function useSaveUserDashboards() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      selectedIds,
      originalPermissions,
    }: SaveUserDashboardsPayload) => {
      const originalIds = originalPermissions.map((p) => p.id);

      const toAdd = selectedIds.filter((id) => !originalIds.includes(id));
      const toRemove = originalPermissions.filter(
        (p) => !selectedIds.includes(p.id),
      );

      await Promise.all([
        ...toAdd.map((dashboardId) => addUserDashboard(userId, dashboardId)),
        ...toRemove.map((p) => removeUserDashboard(userId, p.id)),
      ]);
    },
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ["user-dashboards", userId] });
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
