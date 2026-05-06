"use client";

import { useState } from "react";
import { DialogConfirmation } from "@/components/dialog-confirmation";
import {
  MoreHorizontalIcon,
  ShieldUserIcon,
  TrashIcon,
} from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { User } from "@/features/users/types/users-types";
import { useDeleteUser } from "../hooks/use-delete-user";
import { useToggleUserAdmin } from "../hooks/use-toggle-user-admin";

type ActionState =
  | { type: "delete"; user: User }
  | { type: "toggle-admin"; user: User }
  | null;

type UserDataTableMenuProps = {
  user: User;
};

export function UserDataTableMenu({ user }: UserDataTableMenuProps) {
  const [pendingAction, setPendingAction] = useState<ActionState>(null);

  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();
  const { mutate: toggleAdmin, isPending: isTogglingAdmin } =
    useToggleUserAdmin();

  function onAction(action: ActionState) {
    setPendingAction(action);
  }

  function handleConfirm() {
    if (!pendingAction) return;

    if (pendingAction.type === "delete") {
      deleteUser(pendingAction.user.id, {
        onSettled: () => setPendingAction(null),
      });
    } else {
      toggleAdmin(pendingAction.user, {
        onSettled: () => setPendingAction(null),
      });
    }
  }

  const isAdminToggle = pendingAction?.type === "toggle-admin";
  const userName = pendingAction?.user.name ?? "";
  const targetIsAdmin = pendingAction?.user.is_admin ?? false;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-sm">
            <MoreHorizontalIcon className="size-4" />
            <span className="sr-only">Ações</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => onAction({ type: "toggle-admin", user })}
          >
            <ShieldUserIcon className="size-4" />
            {user.is_admin ? "Revogar admin" : "Tornar admin"}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => onAction({ type: "delete", user })}
          >
            <TrashIcon className="size-4" />
            Remover
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogConfirmation
        open={!!pendingAction}
        onOpenChange={(open) => !open && setPendingAction(null)}
        onConfirm={handleConfirm}
        isPending={isDeleting || isTogglingAdmin}
        title={
          isAdminToggle
            ? targetIsAdmin
              ? "Revogar administrador"
              : "Tornar administrador"
            : "Remover usuário"
        }
        description={
          isAdminToggle
            ? targetIsAdmin
              ? `Tem certeza que deseja revogar o acesso de administrador de "${userName}"?`
              : `Tem certeza que deseja tornar "${userName}" administrador?`
            : `Tem certeza que deseja remover "${userName}"? Esta ação não pode ser desfeita.`
        }
        confirmLabel={
          isAdminToggle
            ? targetIsAdmin
              ? "Revogar"
              : "Tornar admin"
            : "Remover"
        }
      />
    </>
  );
}
