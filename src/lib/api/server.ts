import { getServerSession } from "next-auth";
import { createApi } from "@/lib/api";
import { authOptions } from "@/lib/auth";

export const serverApi = createApi(async (options) => {
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
