"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useUpdateBuilding } from "@/features/building/hooks/use-update-building";
import type { Building } from "@/features/building/types/building-types";

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Campo obrigatório")
    .max(120, "O campo deve ter no máximo 120 caracteres"),
  codigo_interno_do_empreendimento: z
    .number()
    .int("Deve ser um número inteiro")
    .positive("Deve ser um número positivo")
    .optional(),
  is_active: z.boolean(),
});

type FormData = z.infer<typeof schema>;

interface BuildingEditFormProps {
  item: Building;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function BuildingEditForm({
  item,
  onSuccess,
  onCancel,
}: BuildingEditFormProps) {
  const { mutateAsync: updateItem } = useUpdateBuilding();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: item.name,
      codigo_interno_do_empreendimento:
        item.codigo_interno_do_empreendimento != null
          ? Number(item.codigo_interno_do_empreendimento)
          : undefined,
      is_active: item.is_active,
    },
  });

  useEffect(() => {
    form.reset({
      name: item.name,
      codigo_interno_do_empreendimento:
        item.codigo_interno_do_empreendimento != null
          ? Number(item.codigo_interno_do_empreendimento)
          : undefined,
      is_active: item.is_active,
    });
  }, [item, form]);

  const onSubmit = form.handleSubmit(async (data) => {
    await updateItem({
      id: item.id,
      payload: {
        name: data.name,
        codigo_interno_do_empreendimento:
          data.codigo_interno_do_empreendimento ?? null,
        is_active: data.is_active,
      },
    });
    onSuccess?.();
  });

  const isPending = form.formState.isSubmitting;

  return (
    <form id="form-building-edit" onSubmit={onSubmit}>
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

        <Controller
          name="codigo_interno_do_empreendimento"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Código Sienge</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                type="number"
                min={1}
                value={
                  field.value == null || Number.isNaN(field.value)
                    ? ""
                    : field.value
                }
                onChange={(e) =>
                  field.onChange(
                    e.target.value === "" ? undefined : e.target.valueAsNumber,
                  )
                }
                onBlur={field.onBlur}
                aria-invalid={fieldState.invalid}
                placeholder="Ex. 42"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="is_active"
          control={form.control}
          render={({ field }) => (
            <Field orientation="horizontal">
              <Checkbox
                id="is_active"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <FieldLabel htmlFor="is_active">Ativo</FieldLabel>
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
              {isPending ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </Field>
      </FieldGroup>
    </form>
  );
}
