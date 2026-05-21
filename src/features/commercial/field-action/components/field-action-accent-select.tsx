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

type AccentEntry = {
  id: string;
  label: string;
  bgClass: string;
  iconBgClass: string;
  iconTextClass: string;
};

export const FIELD_ACTION_ACCENTS: AccentEntry[] = [
  {
    id: "slate",
    label: "Slate",
    bgClass: "bg-slate-500",
    iconBgClass: "bg-slate-500/10",
    iconTextClass: "text-slate-500",
  },
  {
    id: "gray",
    label: "Gray",
    bgClass: "bg-gray-500",
    iconBgClass: "bg-gray-500/10",
    iconTextClass: "text-gray-500",
  },
  {
    id: "zinc",
    label: "Zinc",
    bgClass: "bg-zinc-500",
    iconBgClass: "bg-zinc-500/10",
    iconTextClass: "text-zinc-500",
  },
  {
    id: "stone",
    label: "Stone",
    bgClass: "bg-stone-500",
    iconBgClass: "bg-stone-500/10",
    iconTextClass: "text-stone-500",
  },
  {
    id: "red",
    label: "Red",
    bgClass: "bg-red-500",
    iconBgClass: "bg-red-500/10",
    iconTextClass: "text-red-500",
  },
  {
    id: "orange",
    label: "Orange",
    bgClass: "bg-orange-500",
    iconBgClass: "bg-orange-500/10",
    iconTextClass: "text-orange-500",
  },
  {
    id: "amber",
    label: "Amber",
    bgClass: "bg-amber-500",
    iconBgClass: "bg-amber-500/10",
    iconTextClass: "text-amber-500",
  },
  {
    id: "yellow",
    label: "Yellow",
    bgClass: "bg-yellow-500",
    iconBgClass: "bg-yellow-500/10",
    iconTextClass: "text-yellow-500",
  },
  {
    id: "lime",
    label: "Lime",
    bgClass: "bg-lime-500",
    iconBgClass: "bg-lime-500/10",
    iconTextClass: "text-lime-500",
  },
  {
    id: "green",
    label: "Green",
    bgClass: "bg-green-500",
    iconBgClass: "bg-green-500/10",
    iconTextClass: "text-green-500",
  },
  {
    id: "emerald",
    label: "Emerald",
    bgClass: "bg-emerald-500",
    iconBgClass: "bg-emerald-500/10",
    iconTextClass: "text-emerald-500",
  },
  {
    id: "teal",
    label: "Teal",
    bgClass: "bg-teal-500",
    iconBgClass: "bg-teal-500/10",
    iconTextClass: "text-teal-500",
  },
  {
    id: "cyan",
    label: "Cyan",
    bgClass: "bg-cyan-500",
    iconBgClass: "bg-cyan-500/10",
    iconTextClass: "text-cyan-500",
  },
  {
    id: "sky",
    label: "Sky",
    bgClass: "bg-sky-500",
    iconBgClass: "bg-sky-500/10",
    iconTextClass: "text-sky-500",
  },
  {
    id: "blue",
    label: "Blue",
    bgClass: "bg-blue-500",
    iconBgClass: "bg-blue-500/10",
    iconTextClass: "text-blue-500",
  },
  {
    id: "indigo",
    label: "Indigo",
    bgClass: "bg-indigo-500",
    iconBgClass: "bg-indigo-500/10",
    iconTextClass: "text-indigo-500",
  },
  {
    id: "violet",
    label: "Violet",
    bgClass: "bg-violet-500",
    iconBgClass: "bg-violet-500/10",
    iconTextClass: "text-violet-500",
  },
  {
    id: "purple",
    label: "Purple",
    bgClass: "bg-purple-500",
    iconBgClass: "bg-purple-500/10",
    iconTextClass: "text-purple-500",
  },
  {
    id: "fuchsia",
    label: "Fuchsia",
    bgClass: "bg-fuchsia-500",
    iconBgClass: "bg-fuchsia-500/10",
    iconTextClass: "text-fuchsia-500",
  },
  {
    id: "pink",
    label: "Pink",
    bgClass: "bg-pink-500",
    iconBgClass: "bg-pink-500/10",
    iconTextClass: "text-pink-500",
  },
  {
    id: "rose",
    label: "Rose",
    bgClass: "bg-rose-500",
    iconBgClass: "bg-rose-500/10",
    iconTextClass: "text-rose-500",
  },
];

interface FieldActionAccentSelectProps {
  value?: string;
  onValueChange: (value: string) => void;
  id?: string;
  "aria-invalid"?: boolean;
}

export function FieldActionAccentSelect({
  value,
  onValueChange,
  id,
  "aria-invalid": ariaInvalid,
}: FieldActionAccentSelectProps) {
  const selected = FIELD_ACTION_ACCENTS.find((entry) => entry.id === value);

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger id={id} aria-invalid={ariaInvalid} className="w-full">
        {selected ? (
          <span className="flex items-center gap-2">
            <span
              className={`size-4 shrink-0 rounded-sm ${selected.bgClass}`}
            />
            <span>{selected.label}</span>
          </span>
        ) : (
          <SelectValue placeholder="Selecione uma cor" />
        )}
      </SelectTrigger>
      <SelectContent
        position="popper"
        className="w-[--radix-select-trigger-width]"
      >
        <SelectGroup>
          <SelectLabel>Cores</SelectLabel>
          {FIELD_ACTION_ACCENTS.map(({ id: entryId, label, bgClass }) => (
            <SelectItem key={entryId} value={entryId}>
              <span className={`size-4 shrink-0 rounded-sm ${bgClass}`} />
              <span>{label}</span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
