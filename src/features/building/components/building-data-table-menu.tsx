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
import { BuildingEditSheet } from "@/features/building/components/building-edit-sheet";
import { useDeleteBuilding } from "@/features/building/hooks/use-delete-building";
import type { Building } from "@/features/building/types/building-types";

type BuildingDataTableMenuProps = {
  item: Building;
};

export function BuildingDataTableMenu({ item }: BuildingDataTableMenuProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { mutate: deleteItem, isPending: isDeleting } = useDeleteBuilding();

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

      <BuildingEditSheet
        item={isEditOpen ? item : null}
        onOpenChange={setIsEditOpen}
      />

      <DialogConfirmation
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleConfirmDelete}
        isPending={isDeleting}
        title="Remover empreendimento"
        description={`Tem certeza que deseja remover "${item.name}"? Esta ação não pode ser desfeita.`}
        confirmLabel="Remover"
      />
    </>
  );
}
