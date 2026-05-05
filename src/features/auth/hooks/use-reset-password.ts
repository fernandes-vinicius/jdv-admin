"use client";

import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@/features/auth/actions/reset-password";

export function useResetPassword() {
  return useMutation({
    mutationFn: ({ token, new_password }: { token: string; new_password: string }) =>
      resetPassword(token, new_password),
  });
}
