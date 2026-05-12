"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
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
import { tryCatch } from "@/lib/try-catch";
import { ApiError } from "@/types/api";

const schema = z.object({
  empreendimento_id: z
    .number()
    .int("Deve ser um número inteiro")
    .positive("Deve ser um número positivo"),
  name: z
    .string()
    .trim()
    .min(1, "Campo obrigatório")
    .max(120, "O campo deve ter no máximo 120 caracteres"),
  codigo_interno_do_empreendimento: z
    .string()
    .trim()
    .max(40, "O campo deve ter no máximo 40 caracteres")
    .optional()
    .or(z.literal("")),
});

type FormData = z.infer<typeof schema>;

interface BuildingCreateFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function BuildingCreateForm({
  onSuccess,
  onCancel,
}: BuildingCreateFormProps) {
  const queryClient = useQueryClient();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      empreendimento_id: NaN,
      name: "",
      codigo_interno_do_empreendimento: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const { error } = await tryCatch(() => {
      return createBuilding({
        empreendimento_id: data.empreendimento_id,
        name: data.name,
        codigo_interno_do_empreendimento:
          data.codigo_interno_do_empreendimento || null,
      });
    }, ApiError);

    if (error) {
      toast.error(
        error.message ?? "Erro ao criar empreendimento. Tente novamente.",
      );

      return;
    }

    form.reset();
    queryClient.invalidateQueries({ queryKey: ["buildings"] });
    onSuccess?.();
  });

  const isPending = form.formState.isSubmitting;

  return (
    <form id="form-building-create" onSubmit={onSubmit}>
      <FieldGroup>
        <Controller
          name="empreendimento_id"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel isRequired htmlFor={field.name}>
                ID do empreendimento
              </FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                type="number"
                min={1}
                value={Number.isNaN(field.value) ? "" : field.value}
                onChange={(e) => field.onChange(e.target.valueAsNumber)}
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
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Ex. ABC-001"
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
              {isPending ? "Adicionando..." : "Adicionar"}
            </Button>
          </div>
        </Field>
      </FieldGroup>
    </form>
  );
}
