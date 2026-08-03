import { Badge } from "@/components/ui/badge";
import { checklistItemPeriodMapping } from "@/features/commercial/checklist-item/lib/checklist-item-period-mapping";
import type { ChecklistPeriod } from "@/features/commercial/checklist-item/types/checklist-item-types";
import { cn } from "@/lib/utils";

type ChecklistItemPeriodBadgeProps = {
  period: ChecklistPeriod;
};

export function ChecklistItemPeriodBadge({
  period,
}: ChecklistItemPeriodBadgeProps) {
  const entry = checklistItemPeriodMapping[period];
  if (!entry) return null;
  const { label, color } = entry;

  return (
    <Badge variant="outline" className="items-center leading-none">
      <span className={cn("size-1.5 shrink-0", color)} />
      {label}
    </Badge>
  );
}
