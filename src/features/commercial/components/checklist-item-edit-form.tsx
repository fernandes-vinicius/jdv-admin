"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
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
import { ChecklistIconSelect } from "@/features/commercial/components/checklist-icon-select";
import { useUpdateChecklistItem } from "@/features/commercial/hooks/use-update-checklist-item";
import { checklistItemTypeMapping } from "@/features/commercial/lib/checklist-item-type-mapping";
import type { ChecklistItem } from "@/features/commercial/types/commercial-types";

const schema = z.object({
  label: z
    .string()
    .min(1, "Campo obrigatório")
    .max(160, "O campo deve ter no máximo 160 caracteres"),
  icon_name: z
    .string()
    .min(1, "Campo obrigatório")
    .max(40, "O campo deve ter no máximo 40 caracteres"),
});

type FormData = z.infer<typeof schema>;

interface ChecklistItemEditFormProps {
  item: ChecklistItem;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function ChecklistItemEditForm({
  item,
  onSuccess,
  onCancel,
}: ChecklistItemEditFormProps) {
  const { mutateAsync: updateItem } = useUpdateChecklistItem();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      label: item.label,
      icon_name: item.icon_name,
    },
  });

  useEffect(() => {
    form.reset({
      label: item.label,
      icon_name: item.icon_name,
    });
  }, [item, form]);

  const onSubmit = form.handleSubmit(async (data) => {
    await updateItem({
      id: item.id,
      type: item.type,
      label: data.label,
      icon_name: data.icon_name,
    });
    onSuccess?.();
  });

  const isPending = form.formState.isSubmitting;

  return (
    <form id="form-checklist-item-edit" onSubmit={onSubmit}>
      <FieldGroup>
        <Controller
          name="label"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel isRequired htmlFor={field.name}>
                Label
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Ex. Acompanhar ações do dia"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              <FieldDescription>
                A label é como aparece no dashboard.
              </FieldDescription>
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
                  htmlFor="form-checklist-item-edit-select-icon"
                >
                  Ícone
                </FieldLabel>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
              <ChecklistIconSelect
                id="form-checklist-item-edit-select-icon"
                value={field.value}
                onValueChange={field.onChange}
                aria-invalid={fieldState.invalid}
              />
            </Field>
          )}
        />

        <Field orientation="responsive" data-invalid={false}>
          <FieldContent>
            <FieldLabel htmlFor="form-checklist-item-edit-type">
              Tipo
            </FieldLabel>
          </FieldContent>
          <Select
            name="type"
            value={item.type}
            onValueChange={() => {}}
            disabled
          >
            <SelectTrigger id="form-checklist-item-edit-type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="item-aligned">
              <SelectGroup>
                <SelectLabel>Tipo</SelectLabel>
                {Object.entries(checklistItemTypeMapping).map(
                  ([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value.label}
                    </SelectItem>
                  ),
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

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
