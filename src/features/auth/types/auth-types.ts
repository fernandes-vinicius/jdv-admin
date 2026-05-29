import type { User } from "@/features/users/types/users-types";

export type LoginResponse = {
  access_token: string;
  refresh_token: string;
  user: User;
};

export interface LoginHistoryEntry {
  id: string;
  login_at: string;
  ip_address: string;
  user_agent: string;
  success: boolean;
  failure_reason: string;
  auth_method: string;
}
