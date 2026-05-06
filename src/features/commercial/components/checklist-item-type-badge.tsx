import { Badge } from "@/components/ui/badge";
import { checklistItemTypeMapping } from "@/features/commercial/lib/checklist-item-type-mapping";
import type { ChecklistType } from "@/features/commercial/types/commercial-types";
import { cn } from "@/lib/utils";

type ChecklistItemTypeBadgeProps = {
  type: ChecklistType;
};

export function ChecklistItemTypeBadge({ type }: ChecklistItemTypeBadgeProps) {
  const { label, color } = checklistItemTypeMapping[type];

  return (
    <Badge variant="outline" className="items-center leading-none">
      <span className={cn("size-1.5 shrink-0", color)} />
      {label}
    </Badge>
  );
}
