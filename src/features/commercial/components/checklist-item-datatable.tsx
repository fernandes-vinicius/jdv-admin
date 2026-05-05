"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { CellSortableButton } from "@/components/data-table/cell-sortable-button";
import { DataTable } from "@/components/data-table/data-table";
import { SearchFilter } from "@/components/data-table/search-filter";
import { DialogConfirmation } from "@/components/dialog-confirmation";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { ChecklistItemEditSheet } from "@/features/commercial/components/checklist-item-edit-sheet";
import { useChecklistItems } from "@/features/commercial/hooks/use-checklist-items";
import { useDeleteChecklistItem } from "@/features/commercial/hooks/use-delete-checklist-item";
import { checklistItemTypeMapping } from "@/features/commercial/lib/checklist-item-type-mapping";
import {
  type ChecklistItem,
  ChecklistType,
} from "@/features/commercial/types/commercial-types";

type TabValue = ChecklistType | "all";

function getColumns(
  onEditClick: (item: ChecklistItem) => void,
  onDeleteClick: (item: ChecklistItem) => void,
): ColumnDef<ChecklistItem>[] {
  return [
    {
      accessorKey: "label",
      header: ({ column }) => (
        <CellSortableButton column={column}>Label</CellSortableButton>
      ),
    },
    {
      accessorKey: "type",
      header: ({ column }) => (
        <CellSortableButton column={column}>Tipo</CellSortableButton>
      ),
      cell: ({ row }) => (
        <div>{checklistItemTypeMapping[row.original.type]}</div>
      ),
    },
    {
      id: "actions",
      size: 100,
      cell: ({ row }) => (
        <ButtonGroup>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEditClick(row.original)}
          >
            Editar
          </Button>
          <Button
            variant="destructive"
            size="icon-sm"
            onClick={() => onDeleteClick(row.original)}
          >
            <TrashIcon />
            <span className="sr-only">Remover</span>
          </Button>
        </ButtonGroup>
      ),
    },
  ];
}

export function ChecklistItemDataTable() {
  const [selectedType, setSelectedType] = useState<TabValue>("all");
  const [itemToDelete, setItemToDelete] = useState<ChecklistItem | null>(null);
  const [itemToEdit, setItemToEdit] = useState<ChecklistItem | null>(null);

  const { data = [], isPending, isError } = useChecklistItems(selectedType);
  const { mutate: deleteItem, isPending: isDeleting } =
    useDeleteChecklistItem();

  const columns = getColumns(setItemToEdit, setItemToDelete);

  function handleConfirmDelete() {
    if (!itemToDelete) return;
    deleteItem(itemToDelete, {
      onSettled: () => setItemToDelete(null),
    });
  }

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
    <>
      <ChecklistItemEditSheet
        item={itemToEdit}
        onOpenChange={(open) => !open && setItemToEdit(null)}
      />

      <DialogConfirmation
        open={!!itemToDelete}
        onOpenChange={(open) => !open && setItemToDelete(null)}
        onConfirm={handleConfirmDelete}
        isPending={isDeleting}
        title="Remover item"
        description={`Tem certeza que deseja remover "${itemToDelete?.label}"? Esta ação não pode ser desfeita.`}
        confirmLabel="Remover"
      />

      <DataTable
        columns={columns}
        data={data}
        render={(table) => (
          <div className="flex flex-wrap items-center gap-2">
            <Select
              value={selectedType}
              onValueChange={(v) => setSelectedType(v as TabValue)}
            >
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tipo</SelectLabel>
                  <SelectItem value="all">Todos</SelectItem>
                  {Object.values(ChecklistType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {checklistItemTypeMapping[type]}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <SearchFilter table={table} columnName="label" />
          </div>
        )}
      />
    </>
  );
}
