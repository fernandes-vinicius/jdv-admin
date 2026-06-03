"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableColumnSortButton } from "@/components/data-table/data-table-column-sort-button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAdminFilter } from "@/features/users/components/user-admin-filter";
import { UserDataTableMenu } from "@/features/users/components/user-data-table-menu";
import { useUserAdminFilter } from "@/features/users/hooks/use-user-admin-filter";
import { useUsers } from "@/features/users/hooks/use-users";
import type { User } from "@/features/users/types/users-types";
import { cn } from "@/lib/utils";

function getColumns(
  currentUserId: string | undefined,
  currentUserIsAdmin: boolean,
): ColumnDef<User>[] {
  return [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnSortButton column={column}>
          Nome
        </DataTableColumnSortButton>
      ),
      cell: ({ row }) => {
        const isCurrent = row.original.id === currentUserId;
        return (
          <div className="flex items-center gap-2">
            <span className={cn({ "font-bold": isCurrent })}>
              {row.original.name}
            </span>
            {isCurrent && <Badge variant="secondary">você</Badge>}
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnSortButton column={column}>
          E-mail
        </DataTableColumnSortButton>
      ),
    },
    {
      accessorKey: "is_admin",
      header: ({ column }) => (
        <DataTableColumnSortButton column={column}>
          Tipo
        </DataTableColumnSortButton>
      ),
      cell: ({ row }) => {
        const isAdmin = row.original.is_admin;
        return (
          <Badge variant={isAdmin ? "default" : "outline"}>
            {isAdmin ? <strong>Admin</strong> : "Membro"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "last_login_at",
      header: ({ column }) => (
        <DataTableColumnSortButton column={column}>
          Último login
        </DataTableColumnSortButton>
      ),
      cell: ({ row }) =>
        row.original.last_login_at
          ? new Date(row.original.last_login_at).toLocaleString("pt-BR")
          : "—",
    },
    {
      id: "actions",
      size: 48,
      cell: ({ row }) => {
        const user = row.original;

        if (user.id === currentUserId) return null;

        return (
          <UserDataTableMenu
            user={user}
            isCurrentUserAdmin={currentUserIsAdmin}
          />
        );
      },
    },
  ];
}

export function UsersDataTable() {
  const { data: session } = useSession();
  const currentUserId = session?.user?.id;
  const currentUserIsAdmin = session?.user?.is_admin ?? false;

  const [search, setSearch] = useState("");
  const { key: adminFilterKey } = useUserAdminFilter();
  const { data = [], isPending, isError } = useUsers();

  if (isPending) {
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={String(i)} className="h-10 w-full" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-destructive text-sm">Erro ao carregar usuários.</p>
    );
  }

  const columns = getColumns(currentUserId, currentUserIsAdmin);

  const q = search.toLowerCase();
  const filtered = data.filter((u) => {
    const matchesSearch =
      !q ||
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q);
    const matchesAdmin =
      adminFilterKey === "all" ||
      (adminFilterKey === "true" ? u.is_admin : !u.is_admin);
    return matchesSearch && matchesAdmin;
  });

  return (
    <DataTable
      columns={columns}
      data={filtered}
      withPagination
      render={() => (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <Input
            placeholder="Buscar por nome ou e-mail..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="sm:max-w-sm"
          />
          <div className="inline-flex gap-4 items-center">
            <span className="text-muted-foreground shrink-0 text-sm font-medium">
              Filtrar por:
            </span>
            <UserAdminFilter />
          </div>
        </div>
      )}
    />
  );
}
