"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { InputPassword } from "@/components/input-password";
import { PasswordGenerator } from "@/components/password-generator";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { changePassword } from "@/features/auth/actions/change-password";

const formSchema = z
  .object({
    current_password: z.string().min(1, "Campo obrigatório"),
    new_password: z
      .string()
      .min(12, "A senha deve ter no mínimo 12 caracteres")
      .max(128, "A senha deve ter no máximo 128 caracteres"),
  })
  .refine((d) => d.current_password !== d.new_password, {
    message: "A nova senha deve ser diferente da atual",
    path: ["new_password"],
  });

type FormData = z.infer<typeof formSchema>;

export function ChangePasswordForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { current_password: "", new_password: "" },
  });

  function onSubmit(data: FormData) {
    startTransition(async () => {
      try {
        await changePassword(data.current_password, data.new_password);
        toast.success("Senha alterada com sucesso.");
        form.reset();
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Erro ao alterar senha. Tente novamente.",
        );
      }
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-sm">
      <FieldGroup>
        <Controller
          name="current_password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel isRequired htmlFor={field.name}>
                Senha atual
              </FieldLabel>
              <InputPassword
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Sua senha atual"
                autoComplete="current-password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="new_password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel isRequired htmlFor={field.name}>
                Nova senha
              </FieldLabel>
              <InputPassword
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Mínimo 12 caracteres"
                autoComplete="new-password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              <div>
                <PasswordGenerator
                  onGenerate={(pwd) => {
                    form.setValue("new_password", pwd, {
                      shouldValidate: true,
                    });
                    form.setFocus("new_password");
                  }}
                />
              </div>
            </Field>
          )}
        />

        {form.formState.errors.root && (
          <FieldError errors={[form.formState.errors.root]} />
        )}

        <Field>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Salvando..." : "Alterar senha"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
