import { env } from "@/lib/env";
import { ApiError, type ApiInstance, type ApiOptions } from "@/types/api";

const BASE_URL = `${env.NEXT_PUBLIC_API_URL}/api/${env.NEXT_PUBLIC_API_VERSION}`;

async function request<T>(path: string, opts: ApiOptions = {}): Promise<T> {
  const { body, headers, method = "GET", ...rest } = opts;

  const isFormData = body instanceof FormData;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    ...rest,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...headers,
    },
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
  });

  let data: unknown = null;

  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    throw new ApiError(
      // biome-ignore lint/suspicious/noExplicitAny: <>
      (data as any)?.error || (data as any)?.message || "[API_ERROR]",
      res.status,
      data,
    );
  }

  return data as T;
}

export function createApi(
  wrapper?: (opts: ApiOptions) => Promise<ApiOptions> | ApiOptions,
): ApiInstance {
  const apply = async (opts: ApiOptions = {}) =>
    wrapper ? await wrapper(opts) : opts;

  const base = async <T>(path: string, opts?: ApiOptions): Promise<T> => {
    const finalOpts = await apply(opts);
    return request<T>(path, finalOpts);
  };

  return Object.assign(base, {
    get: <T>(path: string, opts?: ApiOptions) =>
      base<T>(path, { ...opts, method: "GET" }),

    post: <T>(path: string, body?: unknown, opts?: ApiOptions) =>
      base<T>(path, { ...opts, method: "POST", body }),

    put: <T>(path: string, body?: unknown, opts?: ApiOptions) =>
      base<T>(path, { ...opts, method: "PUT", body }),

    patch: <T>(path: string, body?: unknown, opts?: ApiOptions) =>
      base<T>(path, { ...opts, method: "PATCH", body }),

    delete: <T>(path: string, opts?: ApiOptions) =>
      base<T>(path, { ...opts, method: "DELETE" }),
  });
}

export const api: ApiInstance = createApi();
