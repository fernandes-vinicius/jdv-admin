"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { InputPassword } from "@/components/input-password";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { AuthProviders } from "@/lib/auth/providers";

const formSchema = z.object({
  email: z.email("E-mail inválido"),
  password: z.string().min(1, "Senha obrigatória"),
});

type SignInData = z.infer<typeof formSchema>;

export function SignInForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<SignInData>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  function onSubmit({ email, password }: SignInData) {
    if (isPending) return;

    startTransition(async () => {
      const result = await signIn(AuthProviders.CREDENTIALS, {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });

      if (result?.error) {
        toast.error("Credenciais inválidas. Verifique seu e-mail e senha.");
        return;
      }

      router.push(result?.url || "/");
      router.refresh();
    });
  }

  const email = form.watch("email");
  const forgotHref = `/auth/forgot-password${email ? `?email=${encodeURIComponent(email)}` : ""}`;

  return (
    <form id="form-sign-in" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>E-mail</FieldLabel>
              <Input
                {...field}
                type="email"
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="voce@email.com"
                autoComplete="email"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor={field.name}>Senha</FieldLabel>
                <Button asChild size="xs" variant="link">
                  <Link href={forgotHref}>Esqueci minha senha</Link>
                </Button>
              </div>
              <InputPassword
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Sua senha"
                autoComplete="current-password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Field>
          <Button type="submit" size="lg" disabled={isPending}>
            {isPending ? "ENTRANDO..." : "ENTRAR"}
          </Button>
        </Field>

        <FieldDescription className="text-center">
          Ao clicar em continuar, você concorda com nossos{" "}
          <a href="/#">Termos de Serviço</a> e{" "}
          <a href="/#">Política de Privacidade</a>.
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
