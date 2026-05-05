import type { DefaultSession } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      is_admin: boolean;
    } & DefaultSession["user"];
    accessToken?: string;
    refreshToken?: string;
    error?: "RefreshTokenError";
  }

  interface User {
    accessToken?: string;
    refreshToken?: string;
    is_admin?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    is_admin?: boolean;
    accessTokenExpiresAt?: number;
    error?: "RefreshTokenError";
  }
}
