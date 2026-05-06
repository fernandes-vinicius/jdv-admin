"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForgotPassword } from "@/features/auth/hooks/use-forgot-password";

const formSchema = z.object({
  email: z.email("E-mail inválido"),
});

type ForgotPasswordData = z.infer<typeof formSchema>;

type ForgotPasswordFormProps = {
  defaultEmail?: string;
};

export function ForgotPasswordForm({ defaultEmail }: ForgotPasswordFormProps) {
  const { mutateAsync, isSuccess, isPending } = useForgotPassword();

  const form = useForm<ForgotPasswordData>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: defaultEmail ?? "" },
  });

  async function onSubmit({ email }: ForgotPasswordData) {
    await mutateAsync(email, {
      onError: () => {
        form.setError("root", {
          message: "Não foi possível enviar o e-mail. Tente novamente.",
        });
      },
    });
  }

  if (isSuccess) {
    return (
      <FieldGroup>
        <FieldDescription>
          Se este e-mail estiver cadastrado, você receberá um link para
          redefinir sua senha em breve. Verifique sua caixa de entrada.
        </FieldDescription>
        <Field>
          <Button asChild variant="outline" size="lg">
            <Link href="/auth/sign-in">Voltar ao login</Link>
          </Button>
        </Field>
      </FieldGroup>
    );
  }

  return (
    <form id="form-forgot-password" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>E-mail</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="email"
                aria-invalid={fieldState.invalid}
                placeholder="voce@email.com"
                autoComplete="email"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {form.formState.errors.root && (
          <FieldError errors={[form.formState.errors.root]} />
        )}

        <Field>
          <Button type="submit" size="lg" disabled={isPending}>
            {isPending ? "ENVIANDO..." : "ENVIAR LINK"}
          </Button>
        </Field>

        <FieldDescription className="text-center">
          Lembrou a senha?{" "}
          <Link
            href="/auth/sign-in"
            className="underline underline-offset-4 hover:text-primary"
          >
            Voltar ao login
          </Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
