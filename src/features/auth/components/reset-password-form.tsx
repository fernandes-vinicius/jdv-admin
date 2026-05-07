"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { InputPassword } from "@/components/input-password";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useResetPassword } from "@/features/auth/hooks/use-reset-password";

const formSchema = z
  .object({
    new_password: z
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .max(160, "Campo deve ter no máximo 160 caracteres"),
    confirm_password: z
      .string()
      .min(1, "Confirmação obrigatória")
      .max(160, "Campo deve ter no máximo 160 caracteres"),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "As senhas não coincidem",
    path: ["confirm_password"],
  });

type ResetPasswordData = z.infer<typeof formSchema>;

type ResetPasswordFormProps = {
  token: string;
};

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const router = useRouter();
  const { mutateAsync, isPending } = useResetPassword();

  const form = useForm<ResetPasswordData>({
    resolver: zodResolver(formSchema),
    defaultValues: { new_password: "", confirm_password: "" },
  });

  async function onSubmit({ new_password }: ResetPasswordData) {
    await mutateAsync(
      { token, new_password },
      {
        onError: () => {
          toast.error("Link inválido ou expirado. Solicite um novo.");
        },
        onSuccess: () => {
          toast.success("Senha alterada com sucesso", {
            description: "Você agora pode fazer login usando sua nova senha.",
          });
          router.push("/auth/sign-in");
        },
      },
    );
  }

  return (
    <form id="form-reset-password" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="new_password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Nova senha</FieldLabel>
              <InputPassword
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Mínimo 8 caracteres"
                autoComplete="new-password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="confirm_password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Confirmar senha</FieldLabel>
              <InputPassword
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Repita a nova senha"
                autoComplete="new-password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Field>
          <Button type="submit" size="lg" disabled={isPending}>
            {isPending ? "SALVANDO..." : "REDEFINIR SENHA"}
          </Button>
        </Field>

        <div className="text-center text-muted-foreground text-sm">
          <Link
            href="/auth/sign-in"
            className="underline underline-offset-4 hover:text-primary"
          >
            Voltar ao login
          </Link>
        </div>
      </FieldGroup>
    </form>
  );
}
