import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ApiError, baseRequest, type RequestOptions } from "./index";

async function withAuth(options?: RequestOptions): Promise<RequestOptions> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;
  if (!token) return options ?? {};
  return {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(options?.headers as Record<string, string>),
    },
  };
}

export const serverApi = {
  get: async <T>(path: string, options?: Omit<RequestOptions, "body">) =>
    baseRequest<T>("GET", path, await withAuth(options)),

  post: async <T>(path: string, body?: unknown, options?: Omit<RequestOptions, "body">) =>
    baseRequest<T>("POST", path, await withAuth({ ...options, body })),

  put: async <T>(path: string, body?: unknown, options?: Omit<RequestOptions, "body">) =>
    baseRequest<T>("PUT", path, await withAuth({ ...options, body })),

  patch: async <T>(path: string, body?: unknown, options?: Omit<RequestOptions, "body">) =>
    baseRequest<T>("PATCH", path, await withAuth({ ...options, body })),

  delete: async <T>(path: string, options?: Omit<RequestOptions, "body">) =>
    baseRequest<T>("DELETE", path, await withAuth(options)),
};

export { ApiError };
