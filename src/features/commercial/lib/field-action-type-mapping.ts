import { FieldActionType } from "@/features/commercial/types/commercial-types";

export type FieldActionTypeEntry = {
  label: string;
  color: string;
};

export const fieldActionTypeMapping: Record<
  FieldActionType,
  FieldActionTypeEntry
> = {
  [FieldActionType.FIELD_ACTION]: {
    label: "Ação de campo",
    color: "bg-emerald-500",
  },
  [FieldActionType.TRAINING]: { label: "Treinamento", color: "bg-violet-500" },
};
