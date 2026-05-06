"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableColumnSortButton } from "@/components/data-table/data-table-column-sort-button";
import { DataTableSearchFilter } from "@/components/data-table/datatable-search-filter";
import { Skeleton } from "@/components/ui/skeleton";
import { FIELD_ACTION_ICONS } from "@/features/commercial/components/field-action-icon-select";
import { FieldActionTypeBadge } from "@/features/commercial/components/field-action-type-badge";
import { FieldActionTypeFilter } from "@/features/commercial/components/field-action-type-filter";
import { useFieldActionTypeFilter } from "@/features/commercial/hooks/use-field-action-type-filter";
import { useFieldActions } from "@/features/commercial/hooks/use-field-actions";
import type { FieldActionItem } from "@/features/commercial/types/commercial-types";

const columns: ColumnDef<FieldActionItem>[] = [
  {
    accessorKey: "icon_name",
    size: 64,
    header: () => <div className="text-center">Ícone</div>,
    cell: ({ row }) => {
      const entry = FIELD_ACTION_ICONS.find(
        (i) => i.id === row.original.icon_name,
      );
      if (!entry) return null;
      return (
        <div className="flex items-center justify-center">
          <div className="flex size-8 shrink-0 items-center justify-center bg-primary/10 text-primary [&_svg:not([class*='size-'])]:size-3.5">
            <entry.Icon />
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "label",
    header: ({ column }) => (
      <DataTableColumnSortButton column={column}>
        Nome
      </DataTableColumnSortButton>
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnSortButton column={column}>
        Tipo
      </DataTableColumnSortButton>
    ),
    cell: ({ row }) => <FieldActionTypeBadge type={row.original.type} />,
  },
];

export function FieldActionDataTable() {
  const { filter } = useFieldActionTypeFilter();
  const { data = [], isPending, isError } = useFieldActions(filter);

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
        Erro ao carregar armas.
      </p>
    );
  }

  return (
    <DataTable
      columns={columns}
      data={data}
      render={(table) => (
        <div className="flex flex-wrap items-center gap-2">
          <FieldActionTypeFilter />
          <DataTableSearchFilter
            table={table}
            columnName="label"
            placeholder="Buscar por nome..."
          />
        </div>
      )}
    />
  );
}
