"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableColumnSortButton } from "@/components/data-table/data-table-column-sort-button";
import { DataTableSearchFilter } from "@/components/data-table/datatable-search-filter";
import { Skeleton } from "@/components/ui/skeleton";
import { CHECKLIST_ICONS } from "@/features/commercial/components/checklist-icon-select";
import { ChecklistItemDataTableMenu } from "@/features/commercial/components/checklist-item-data-table-menu";
import { ChecklistItemTypeBadge } from "@/features/commercial/components/checklist-item-type-badge";
import { ChecklistItemTypeFilter } from "@/features/commercial/components/checklist-item-type-filter";
import { useChecklistItems } from "@/features/commercial/hooks/use-checklist-items";
import { useChecklistTypeFilter } from "@/features/commercial/hooks/use-checklist-type-filter";
import type { ChecklistItem } from "@/features/commercial/types/commercial-types";

const columns: ColumnDef<ChecklistItem>[] = [
  {
    accessorKey: "icon_name",
    size: 64,
    header: () => <div className="text-center">Ícone</div>,
    cell: ({ row }) => {
      const entry = CHECKLIST_ICONS.find(
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
        Label
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
    cell: ({ row }) => <ChecklistItemTypeBadge type={row.original.type} />,
  },
  {
    id: "actions",
    size: 48,
    cell: ({ row }) => <ChecklistItemDataTableMenu item={row.original} />,
  },
];

export function ChecklistItemDataTable() {
  const { filter } = useChecklistTypeFilter();

  const { data = [], isPending, isError } = useChecklistItems(filter);

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
        Erro ao carregar itens do checklist.
      </p>
    );
  }

  return (
    <DataTable
      columns={columns}
      data={data}
      render={(table) => (
        <div className="flex flex-wrap items-center gap-2">
          <ChecklistItemTypeFilter />
          <DataTableSearchFilter
            table={table}
            columnName="label"
            placeholder="Buscar por label..."
          />
        </div>
      )}
    />
  );
}
