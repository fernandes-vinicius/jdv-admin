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
import { createChecklistItem } from "@/features/commercial/checklist-item/actions/create-checklist-item";
import { ChecklistIconSelect } from "@/features/commercial/checklist-item/components/checklist-icon-select";
import { checklistItemTypeMapping } from "@/features/commercial/checklist-item/lib/checklist-item-type-mapping";
import { ChecklistType } from "@/features/commercial/checklist-item/types/checklist-item-types";
import { tryCatch } from "@/lib/try-catch";
import { ApiError } from "@/types/api";

const schema = z.object({
  label: z
    .string()
    .min(1, "Campo obrigatório")
    .max(160, "O campo deve ter no máximo 160 caracteres"),
  type: z.enum(ChecklistType),
  icon_name: z
    .string()
    .min(1, "Campo obrigatório")
    .max(40, "O campo deve ter no máximo 40 caracteres"),
});

type FormData = z.infer<typeof schema>;

interface ChecklistItemCreateFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function ChecklistItemCreateForm({
  onSuccess,
  onCancel,
}: ChecklistItemCreateFormProps) {
  const queryClient = useQueryClient();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      label: "",
      type: ChecklistType.BASE,
      icon_name: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const { error } = await tryCatch(() => createChecklistItem(data), ApiError);

    if (error) {
      toast.error(error.message || "Erro ao criar item. Tente novamente.");
      return;
    }

    form.reset();
    queryClient.invalidateQueries({ queryKey: ["checklist-items"] });
    onSuccess?.();
  });

  const isPending = form.formState.isSubmitting;

  return (
    <form id="form-checklist-item-create" onSubmit={onSubmit}>
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
                  htmlFor="form-checklist-item-create-select-icon"
                >
                  Ícone
                </FieldLabel>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
              <ChecklistIconSelect
                id="form-checklist-item-create-select-icon"
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
                  htmlFor="form-checklist-item-create-select-type"
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
                  id="form-checklist-item-create-select-type"
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
