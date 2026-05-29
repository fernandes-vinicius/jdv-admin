"use client";

import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "@/components/icons";
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
      <button
        type="button"
        aria-label={show ? "Ocultar senha" : "Mostrar senha"}
        aria-pressed={show}
        onClick={() => setShow((v) => !v)}
        className="-translate-y-1/2 absolute cursor-pointer p-1 [&_svg:not([class*='size-'])]:size-3.5 [&_svg]:pointer-events-none [&_svg]:shrink-0 top-1/2 right-0"
      >
        {show ? (
          <EyeOffIcon aria-hidden="true" />
        ) : (
          <EyeIcon aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
