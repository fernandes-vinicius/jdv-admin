"use client";

import { useSession } from "next-auth/react";

interface AdminGuardProps {
  children: React.ReactNode;
}

export function AdminGuard({ children }: AdminGuardProps) {
  const { data: session } = useSession();

  if (!session?.user.is_admin) return null;

  return <>{children}</>;
}
