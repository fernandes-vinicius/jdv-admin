"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createBuilding } from "@/features/building/actions/create-building";
import { useUpdateBuilding } from "@/features/building/hooks/use-update-building";
import type { Building } from "@/features/building/types/building-types";

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Campo obrigatório")
    .max(160, "O campo deve ter no máximo 160 caracteres"),
});

type BuildingFormData = z.infer<typeof formSchema>;

interface BuildingFormProps {
  item?: Building | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function BuildingForm({ item, onSuccess, onCancel }: BuildingFormProps) {
  const isEditing = !!item;
  const queryClient = useQueryClient();
  const { mutateAsync: updateItem } = useUpdateBuilding();

  const form = useForm<BuildingFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: item?.name ?? "" },
  });

  useEffect(() => {
    form.reset({ name: item?.name ?? "" });
  }, [item, form]);

  const onSubmit = form.handleSubmit(async (data) => {
    if (isEditing) {
      await updateItem({ id: item.id, name: data.name });
      onSuccess?.();
    } else {
      try {
        await createBuilding(data.name);
        form.reset();
        queryClient.invalidateQueries({ queryKey: ["buildings"] });
        onSuccess?.();
      } catch {
        toast.error("Erro ao criar empreendimento. Tente novamente.");
      }
    }
  });

  const isPending = form.formState.isSubmitting;

  return (
    <form id="form-building" onSubmit={onSubmit}>
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel isRequired htmlFor={field.name}>
                Nome
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Ex. Jardim das Violetas"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Field orientation="responsive">
          <div className="flex gap-2">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isPending}
              >
                Cancelar
              </Button>
            )}
            <Button type="submit" disabled={isPending}>
              {isPending
                ? isEditing
                  ? "Salvando..."
                  : "Adicionando..."
                : isEditing
                  ? "Salvar"
                  : "Adicionar"}
            </Button>
          </div>
        </Field>
      </FieldGroup>
    </form>
  );
}
