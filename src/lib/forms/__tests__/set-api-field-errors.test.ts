import { describe, expect, it, vi } from "vitest";
import { ApiError } from "@/types/api";
import { setApiFieldErrors } from "../set-api-field-errors";

describe("setApiFieldErrors", () => {
  it("retorna false e não chama setError quando o erro não é ApiError", () => {
    const setError = vi.fn();

    const mapped = setApiFieldErrors(new Error("boom"), setError);

    expect(mapped).toBe(false);
    expect(setError).not.toHaveBeenCalled();
  });

  it("retorna false quando o status não é 422", () => {
    const setError = vi.fn();
    const error = new ApiError("forbidden", 403, {
      error: "forbidden",
      code: "FORBIDDEN",
    });

    const mapped = setApiFieldErrors(error, setError);

    expect(mapped).toBe(false);
    expect(setError).not.toHaveBeenCalled();
  });

  it("retorna false quando o 422 não tem fields", () => {
    const setError = vi.fn();
    const error = new ApiError("validation failed", 422, {
      error: "validation failed",
      code: "VALIDATION_ERROR",
    });

    const mapped = setApiFieldErrors(error, setError);

    expect(mapped).toBe(false);
    expect(setError).not.toHaveBeenCalled();
  });

  it("mapeia um único campo de fields para setError", () => {
    const setError = vi.fn();
    const error = new ApiError("validation failed", 422, {
      error: "validation failed",
      code: "VALIDATION_ERROR",
      fields: { end_date: ["must be on or after start_date"] },
    });

    const mapped = setApiFieldErrors(error, setError);

    expect(mapped).toBe(true);
    expect(setError).toHaveBeenCalledWith("end_date", {
      type: "server",
      message: "must be on or after start_date",
    });
  });

  it("mapeia múltiplos campos de fields para setError", () => {
    const setError = vi.fn();
    const error = new ApiError("validation failed", 422, {
      error: "validation failed",
      code: "VALIDATION_ERROR",
      fields: {
        start_date: ["must be a valid date in YYYY-MM-DD format"],
        end_date: ["must be on or after start_date"],
      },
    });

    const mapped = setApiFieldErrors(error, setError);

    expect(mapped).toBe(true);
    expect(setError).toHaveBeenCalledTimes(2);
    expect(setError).toHaveBeenCalledWith("start_date", {
      type: "server",
      message: "must be a valid date in YYYY-MM-DD format",
    });
    expect(setError).toHaveBeenCalledWith("end_date", {
      type: "server",
      message: "must be on or after start_date",
    });
  });
});
