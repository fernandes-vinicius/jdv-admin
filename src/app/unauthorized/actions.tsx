"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function UnauthorizedActions() {
  const router = useRouter();

  return (
    <div className="flex gap-3">
      <Button onClick={() => router.back()}>Tentar novamente</Button>
      <Button
        variant="outline"
        onClick={() => signOut({ callbackUrl: "/auth/sign-in" })}
      >
        Sair
      </Button>
    </div>
  );
}
