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
import { useFieldActionTypeFilter } from "@/features/commercial/hooks/use-field-action-type-filter";
import { fieldActionTypeMapping } from "@/features/commercial/lib/field-action-type-mapping";
import { FieldActionType } from "@/features/commercial/types/commercial-types";

export function FieldActionTypeFilter() {
  const { key, setKey } = useFieldActionTypeFilter();

  return (
    <Select value={key} onValueChange={setKey}>
      <SelectTrigger className="w-full sm:w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Tipo</SelectLabel>
          <SelectItem value="all">Todos</SelectItem>
          {Object.entries(FieldActionType).map(([enumKey, enumValue]) => (
            <SelectItem key={enumKey} value={enumKey}>
              {fieldActionTypeMapping[enumValue].label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
