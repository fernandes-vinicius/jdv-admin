"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
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
import { createChecklistItem } from "@/features/commercial/actions/create-checklist-item";
import { ChecklistIconSelect } from "@/features/commercial/components/checklist-icon-select";
import { useUpdateChecklistItem } from "@/features/commercial/hooks/use-update-checklist-item";
import { checklistItemTypeMapping } from "@/features/commercial/lib/checklist-item-type-mapping";
import {
  type ChecklistItem,
  ChecklistType,
} from "@/features/commercial/types/commercial-types";

const formSchema = z.object({
  label: z
    .string()
    .min(1, "Campo obrigatório")
    .max(160, "O campo deve ter no máximo 160 caracteres"),
  type: z.enum(ChecklistType),
  icon_name: z
    .string()
    .min(1, "Campo obrigatório")
    .max(40, "O campo deve ter no máximo 160 caracteres"),
});

type ChecklistItemFormData = z.infer<typeof formSchema>;

interface ChecklistItemFormProps {
  item?: ChecklistItem | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function ChecklistItemForm({
  item,
  onSuccess,
  onCancel,
}: ChecklistItemFormProps) {
  const isEditing = !!item;
  const queryClient = useQueryClient();
  const { mutateAsync: updateItem } = useUpdateChecklistItem();

  const form = useForm<ChecklistItemFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: item?.label ?? "",
      type: item?.type ?? ChecklistType.BASE,
      icon_name: item?.icon_name ?? "",
    },
  });

  useEffect(() => {
    form.reset({
      label: item?.label ?? "",
      type: item?.type ?? ChecklistType.BASE,
      icon_name: item?.icon_name ?? "",
    });
  }, [item, form]);

  async function onSubmit(data: ChecklistItemFormData) {
    if (isEditing) {
      await updateItem({
        id: item.id,
        type: item.type,
        label: data.label,
        icon_name: data.icon_name,
      });
      onSuccess?.();
    } else {
      try {
        await createChecklistItem(data);
        form.reset();
        queryClient.invalidateQueries({ queryKey: ["checklist-items"] });
        onSuccess?.();
      } catch {
        toast.error("Erro ao criar item. Tente novamente.");
      }
    }
  }

  const isPending = form.formState.isSubmitting;

  return (
    <form id="form-checklist-item" onSubmit={form.handleSubmit(onSubmit)}>
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
                  htmlFor="form-checklist-item-select-icon"
                >
                  Ícone
                </FieldLabel>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
              <ChecklistIconSelect
                id="form-checklist-item-select-icon"
                value={field.value}
                onValueChange={field.onChange}
                aria-invalid={fieldState.invalid}
              />
            </Field>
          )}
        />

        <Controller
          name="type"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field orientation="responsive" data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel
                  isRequired
                  htmlFor="form-checklist-item-select-type"
                >
                  Tipo
                </FieldLabel>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  id="form-checklist-item-select-type"
                  aria-invalid={fieldState.invalid}
                >
                  <SelectValue placeholder="Selecione o tipo" />
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
          )}
        />

        {isEditing ? (
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
        ) : (
          <Field orientation="responsive">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Adicionando..." : "Adicionar"}
            </Button>
          </Field>
        )}
      </FieldGroup>
    </form>
  );
}
