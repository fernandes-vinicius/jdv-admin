"use client";

import { useState } from "react";
import { DialogConfirmation } from "@/components/dialog-confirmation";
import { MoreHorizontalIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChecklistItemEditSheet } from "@/features/commercial/checklist-item/components/checklist-item-edit-sheet";
import { useDeleteChecklistItem } from "@/features/commercial/checklist-item/hooks/use-delete-checklist-item";
import type { ChecklistItem } from "@/features/commercial/checklist-item/types/checklist-item-types";

type ChecklistItemDataTableMenuProps = {
  item: ChecklistItem;
};

export function ChecklistItemDataTableMenu({
  item,
}: ChecklistItemDataTableMenuProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { mutate: deleteItem, isPending: isDeleting } =
    useDeleteChecklistItem();

  function handleConfirmDelete() {
    deleteItem(item, { onSettled: () => setIsDeleteOpen(false) });
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-sm">
            <MoreHorizontalIcon className="size-4" />
            <span className="sr-only">Ações</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
            Editar
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => setIsDeleteOpen(true)}
          >
            Remover
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ChecklistItemEditSheet
        item={isEditOpen ? item : null}
        onOpenChange={(open) => setIsEditOpen(open)}
      />

      <DialogConfirmation
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleConfirmDelete}
        isPending={isDeleting}
        title="Remover item"
        description={`Tem certeza que deseja remover "${item.label}"? Esta ação não pode ser desfeita.`}
        confirmLabel="Remover"
      />
    </>
  );
}
