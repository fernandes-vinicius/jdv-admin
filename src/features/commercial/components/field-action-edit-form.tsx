"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
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
import { FieldActionAccentSelect } from "@/features/commercial/components/field-action-accent-select";
import { FieldActionIconSelect } from "@/features/commercial/components/field-action-icon-select";
import { useUpdateFieldAction } from "@/features/commercial/hooks/use-update-field-action";
import { fieldActionTypeMapping } from "@/features/commercial/lib/field-action-type-mapping";
import {
  type FieldAction,
  FieldActionType,
} from "@/features/commercial/types/commercial-types";

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

interface FieldActionEditFormProps {
  item: FieldAction;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function FieldActionEditForm({
  item,
  onSuccess,
  onCancel,
}: FieldActionEditFormProps) {
  const { mutateAsync: updateItem } = useUpdateFieldAction();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: item.nome,
      descricao: item.descricao,
      resultado: item.resultado,
      custo: item.custo ?? "",
      detalhe: item.detalhe ?? "",
      icon_name: item.icon_name,
      accent: item.accent,
      type: item.type,
      display_order: item.display_order,
    },
  });

  useEffect(() => {
    form.reset({
      nome: item.nome,
      descricao: item.descricao,
      resultado: item.resultado,
      custo: item.custo ?? "",
      detalhe: item.detalhe ?? "",
      icon_name: item.icon_name,
      accent: item.accent,
      type: item.type,
      display_order: item.display_order,
    });
  }, [item, form]);

  const type = form.watch("type");
  const isFieldAction = type === FieldActionType.FIELD_ACTION;

  const onSubmit = form.handleSubmit(async (data) => {
    await updateItem({
      id: item.id,
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
    });
    onSuccess?.();
  });

  const isPending = form.formState.isSubmitting;

  return (
    <form id="form-field-action-edit" onSubmit={onSubmit}>
      <FieldGroup>
        <Controller
          name="type"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel isRequired htmlFor="form-field-action-edit-type">
                Tipo
              </FieldLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="form-field-action-edit-type">
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
              <FieldLabel isRequired htmlFor="form-field-action-edit-accent">
                Cor (accent)
              </FieldLabel>
              <FieldActionAccentSelect
                id="form-field-action-edit-accent"
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
                  htmlFor="form-field-action-edit-select-icon"
                >
                  Ícone
                </FieldLabel>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
              <FieldActionIconSelect
                id="form-field-action-edit-select-icon"
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
              {isPending ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </Field>
      </FieldGroup>
    </form>
  );
}
