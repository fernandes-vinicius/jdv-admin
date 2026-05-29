"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBuildings } from "@/features/building/hooks/use-buildings";

interface BuildingSelectProps {
  value?: number;
  onValueChange: (value: number) => void;
  id?: string;
  "aria-invalid"?: boolean;
}

export function BuildingSelect({
  value,
  onValueChange,
  id,
  "aria-invalid": ariaInvalid,
}: BuildingSelectProps) {
  const { data: buildings = [], isLoading } = useBuildings();

  return (
    <Select
      disabled={isLoading}
      value={value !== undefined && !Number.isNaN(value) ? String(value) : ""}
      onValueChange={(val) => onValueChange(Number(val))}
    >
      <SelectTrigger id={id} aria-invalid={ariaInvalid} className="w-full">
        <SelectValue placeholder="Selecione um empreendimento" />
      </SelectTrigger>
      <SelectContent
        position="popper"
        className="w-[--radix-select-trigger-width]"
      >
        {buildings.map((b) => (
          <SelectItem
            key={b.empreendimento_id}
            value={String(b.empreendimento_id)}
          >
            {b.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
