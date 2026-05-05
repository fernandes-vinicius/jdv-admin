import { api } from "@/lib/api";

type RefreshResponse = {
  access_token: string;
  refresh_token: string;
};

export function getExpiryFromToken(accessToken: string): number {
  try {
    const payload = JSON.parse(
      Buffer.from(accessToken.split(".")[1], "base64url").toString(),
    );
    return (payload.exp as number) * 1000;
  } catch {
    return Date.now() + 15 * 60 * 1000;
  }
}

export async function refreshAccessToken(refreshToken: string) {
  return api.post<RefreshResponse>("/auth/refresh", {
    refresh_token: refreshToken,
  });
}
