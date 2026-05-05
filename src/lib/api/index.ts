import { env } from "@/lib/env";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface RequestOptions extends Omit<RequestInit, "method" | "body"> {
  params?: Record<string, string | number | boolean | undefined | null>;
  body?: unknown;
}

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
  ) {
    super(`[${status}] ${message}`);
    this.name = "ApiError";
  }
}

export async function baseRequest<T>(
  method: HttpMethod,
  path: string,
  { params, body, headers, ...init }: RequestOptions = {},
): Promise<T> {
  const url = new URL(`/api/${env.API_VERSION}${path}`, env.API_URL);

  for (const [key, value] of Object.entries(params ?? {})) {
    if (value != null) url.searchParams.set(key, String(value));
  }

  const response = await fetch(url, {
    ...init,
    method,
    headers: {
      "Content-Type": "application/json",
      ...(headers as Record<string, string>),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new ApiError(
      response.status,
      data?.code ?? String(response.status),
      data?.error ?? response.statusText,
    );
  }

  if (response.status === 204) return undefined as T;

  return response.json() as Promise<T>;
}

// Unauthenticated — usado internamente pelo credentials provider para /auth/login
export const api = {
  get: <T>(path: string, options?: Omit<RequestOptions, "body">) =>
    baseRequest<T>("GET", path, options),

  post: <T>(
    path: string,
    body?: unknown,
    options?: Omit<RequestOptions, "body">,
  ) => baseRequest<T>("POST", path, { ...options, body }),

  put: <T>(
    path: string,
    body?: unknown,
    options?: Omit<RequestOptions, "body">,
  ) => baseRequest<T>("PUT", path, { ...options, body }),

  patch: <T>(
    path: string,
    body?: unknown,
    options?: Omit<RequestOptions, "body">,
  ) => baseRequest<T>("PATCH", path, { ...options, body }),

  delete: <T>(path: string, options?: Omit<RequestOptions, "body">) =>
    baseRequest<T>("DELETE", path, options),
};
