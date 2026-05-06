"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useChecklistTypeFilter } from "@/features/commercial/hooks/use-checklist-type-filter";
import { checklistItemTypeMapping } from "@/features/commercial/lib/checklist-item-type-mapping";
import { ChecklistType } from "@/features/commercial/types/commercial-types";

export function ChecklistItemTypeFilter() {
  const { key, setKey } = useChecklistTypeFilter();

  return (
    <Select value={key} onValueChange={setKey}>
      <SelectTrigger className="w-full sm:w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Tipo</SelectLabel>
          <SelectItem value="all">Todos</SelectItem>
          {Object.entries(ChecklistType).map(([enumKey, enumValue]) => (
            <SelectItem key={enumKey} value={enumKey}>
              {checklistItemTypeMapping[enumValue].label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
