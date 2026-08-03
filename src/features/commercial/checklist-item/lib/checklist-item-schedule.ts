import { ChecklistPeriod } from "@/features/commercial/checklist-item/types/checklist-item-types";

const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/;

export function isValidTimeFormat(value: string): boolean {
  return TIME_RE.test(value);
}

/**
 * Espelho client-side de services.derivePeriodFromEndTime (bi-j-veiga) —
 * só pra preview instantâneo no formulário. A fonte de verdade continua
 * sendo o `period` que a API devolve.
 */
export function derivePeriodFromEndTime(end: string): ChecklistPeriod | null {
  if (!isValidTimeFormat(end)) return null;

  const [hours, minutes] = end.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes;

  if (totalMinutes <= 12 * 60) return ChecklistPeriod.MORNING;
  if (totalMinutes <= 18 * 60) return ChecklistPeriod.AFTERNOON;
  return ChecklistPeriod.EVENING;
}
