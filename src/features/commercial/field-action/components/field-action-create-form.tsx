"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createFieldAction } from "@/features/commercial/field-action/actions/create-field-action";
import { tryCatch } from "@/lib/try-catch";
import { ApiError } from "@/types/api";
import { FieldActionAccentSelect } from "@/features/commercial/field-action/components/field-action-accent-select";
import { FieldActionIconSelect } from "@/features/commercial/field-action/components/field-action-icon-select";
import { fieldActionTypeMapping } from "@/features/commercial/field-action/lib/field-action-type-mapping";
import { FieldActionType } from "@/features/commercial/field-action/types/field-action-types";

const schema = z
  .object({
    nome: z
      .string()
      .trim()
      .min(1, "Campo obrigatório")
      .max(120, "O campo deve ter no máximo 120 caracteres"),
    descricao: z.string().trim().min(1, "Campo obrigatório"),
    resultado: z
      .string()
      .trim()
      .min(1, "Campo obrigatório")
      .max(200, "O campo deve ter no máximo 200 caracteres"),
    custo: z.string().trim().optional(),
    detalhe: z.string().trim().optional(),
    icon_name: z.string().min(1, "Campo obrigatório"),
    accent: z.string().min(1, "Campo obrigatório"),
    type: z.enum(FieldActionType),
    display_order: z.number().int().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === FieldActionType.FIELD_ACTION) {
      if (!data.custo) {
        ctx.addIssue({
          code: "custom",
          message: "Campo obrigatório",
          path: ["custo"],
        });
      }
      if (!data.detalhe) {
        ctx.addIssue({
          code: "custom",
          message: "Campo obrigatório",
          path: ["detalhe"],
        });
      }
    }
  });

type FormData = z.infer<typeof schema>;

interface FieldActionCreateFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function FieldActionCreateForm({
  onSuccess,
  onCancel,
}: FieldActionCreateFormProps) {
  const queryClient = useQueryClient();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: "",
      descricao: "",
      resultado: "",
      custo: "",
      detalhe: "",
      icon_name: "",
      accent: "",
      type: FieldActionType.FIELD_ACTION,
      display_order: undefined,
    },
  });

  const type = form.watch("type");
  const isFieldAction = type === FieldActionType.FIELD_ACTION;

  const onSubmit = form.handleSubmit(async (data) => {
    const { error } = await tryCatch(
      () =>
        createFieldAction({
          nome: data.nome,
          descricao: data.descricao,
          resultado: data.resultado,
          ...(isFieldAction && {
            custo: data.custo ?? "",
            detalhe: data.detalhe ?? "",
          }),
          icon_name: data.icon_name,
          accent: data.accent,
          type: data.type,
          display_order: data.display_order,
        }),
      ApiError,
    );

    if (error) {
      toast.error(error.message ?? "Erro ao criar ação de campo. Tente novamente.");
      return;
    }

    form.reset();
    queryClient.invalidateQueries({ queryKey: ["field-actions"] });
    onSuccess?.();
  });

  const isPending = form.formState.isSubmitting;

  return (
    <form id="form-field-action-create" onSubmit={onSubmit}>
      <FieldGroup>
        <Controller
          name="type"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel isRequired htmlFor="form-field-action-create-type">
                Tipo
              </FieldLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="form-field-action-create-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Tipo</SelectLabel>
                    {Object.values(FieldActionType).map((value) => (
                      <SelectItem key={value} value={value}>
                        {fieldActionTypeMapping[value].label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="nome"
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
                placeholder="Ex. Panfletagem"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="descricao"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel isRequired htmlFor={field.name}>
                Descrição
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Descreva a ação..."
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="resultado"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel isRequired htmlFor={field.name}>
                Resultado esperado
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Ex. Indicações qualificadas no ponto de fluxo"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {isFieldAction && (
          <Controller
            name="custo"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel isRequired htmlFor={field.name}>
                  Custo
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Ex. R$ 200 a R$ 400"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        )}

        {isFieldAction && (
          <Controller
            name="detalhe"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel isRequired htmlFor={field.name}>
                  Detalhe
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Informações adicionais..."
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        )}

        <Controller
          name="accent"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel isRequired htmlFor="form-field-action-create-accent">
                Cor (accent)
              </FieldLabel>
              <FieldActionAccentSelect
                id="form-field-action-create-accent"
                value={field.value}
                onValueChange={field.onChange}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="icon_name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field orientation="responsive" data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel
                  isRequired
                  htmlFor="form-field-action-create-select-icon"
                >
                  Ícone
                </FieldLabel>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
              <FieldActionIconSelect
                id="form-field-action-create-select-icon"
                value={field.value}
                onValueChange={field.onChange}
                aria-invalid={fieldState.invalid}
              />
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
