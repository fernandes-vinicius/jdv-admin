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
import { ChecklistIconSelect } from "@/features/commercial/checklist-item/components/checklist-icon-select";
import { ChecklistItemPeriodBadge } from "@/features/commercial/checklist-item/components/checklist-item-period-badge";
import { useUpdateChecklistItem } from "@/features/commercial/checklist-item/hooks/use-update-checklist-item";
import { derivePeriodFromEndTime } from "@/features/commercial/checklist-item/lib/checklist-item-schedule";
import { checklistItemTypeMapping } from "@/features/commercial/checklist-item/lib/checklist-item-type-mapping";
import {
  type ChecklistItem,
  ChecklistType,
} from "@/features/commercial/checklist-item/types/checklist-item-types";

const schema = z
  .object({
    label: z
      .string()
      .min(1, "Campo obrigatório")
      .max(160, "O campo deve ter no máximo 160 caracteres"),
    icon_name: z
      .string()
      .min(1, "Campo obrigatório")
      .max(40, "O campo deve ter no máximo 40 caracteres"),
    start_time: z.string().optional(),
    end_time: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.start_time && data.end_time && data.end_time <= data.start_time) {
      ctx.addIssue({
        code: "custom",
        message: "Fim deve ser depois do início",
        path: ["end_time"],
      });
    }
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
  const isDaily = item.type === ChecklistType.DAILY;

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      label: item.label,
      icon_name: item.icon_name,
      start_time: item.start_time,
      end_time: item.end_time,
    },
  });

  useEffect(() => {
    form.reset({
      label: item.label,
      icon_name: item.icon_name,
      start_time: item.start_time,
      end_time: item.end_time,
    });
  }, [item, form]);

  const onSubmit = form.handleSubmit(async (data) => {
    await updateItem({
      id: item.id,
      type: item.type,
      label: data.label,
      icon_name: data.icon_name,
      ...(isDaily && {
        start_time: data.start_time,
        end_time: data.end_time,
      }),
    });
    onSuccess?.();
  });

  const isPending = form.formState.isSubmitting;
  const endTime = form.watch("end_time");
  const derivedPeriod = endTime ? derivePeriodFromEndTime(endTime) : null;

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

        {isDaily && (
          <>
            <Controller
              name="start_time"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  orientation="responsive"
                  data-invalid={fieldState.invalid}
                >
                  <FieldContent>
                    <FieldLabel isRequired htmlFor="start_time">
                      Início
                    </FieldLabel>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                  <Input
                    {...field}
                    id="start_time"
                    type="time"
                    aria-invalid={fieldState.invalid}
                  />
                </Field>
              )}
            />

            <Controller
              name="end_time"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  orientation="responsive"
                  data-invalid={fieldState.invalid}
                >
                  <FieldContent>
                    <FieldLabel isRequired htmlFor="end_time">
                      Fim
                    </FieldLabel>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                    {derivedPeriod && (
                      <ChecklistItemPeriodBadge period={derivedPeriod} />
                    )}
                  </FieldContent>
                  <Input
                    {...field}
                    id="end_time"
                    type="time"
                    aria-invalid={fieldState.invalid}
                  />
                </Field>
              )}
            />
          </>
        )}

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
