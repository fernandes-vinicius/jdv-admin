"use client";

import {
  BadgeCheck,
  Bell,
  BookOpenCheck,
  Calculator,
  Cast,
  ClipboardList,
  Coffee,
  FileText,
  Flag,
  Handshake,
  KeyRound,
  LayoutGrid,
  type LucideIcon,
  MapPin,
  PartyPopper,
  QrCode,
  Rotate3d,
  SignalHigh,
  SquareMenu,
  Table,
  TableProperties,
  Target,
  Trophy,
  Tv,
  Users,
  Wifi,
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

export const CHECKLIST_ICONS: IconEntry[] = [
  { id: "Flag", label: "banner", Icon: Flag },
  { id: "LayoutGrid", label: "maquete", Icon: LayoutGrid },
  { id: "Tv", label: "tv", Icon: Tv },
  { id: "TableProperties", label: "mesa", Icon: TableProperties },
  { id: "Table", label: "tabela", Icon: Table },
  { id: "BookOpenCheck", label: "book", Icon: BookOpenCheck },
  { id: "Wifi", label: "wifi", Icon: Wifi },
  { id: "ClipboardList", label: "fichas", Icon: ClipboardList },
  { id: "QrCode", label: "folhetos", Icon: QrCode },
  { id: "Calculator", label: "simulador", Icon: Calculator },
  { id: "SquareMenu", label: "placa", Icon: SquareMenu },
  { id: "Coffee", label: "cafe", Icon: Coffee },
  { id: "Users", label: "kids", Icon: Users },
  { id: "FileText", label: "escala", Icon: FileText },
  { id: "Rotate3d", label: "roleta", Icon: Rotate3d },
  { id: "SignalHigh", label: "grupo", Icon: SignalHigh },
  { id: "BadgeCheck", label: "regras", Icon: BadgeCheck },
  { id: "Bell", label: "sino", Icon: Bell },
  { id: "KeyRound", label: "chave", Icon: KeyRound },
  { id: "Target", label: "contador", Icon: Target },
  { id: "PartyPopper", label: "ambientacao", Icon: PartyPopper },
  { id: "Cast", label: "ranking_tv", Icon: Cast },
  { id: "Handshake", label: "indicacoes", Icon: Handshake },
  { id: "Trophy", label: "vendas", Icon: Trophy },
  { id: "MapPin", label: "corujao", Icon: MapPin },
];

interface ChecklistIconSelectProps {
  value?: string;
  onValueChange: (value: string) => void;
  id?: string;
  "aria-invalid"?: boolean;
}

export function ChecklistIconSelect({
  value,
  onValueChange,
  id,
  "aria-invalid": ariaInvalid,
}: ChecklistIconSelectProps) {
  const selected = CHECKLIST_ICONS.find((entry) => entry.id === value);

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
          {CHECKLIST_ICONS.map(({ id: entryId, label, Icon }) => (
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
