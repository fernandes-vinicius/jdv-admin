"use client";

import {
  Bell,
  Coffee,
  GraduationCap,
  type LucideIcon,
  Megaphone,
  PartyPopper,
  PhoneCall,
  Smartphone,
  Sword,
  Swords,
  Target,
  Theater,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type IconEntry = {
  id: string;
  label: string;
  Icon: LucideIcon;
};

export const FIELD_ACTION_ICONS: IconEntry[] = [
  { id: "GraduationCap", label: "graduação", Icon: GraduationCap },
  { id: "Target", label: "alvo", Icon: Target },
  { id: "Swords", label: "espadas", Icon: Swords },
  { id: "Bell", label: "sino", Icon: Bell },
  { id: "Theater", label: "teatro", Icon: Theater },
  { id: "Megaphone", label: "megafone", Icon: Megaphone },
  { id: "Sword", label: "espada", Icon: Sword },
  { id: "Smartphone", label: "celular", Icon: Smartphone },
  { id: "Coffee", label: "café", Icon: Coffee },
  { id: "PhoneCall", label: "ligação", Icon: PhoneCall },
  { id: "PartyPopper", label: "festa", Icon: PartyPopper },
];

interface FieldActionIconSelectProps {
  value?: string;
  onValueChange: (value: string) => void;
  id?: string;
  "aria-invalid"?: boolean;
}

export function FieldActionIconSelect({
  value,
  onValueChange,
  id,
  "aria-invalid": ariaInvalid,
}: FieldActionIconSelectProps) {
  const selected = FIELD_ACTION_ICONS.find((entry) => entry.id === value);

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger id={id} aria-invalid={ariaInvalid} className="w-full">
        {selected ? (
          <span className="flex items-center gap-2">
            <selected.Icon className="size-4 shrink-0" />
            <span className="truncate">{selected.label}</span>
          </span>
        ) : (
          <SelectValue placeholder="Selecione um ícone" />
        )}
      </SelectTrigger>
      <SelectContent
        position="popper"
        className="w-[--radix-select-trigger-width]"
      >
        <SelectGroup>
          <SelectLabel>Ícones</SelectLabel>
          {FIELD_ACTION_ICONS.map(({ id: entryId, label, Icon }) => (
            <SelectItem key={entryId} value={entryId}>
              <Icon className="size-4 shrink-0" />
              <span>{label}</span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
