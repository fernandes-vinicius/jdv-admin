"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { CellSortableButton } from "@/components/data-table/cell-sortable-button";
import { DataTable } from "@/components/data-table/data-table";
import { SearchFilter } from "@/components/data-table/search-filter";
import { Skeleton } from "@/components/ui/skeleton";
import { useUsers } from "@/features/users/hooks/use-users";
import type { User } from "@/features/users/types/users-types";

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <CellSortableButton column={column}>Nome</CellSortableButton>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <CellSortableButton column={column}>E-mail</CellSortableButton>
    ),
  },
];

export function UsersDataTable() {
  const { data = [], isPending, isError } = useUsers();

  if (isPending) {
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: skeleton list
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-destructive text-sm">
        Erro ao carregar usuários.
      </p>
    );
  }

  return (
    <DataTable
      columns={columns}
      data={data}
      render={(table) => <SearchFilter table={table} columnName="name" />}
    />
  );
}
