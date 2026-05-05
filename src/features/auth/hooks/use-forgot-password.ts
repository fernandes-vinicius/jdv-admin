"use client";

import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/features/auth/actions/forgot-password";

export function useForgotPassword() {
  return useMutation({
    mutationFn: (email: string) => forgotPassword(email),
  });
}
