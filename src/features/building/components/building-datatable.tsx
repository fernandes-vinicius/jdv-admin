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
    accessorKey: "empreendimento_id",
    size: 80,
    header: ({ column }) => (
      <div className="text-center">
        <DataTableColumnSortButton column={column}>
          Emp. ID
        </DataTableColumnSortButton>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center text-muted-foreground">
        {row.getValue("empreendimento_id")}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnSortButton column={column}>
        Nome
      </DataTableColumnSortButton>
    ),
  },
  {
    accessorKey: "codigo_interno_do_empreendimento",
    header: () => <div className="text-center">Código Sienge</div>,
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.codigo_interno_do_empreendimento ?? "—"}
      </div>
    ),
  },
  {
    accessorKey: "is_active",
    size: 80,
    header: () => <div className="text-center">Ativo</div>,
    cell: ({ row }) => {
      const isActive = row.original.is_active;
      return (
        <div className="text-center">
          <span
            data-active={isActive}
            className="shrink-0 p-1.5 font-semibold text-[0.625rem] uppercase leading-none tracking-widest data-[active=false]:bg-red-50 data-[active=true]:bg-emerald-50 data-[active=false]:text-red-700 data-[active=true]:text-emerald-700 dark:data-[active=false]:bg-red-500/10 dark:data-[active=true]:bg-emerald-500/10 dark:data-[active=false]:text-red-500 dark:data-[active=true]:text-emerald-500"
          >
            {isActive ? "Sim" : "Não"}
          </span>
        </div>
      );
    },
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
