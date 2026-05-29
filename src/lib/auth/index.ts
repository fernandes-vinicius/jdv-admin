import type { NextAuthOptions } from "next-auth";
import { refreshAccessToken } from "@/features/auth/actions/refresh-token";
import { CredentialsProvider } from "@/lib/auth/providers/credentials-provider";

const TOKEN_REFRESH_BUFFER_MS = 300_000; // 5 minutes

function getExpiryFromToken(accessToken: string): number {
  try {
    const payload = JSON.parse(
      Buffer.from(accessToken.split(".")[1], "base64url").toString(),
    );
    return (payload.exp as number) * 1000;
  } catch {
    return Date.now() + 60 * 60 * 1000;
  }
}

// Deduplicates concurrent refresh calls within the same Next.js server process.
// Without this, multiple simultaneous getSession() calls trigger multiple
// /auth/refresh requests with the same token — the backend's reuse detection
// treats the second call as a stolen token and revokes the entire family.
let refreshInFlight: Promise<{
  access_token: string;
  refresh_token: string;
}> | null = null;
let refreshInFlightForToken: string | null = null;

export const authOptions: NextAuthOptions = {
  providers: [CredentialsProvider],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          is_admin: user.is_admin,
          accessTokenExpiresAt: getExpiryFromToken(user.accessToken ?? ""),
        };
      }

      if (
        Date.now() <
        (token.accessTokenExpiresAt ?? 0) - TOKEN_REFRESH_BUFFER_MS
      ) {
        return token;
      }

      if (!token.refreshToken) {
        return { ...token, error: "RefreshTokenError" as const };
      }

      try {
        if (refreshInFlightForToken !== token.refreshToken) {
          refreshInFlight = null;
        }
        if (!refreshInFlight) {
          refreshInFlightForToken = token.refreshToken as string;
          refreshInFlight = refreshAccessToken(
            token.refreshToken as string,
          ).finally(() => {
            refreshInFlight = null;
            refreshInFlightForToken = null;
          });
        }
        const refreshed = await refreshInFlight;
        return {
          ...token,
          accessToken: refreshed.access_token,
          refreshToken: refreshed.refresh_token,
          accessTokenExpiresAt: getExpiryFromToken(refreshed.access_token),
          error: undefined,
        };
      } catch {
        return { ...token, error: "RefreshTokenError" as const };
      }
    },
    async session({ session, token }) {
      session.user.id = token.sub as string;
      session.user.is_admin = token.is_admin ?? false;
      session.accessToken = token.accessToken as string | undefined;
      session.refreshToken = token.refreshToken as string | undefined;
      session.error = token.error;
      return session;
    },
  },
  pages: {
    signIn: "/auth/sign-in",
  },
  session: {
    strategy: "jwt",
  },
};
