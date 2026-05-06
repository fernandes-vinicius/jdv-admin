"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ChecklistItemForm } from "@/features/commercial/components/checklist-item-form";
import type { ChecklistItem } from "@/features/commercial/types/commercial-types";

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
          <ChecklistItemForm
            item={item}
            onSuccess={() => onOpenChange(false)}
            onCancel={() => onOpenChange(false)}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
