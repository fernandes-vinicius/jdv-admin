import { Badge } from "@/components/ui/badge";
import { fieldActionTypeMapping } from "@/features/commercial/lib/field-action-type-mapping";
import type { FieldActionType } from "@/features/commercial/types/commercial-types";
import { cn } from "@/lib/utils";

type FieldActionTypeBadgeProps = {
  type: FieldActionType;
};

export function FieldActionTypeBadge({ type }: FieldActionTypeBadgeProps) {
  const { label, color } = fieldActionTypeMapping[type];

  return (
    <Badge variant="outline" className="items-center leading-none">
      <span className={cn("size-1.5 shrink-0", color)} />
      {label}
    </Badge>
  );
}
