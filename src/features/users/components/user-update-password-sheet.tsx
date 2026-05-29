"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useUpdateUserPassword } from "@/features/users/hooks/use-update-user-password";
import type { User } from "@/features/users/types/users-types";

const formSchema = z.object({
  new_password: z
    .string()
    .min(12, "A senha deve ter no mínimo 12 caracteres")
    .max(128, "A senha deve ter no máximo 128 caracteres"),
});

type FormData = z.infer<typeof formSchema>;

interface UserUpdatePasswordSheetProps {
  user: User | null;
  onOpenChange: (open: boolean) => void;
}

export function UserUpdatePasswordSheet({
  user,
  onOpenChange,
}: UserUpdatePasswordSheetProps) {
  const { mutateAsync: updatePassword } = useUpdateUserPassword();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      new_password: "",
    },
  });

  function handleOpenChange(open: boolean) {
    if (!open) form.reset();
    onOpenChange(open);
  }

  async function onSubmit(data: FormData) {
    if (!user) return;
    await updatePassword({
      id: user.id,
      new_password: data.new_password,
      must_change_password: false,
    });
    handleOpenChange(false);
  }

  return (
    <Sheet open={!!user} onOpenChange={handleOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Alterar senha — {user?.name}</SheetTitle>
          <SheetDescription>
            Define uma nova senha para {user?.name}. A sessão atual do usuário
            será encerrada.
          </SheetDescription>
        </SheetHeader>

        <form
          id="form-update-password"
          onSubmit={form.handleSubmit(onSubmit)}
          className="px-8"
        >
          <FieldGroup>
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
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
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
          </FieldGroup>
        </form>

        <SheetFooter>
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={form.formState.isSubmitting}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            form="form-update-password"
            disabled={!user || form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Salvando..." : "Salvar"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
