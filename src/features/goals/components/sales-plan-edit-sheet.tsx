"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { SalesPlanEditForm } from "@/features/goals/components/sales-plan-edit-form";
import type { SalesPlan } from "@/features/goals/types/goals-types";

interface SalesPlanEditSheetProps {
  item: SalesPlan | null;
  onOpenChange: (open: boolean) => void;
}

export function SalesPlanEditSheet({
  item,
  onOpenChange,
}: SalesPlanEditSheetProps) {
  return (
    <Sheet open={!!item} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Editar meta</SheetTitle>
          <SheetDescription>
            Atualize o estoque inicial e as metas mensais de vendas.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-8 py-4">
          {item && (
            <SalesPlanEditForm
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
