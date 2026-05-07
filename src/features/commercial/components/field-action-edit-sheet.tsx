"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { FieldActionForm } from "@/features/commercial/components/field-action-form";
import type { FieldAction } from "@/features/commercial/types/commercial-types";

interface FieldActionEditSheetProps {
  item: FieldAction | null;
  onOpenChange: (open: boolean) => void;
}

export function FieldActionEditSheet({
  item,
  onOpenChange,
}: FieldActionEditSheetProps) {
  return (
    <Sheet open={!!item} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Editar ação</SheetTitle>
          <SheetDescription>
            Atualize as informações da ação de campo.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-8 py-4">
          <FieldActionForm
            item={item}
            onSuccess={() => onOpenChange(false)}
            onCancel={() => onOpenChange(false)}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
