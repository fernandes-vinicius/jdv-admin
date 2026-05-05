# Form Scaffold

When the user requests a new form, create it as a `"use client"` component using **react-hook-form** + **zod**. Use the sign-up form below as the canonical reference — replicate its structure exactly.

## Dependencies (already installed)

- `react-hook-form` — `useForm`, `register`, `handleSubmit`, `formState`
- `zod` — schema validation
- `@hookform/resolvers/zod` — `zodResolver`

## File location

```
src/features/<feature-name>/components/<form-name>-form.tsx
```

## Canonical reference — sign-up form

```tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z
  .object({
    name: z.string().min(2, "Nome deve ter ao menos 2 caracteres"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(8, "Mínimo 8 caracteres"),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "As senhas não conferem",
    path: ["confirm"],
  });

type SignUpData = z.infer<typeof schema>;

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>({ resolver: zodResolver(schema) });

  function onSubmit(data: SignUpData) {
    console.log(data);
  }

  return (
    <form className="mt-12 space-y-7" onSubmit={handleSubmit(onSubmit)}>
      {/* Text field example */}
      <div>
        <label
          htmlFor="name"
          className="mb-2 block font-mono text-[10px] text-muted-foreground tracking-[0.32em]"
        >
          NOME
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          placeholder="Seu nome completo"
          {...register("name")}
          className="w-full rounded-md border border-primary/20 bg-primary/5 py-3 pr-4 pl-4 text-base text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/25"
        />
        {errors.name && (
          <p className="mt-2 text-destructive text-xs">{errors.name.message}</p>
        )}
      </div>

      {/* Password field with toggle */}
      <div>
        <label
          htmlFor="password"
          className="mb-2 block font-mono text-[10px] text-muted-foreground tracking-[0.32em]"
        >
          SENHA
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Mínimo 8 caracteres"
            {...register("password")}
            className="w-full rounded-md border border-primary/20 bg-primary/5 py-3 pr-14 pl-4 text-base text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/25"
          />
          <button
            type="button"
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            aria-pressed={showPassword}
            onClick={() => setShowPassword((v) => !v)}
            className="-translate-y-1/2 absolute top-1/2 right-3 text-muted-foreground transition hover:text-primary focus:text-primary focus:outline-none"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Eye className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
        {errors.password ? (
          <p className="mt-2 text-destructive text-xs">
            {errors.password.message}
          </p>
        ) : (
          <p className="mt-2 text-muted-foreground text-xs">
            Use ao menos 8 caracteres.
          </p>
        )}
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="group relative flex w-full items-center justify-between overflow-hidden rounded-sm bg-foreground px-6 py-4 text-left text-primary-foreground transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span
          aria-hidden="true"
          className="-translate-x-full pointer-events-none absolute inset-0 bg-linear-to-r from-[oklch(0.20_0.18_277)] via-[oklch(0.35_0.22_277)] to-[oklch(0.511_0.262_277)] transition-transform duration-500 group-hover:translate-x-0"
        />
        <span className="relative z-10 font-mono text-[11px] tracking-[0.36em]">
          CRIAR CONTA
        </span>
        <ArrowRight
          className="relative z-10 h-4 w-4 transition group-hover:translate-x-1"
          aria-hidden="true"
        />
      </button>
    </form>
  );
}
```

## Field patterns

### Text / email input (no toggle)
Use `pr-4` on the input. Show error only when present.

### Password input (with toggle)
Use `pr-14` on the input to leave room for the eye button. The toggle button is `type="button"` (never a link). Show a hint text when no error (`text-muted-foreground text-xs`) and replace it with the error when validation fails.

### Label
Always uppercase, `font-mono text-[10px] text-muted-foreground tracking-[0.32em]`, `mb-2 block`.

### Error message
`<p className="mt-2 text-destructive text-xs">{errors.field.message}</p>`

## Validation messages (pt-BR)

- Required: `"Campo obrigatório"`
- Email: `"E-mail inválido"`
- Min length: `"Mínimo X caracteres"` or `"Nome deve ter ao menos X caracteres"`
- Passwords match: `.refine()` with `"As senhas não conferem"` on the `confirm` path

## Rules

- Always `"use client"`.
- The component returns only the `<form>` element. Section structure (h1, p, nav) belongs in the page.
- Do not call an API in `onSubmit` unless explicitly asked — use only `console.log(data)`.
- Always set `autoComplete` on every input.
- Import order: external packages first (`lucide-react`, `react-hook-form`, `zod`), then internal (`@/...`), blank line between groups.

## When invoked

Ask the user what fields the form needs (if not specified in `$ARGUMENTS`), then generate the component following these rules.
