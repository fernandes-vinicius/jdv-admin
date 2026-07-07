import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { ApiError } from "@/types/api";

export function setApiFieldErrors<T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>,
): boolean {
  if (!(error instanceof ApiError) || error.status !== 422) return false;

  const fields = (error.data as { fields?: Record<string, string[]> } | null)
    ?.fields;
  if (!fields) return false;

  let mapped = false;
  for (const [name, messages] of Object.entries(fields)) {
    if (messages?.[0]) {
      setError(name as Path<T>, { type: "server", message: messages[0] });
      mapped = true;
    }
  }
  return mapped;
}
