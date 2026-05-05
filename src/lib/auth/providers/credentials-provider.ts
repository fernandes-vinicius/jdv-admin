import Provider from "next-auth/providers/credentials";
import type { LoginResponse } from "@/features/auth/types/auth-types";
import { api } from "@/lib/api";

export const CredentialsProvider = Provider({
  name: "credentials",
  credentials: {
    email: { label: "Email", type: "email" },
    password: { label: "Senha", type: "password" },
  },
  async authorize(credentials) {
    if (!credentials?.email || !credentials?.password) return null;

    try {
      const res = await api.post<LoginResponse>("/auth/login", {
        email: credentials.email,
        password: credentials.password,
        mfa_code: "",
      });

      return {
        id: res.user.id,
        name: res.user.name,
        email: res.user.email,
        is_admin: res.user.is_admin,
        accessToken: res.access_token,
        refreshToken: res.refresh_token,
      };
    } catch {
      return null;
    }
  },
});
