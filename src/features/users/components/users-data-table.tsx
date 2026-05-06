"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useSession } from "next-auth/react";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableColumnSortButton } from "@/components/data-table/data-table-column-sort-button";
import { DataTableSearchFilter } from "@/components/data-table/datatable-search-filter";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { UserDataTableMenu } from "@/features/users/components/user-data-table-menu";
import { useUsers } from "@/features/users/hooks/use-users";
import type { User } from "@/features/users/types/users-types";
import { cn } from "@/lib/utils";

function getColumns(currentUserId: string | undefined): ColumnDef<User>[] {
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

        return <UserDataTableMenu user={user} />;
      },
    },
  ];
}

export function UsersDataTable() {
  const { data: session } = useSession();
  const currentUserId = session?.user?.id;

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

  const columns = getColumns(currentUserId);

  return (
    <DataTable
      columns={columns}
      data={data}
      withPagination
      render={(table) => (
        <DataTableSearchFilter
          table={table}
          columnName="name"
          placeholder="Buscar por nome..."
        />
      )}
    />
  );
}
