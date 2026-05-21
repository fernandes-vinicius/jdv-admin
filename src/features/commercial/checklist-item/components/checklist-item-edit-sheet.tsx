"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ChecklistItemEditForm } from "@/features/commercial/checklist-item/components/checklist-item-edit-form";
import type { ChecklistItem } from "@/features/commercial/checklist-item/types/checklist-item-types";

interface ChecklistItemEditSheetProps {
  item: ChecklistItem | null;
  onOpenChange: (open: boolean) => void;
}

export function ChecklistItemEditSheet({
  item,
  onOpenChange,
}: ChecklistItemEditSheetProps) {
  return (
    <Sheet open={!!item} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Editar item</SheetTitle>
          <SheetDescription>
            Atualize as informações do item do checklist.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-8 py-4">
          {item && (
            <ChecklistItemEditForm
              item={item}
              onSuccess={() => onOpenChange(false)}
              onCancel={() => onOpenChange(false)}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
