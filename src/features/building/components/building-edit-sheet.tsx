"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { BuildingForm } from "@/features/building/components/building-form";
import type { Building } from "@/features/building/types/building-types";

interface BuildingEditSheetProps {
  item: Building | null;
  onOpenChange: (open: boolean) => void;
}

export function BuildingEditSheet({
  item,
  onOpenChange,
}: BuildingEditSheetProps) {
  return (
    <Sheet open={!!item} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Editar empreendimento</SheetTitle>
          <SheetDescription>
            Atualize o nome do empreendimento.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-8 py-4">
          <BuildingForm
            item={item}
            onSuccess={() => onOpenChange(false)}
            onCancel={() => onOpenChange(false)}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
