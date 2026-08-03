import { describe, expect, it } from "vitest";
import { ChecklistPeriod } from "../../types/checklist-item-types";
import {
  derivePeriodFromEndTime,
  isValidTimeFormat,
} from "../checklist-item-schedule";

describe("isValidTimeFormat", () => {
  it("aceita HH:MM", () => {
    expect(isValidTimeFormat("09:00")).toBe(true);
  });

  it("aceita HH:MM:SS", () => {
    expect(isValidTimeFormat("09:00:00")).toBe(true);
  });

  it("rejeita formato inválido", () => {
    expect(isValidTimeFormat("9:00")).toBe(false);
    expect(isValidTimeFormat("25:00")).toBe(false);
    expect(isValidTimeFormat("not-a-time")).toBe(false);
    expect(isValidTimeFormat("")).toBe(false);
  });
});

describe("derivePeriodFromEndTime", () => {
  const cases: [string, ChecklistPeriod][] = [
    ["11:59", ChecklistPeriod.MORNING],
    ["12:00", ChecklistPeriod.MORNING],
    ["12:01", ChecklistPeriod.AFTERNOON],
    ["18:00", ChecklistPeriod.AFTERNOON],
    ["18:01", ChecklistPeriod.EVENING],
    ["23:59", ChecklistPeriod.EVENING],
  ];

  it.each(cases)("end=%s -> %s", (end, expected) => {
    expect(derivePeriodFromEndTime(end)).toBe(expected);
  });

  it("retorna null para horário inválido", () => {
    expect(derivePeriodFromEndTime("not-a-time")).toBeNull();
    expect(derivePeriodFromEndTime("")).toBeNull();
  });
});
