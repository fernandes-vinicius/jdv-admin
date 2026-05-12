import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { createApi } from "@/lib/api";
import { authOptions } from "@/lib/auth";
import { ApiError, type ApiInstance, type ApiOptions } from "@/types/api";

const rawApi = createApi(async (options) => {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  return {
    ...options,
    cache: "no-store",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };
});

async function guard<T>(promise: Promise<T>): Promise<T> {
  return promise.catch((err: unknown) => {
    if (err instanceof ApiError && err.status === 401) {
      redirect("/unauthorized");
    }
    throw err;
  });
}

export const serverApi: ApiInstance = Object.assign(
  <T>(path: string, opts?: ApiOptions) => guard(rawApi<T>(path, opts)),
  {
    get: <T>(path: string, opts?: ApiOptions) =>
      guard(rawApi.get<T>(path, opts)),
    post: <T>(path: string, body?: unknown, opts?: ApiOptions) =>
      guard(rawApi.post<T>(path, body, opts)),
    put: <T>(path: string, body?: unknown, opts?: ApiOptions) =>
      guard(rawApi.put<T>(path, body, opts)),
    patch: <T>(path: string, body?: unknown, opts?: ApiOptions) =>
      guard(rawApi.patch<T>(path, body, opts)),
    delete: <T>(path: string, opts?: ApiOptions) =>
      guard(rawApi.delete<T>(path, opts)),
  },
);
