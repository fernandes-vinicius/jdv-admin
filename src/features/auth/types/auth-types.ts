import type { User } from "@/features/users/types/users-types";

export type LoginResponse = {
  access_token: string;
  refresh_token: string;
  user: User;
};
