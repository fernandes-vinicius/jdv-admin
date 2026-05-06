"use client";

import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@/features/auth/actions/reset-password";

type Params = {
  token: string;
  new_password: string;
};

export function useResetPassword() {
  return useMutation({
    mutationFn: ({ token, new_password }: Params) => {
      return resetPassword(token, new_password);
    },
  });
}
