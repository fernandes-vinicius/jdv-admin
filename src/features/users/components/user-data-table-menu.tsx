"use client";

import { useState } from "react";
import { DialogConfirmation } from "@/components/dialog-confirmation";
import {
  // ClipboardClockIcon,
  MoreHorizontalIcon,
  // SettingsIcon,
  // ShieldUserIcon,
  // TrashIcon,
} from "@/components/icons";
import { Button } from "@/components/ui/button";
// import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteUser } from "@/features/users/hooks/use-delete-user";
import { useToggleUserAdmin } from "@/features/users/hooks/use-toggle-user-admin";
import type { User } from "@/features/users/types/users-types";
import { UserAccessSheet } from "./user-access-sheet";
import { UserDashboardsSheet } from "./user-dashboards-sheet";
import { UserEmpreendimentosSheet } from "./user-empreendimentos-sheet";
import { UserUpdatePasswordSheet } from "./user-update-password-sheet";

type ActionState =
  | { type: "delete"; user: User }
  | { type: "toggle-admin"; user: User }
  | null;

type UserDataTableMenuProps = {
  user: User;
  isCurrentUserAdmin: boolean;
};

export function UserDataTableMenu({
  user,
  isCurrentUserAdmin,
}: UserDataTableMenuProps) {
  const [pendingAction, setPendingAction] = useState<ActionState>(null);
  const [accessSheetUser, setAccessSheetUser] = useState<User | null>(null);
  const [dashboardsSheetUser, setDashboardsSheetUser] = useState<User | null>(
    null,
  );
  const [empreendimentosSheetUser, setEmpreendimentosSheetUser] =
    useState<User | null>(null);
  const [updatePasswordSheetUser, setUpdatePasswordSheetUser] =
    useState<User | null>(null);

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
            {user.is_admin ? "Revogar admin" : "Tornar admin"}
          </DropdownMenuItem>
          {isCurrentUserAdmin && (
            <DropdownMenuItem
              onClick={() => setUpdatePasswordSheetUser(user)}
            >
              Alterar senha
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Acessos</DropdownMenuLabel>
          {isCurrentUserAdmin && (
            <DropdownMenuItem onClick={() => setDashboardsSheetUser(user)}>
              Dashboards
            </DropdownMenuItem>
          )}
          {isCurrentUserAdmin && (
            <DropdownMenuItem
              onClick={() => setEmpreendimentosSheetUser(user)}
            >
              Empreendimentos
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => onAction({ type: "delete", user })}
          >
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <UserAccessSheet
        user={accessSheetUser}
        onOpenChange={(open) => !open && setAccessSheetUser(null)}
      />

      <UserDashboardsSheet
        user={dashboardsSheetUser}
        onOpenChange={(open) => !open && setDashboardsSheetUser(null)}
      />

      <UserEmpreendimentosSheet
        user={empreendimentosSheetUser}
        onOpenChange={(open) => !open && setEmpreendimentosSheetUser(null)}
      />

      <UserUpdatePasswordSheet
        user={updatePasswordSheetUser}
        onOpenChange={(open) => !open && setUpdatePasswordSheetUser(null)}
      />

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
