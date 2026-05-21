"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableColumnSortButton } from "@/components/data-table/data-table-column-sort-button";
import { DataTableSearchFilter } from "@/components/data-table/datatable-search-filter";
import { Skeleton } from "@/components/ui/skeleton";
import { SalesPlanDataTableMenu } from "@/features/commercial/goals/components/sales-plan-data-table-menu";
import { useSalesPlans } from "@/features/commercial/goals/hooks/use-sales-plans";
import type { SalesPlan } from "@/features/commercial/goals/types/goals-types";

const columns: ColumnDef<SalesPlan>[] = [
  {
    accessorKey: "empreendimento_name",
    header: ({ column }) => (
      <DataTableColumnSortButton column={column}>
        Empreendimento
      </DataTableColumnSortButton>
    ),
  },
  {
    accessorKey: "year",
    size: 80,
    header: ({ column }) => (
      <div className="text-center">
        <DataTableColumnSortButton column={column}>
          Ano
        </DataTableColumnSortButton>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center font-medium">{row.original.year}</div>
    ),
  },
  {
    accessorKey: "estoque_inicial",
    size: 110,
    header: () => <div className="text-center">Est. Inicial</div>,
    cell: ({ row }) => (
      <div className="text-center text-muted-foreground">
        {row.original.estoque_inicial}
      </div>
    ),
  },
  {
    accessorKey: "vendas_total",
    size: 110,
    header: () => <div className="text-center">Total Planejado</div>,
    cell: ({ row }) => (
      <div className="text-center font-medium">{row.original.vendas_total}</div>
    ),
  },
  {
    accessorKey: "estoque_final",
    size: 110,
    header: () => <div className="text-center">Est. Final</div>,
    cell: ({ row }) => (
      <div className="text-center text-muted-foreground">
        {row.original.estoque_final}
      </div>
    ),
  },
  {
    id: "actions",
    size: 48,
    cell: ({ row }) => (
      <div className="flex justify-end">
        <SalesPlanDataTableMenu item={row.original} />
      </div>
    ),
  },
];

export function SalesPlanDataTable() {
  const { data = [], isPending, isError } = useSalesPlans();

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
        Erro ao carregar metas de vendas.
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
          columnName="empreendimento_name"
          placeholder="Buscar por empreendimento..."
        />
      )}
    />
  );
}
