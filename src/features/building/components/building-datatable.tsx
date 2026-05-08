"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableColumnSortButton } from "@/components/data-table/data-table-column-sort-button";
import { DataTableSearchFilter } from "@/components/data-table/datatable-search-filter";
import { Skeleton } from "@/components/ui/skeleton";
import { BuildingDataTableMenu } from "@/features/building/components/building-data-table-menu";
import { useBuildings } from "@/features/building/hooks/use-buildings";
import type { Building } from "@/features/building/types/building-types";

const columns: ColumnDef<Building>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnSortButton column={column}>
        Nome
      </DataTableColumnSortButton>
    ),
  },
  {
    id: "actions",
    size: 48,
    cell: ({ row }) => (
      <div className="flex justify-end">
        <BuildingDataTableMenu item={row.original} />
      </div>
    ),
  },
];

export function BuildingDataTable() {
  const { data = [], isPending, isError } = useBuildings();

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
        Erro ao carregar empreendimentos.
      </p>
    );
  }

  return (
    <DataTable
      columns={columns}
      data={data}
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
