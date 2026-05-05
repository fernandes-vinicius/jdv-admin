"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type InputPasswordProps = React.ComponentProps<typeof Input>;

export function InputPassword({ className, ...props }: InputPasswordProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <Input
        type={show ? "text" : "password"}
        className={cn("pr-8", className)}
        {...props}
      />
      <Button
        type="button"
        size="icon-sm"
        variant="ghost"
        aria-label={show ? "Ocultar senha" : "Mostrar senha"}
        aria-pressed={show}
        onClick={() => setShow((v) => !v)}
        className="-translate-y-1/2 absolute top-1/2 right-0"
      >
        {show ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
      </Button>
    </div>
  );
}
