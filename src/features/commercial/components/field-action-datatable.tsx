"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableColumnSortButton } from "@/components/data-table/data-table-column-sort-button";
import { DataTableSearchFilter } from "@/components/data-table/datatable-search-filter";
import { Skeleton } from "@/components/ui/skeleton";
import { FIELD_ACTION_ACCENTS } from "@/features/commercial/components/field-action-accent-select";
import { FieldActionDataTableMenu } from "@/features/commercial/components/field-action-data-table-menu";
import { FIELD_ACTION_ICONS } from "@/features/commercial/components/field-action-icon-select";
import { FieldActionTypeBadge } from "@/features/commercial/components/field-action-type-badge";
import { FieldActionTypeFilter } from "@/features/commercial/components/field-action-type-filter";
import { useFieldActionTypeFilter } from "@/features/commercial/hooks/use-field-action-type-filter";
import { useFieldActions } from "@/features/commercial/hooks/use-field-actions";
import {
  type FieldAction,
  FieldActionType,
} from "@/features/commercial/types/commercial-types";

const columns: ColumnDef<FieldAction>[] = [
  {
    accessorKey: "icon_name",
    size: 64,
    header: () => <div className="text-center">Ícone</div>,
    cell: ({ row }) => {
      const iconEntry = FIELD_ACTION_ICONS.find(
        (i) => i.id === row.original.icon_name,
      );
      const accentEntry = FIELD_ACTION_ACCENTS.find(
        (a) => a.id === row.original.accent,
      );
      if (!iconEntry) return null;
      return (
        <div className="flex items-center justify-center">
          <div
            className={`flex size-8 shrink-0 items-center justify-center [&_svg:not([class*='size-'])]:size-3.5 ${accentEntry?.iconBgClass ?? "bg-primary/10"} ${accentEntry?.iconTextClass ?? "text-primary"}`}
          >
            <iconEntry.Icon />
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "nome",
    header: ({ column }) => (
      <DataTableColumnSortButton column={column}>
        Nome
      </DataTableColumnSortButton>
    ),
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span>{row.original.nome}</span>
        {row.original.descricao && (
          <span className="text-muted-foreground text-xs">
            {row.original.descricao}
          </span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "resultado",
    header: ({ column }) => (
      <DataTableColumnSortButton column={column}>
        Resultado
      </DataTableColumnSortButton>
    ),
    cell: ({ row }) => row.original.resultado,
  },
  {
    accessorKey: "custo",
    header: ({ column }) => (
      <DataTableColumnSortButton column={column}>
        Custo
      </DataTableColumnSortButton>
    ),
    cell: ({ row }) =>
      row.original.type === FieldActionType.FIELD_ACTION ? (
        <span className="font-medium">{row.original.custo}</span>
      ) : null,
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
  {
    id: "actions",
    size: 48,
    cell: ({ row }) => (
      <div className="flex justify-end">
        <FieldActionDataTableMenu item={row.original} />
      </div>
    ),
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
    return <p className="text-destructive text-sm">Erro ao carregar armas.</p>;
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
            columnName="nome"
            placeholder="Buscar por nome..."
          />
        </div>
      )}
    />
  );
}
