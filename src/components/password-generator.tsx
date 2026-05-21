"use client";

import type React from "react";
import { Button } from "@/components/ui/button";

type PasswordGeneratorProps = React.ComponentProps<typeof Button> & {
  onGenerate: (password: string) => void;
};

function generatePassword(): string {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";
  const special = "!@#$%^&*()_+-=";
  const all = upper + lower + digits + special;

  const pick = (chars: string) => {
    const buf = new Uint32Array(1);
    crypto.getRandomValues(buf);
    return chars[buf[0] % chars.length];
  };

  const chars = [
    pick(upper),
    pick(lower),
    pick(digits),
    pick(special),
    ...Array.from({ length: 8 }, () => pick(all)),
  ];

  for (let i = chars.length - 1; i > 0; i--) {
    const buf = new Uint32Array(1);
    crypto.getRandomValues(buf);
    const j = buf[0] % (i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  return chars.join("");
}

export function PasswordGenerator({
  onGenerate,
  children,
  ...props
}: PasswordGeneratorProps) {
  return (
    <Button
      type="button"
      size="sm"
      variant="link"
      onClick={() => onGenerate(generatePassword())}
      className="h-auto p-0 font-normal text-xs normal-case tracking-normal"
      {...props}
    >
      {children ?? "Gerar senha forte"}
    </Button>
  );
}
