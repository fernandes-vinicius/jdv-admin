"use client";

import { useState } from "react";
import { DialogConfirmation } from "@/components/dialog-confirmation";
import { MoreHorizontalIcon, PencilIcon, TrashIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FieldActionEditSheet } from "@/features/commercial/components/field-action-edit-sheet";
import { useDeleteFieldAction } from "@/features/commercial/hooks/use-delete-field-action";
import type { FieldAction } from "@/features/commercial/types/commercial-types";

type FieldActionDataTableMenuProps = {
  item: FieldAction;
};

export function FieldActionDataTableMenu({
  item,
}: FieldActionDataTableMenuProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { mutate: deleteItem, isPending: isDeleting } = useDeleteFieldAction();

  function handleConfirmDelete() {
    deleteItem(item.id, { onSettled: () => setIsDeleteOpen(false) });
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
            <PencilIcon className="size-4" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => setIsDeleteOpen(true)}
          >
            <TrashIcon className="size-4" />
            Remover
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <FieldActionEditSheet
        item={isEditOpen ? item : null}
        onOpenChange={setIsEditOpen}
      />

      <DialogConfirmation
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleConfirmDelete}
        isPending={isDeleting}
        title="Remover ação"
        description={`Tem certeza que deseja remover "${item.nome}"? Esta ação não pode ser desfeita.`}
        confirmLabel="Remover"
      />
    </>
  );
}
