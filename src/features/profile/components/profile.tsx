"use client";

import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { signOut, useSession } from "@/lib/auth/client";

export function Profile() {
  const { data: session } = useSession();
  const [copied, setCopied] = useState(false);

  const name = session?.user?.name ?? "";
  const email = session?.user?.email ?? "";
  const id = session?.user?.id ?? "";
  const isAdmin = session?.user?.is_admin ?? false;

  function copyId() {
    navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <article className="w-full py-8 gap-10 flex flex-col justify-center items-center">
      <div className="flex flex-col gap-4 items-center justify-center">
        <Avatar className="size-20">
          <AvatarFallback className="text-3xl bg-primary text-primary-foreground">
            {name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <Badge variant={isAdmin ? "default" : "outline"}>
          {isAdmin ? <strong>Administrador</strong> : "Membro"}
        </Badge>
      </div>

      <div className="flex w-full flex-col md:flex-row flex-1 gap-5 md:text-center md:justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-xs font-medium">
            Nome
          </span>
          <div className="py-1 text-sm font-medium">{name}</div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-xs font-medium">
            E-mail
          </span>
          <div className=" py-1 text-sm font-medium">{email}</div>
        </div>
      </div>

      <Separator />

      <div className="flex w-full flex-col gap-1">
        <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
          ID da conta
        </p>
        <div className="flex items-center justify-between gap-2">
          <p className="font-mono text-xs text-muted-foreground truncate">
            {id}
          </p>
          <Button
            type="button"
            variant="ghost"
            size="xs"
            onClick={copyId}
            className="shrink-0"
          >
            {copied ? "Copiado!" : "Copiar"}
          </Button>
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => signOut({ callbackUrl: "/auth/sign-in" })}
      >
        Sair
      </Button>
    </article>
  );
}
