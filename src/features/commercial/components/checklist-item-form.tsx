"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
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
import { ChecklistType } from "@/features/commercial/types/commercial-types";
import { checklistItemTypeMapping } from "../lib/checklist-item-type-mapping";

const formSchema = z.object({
  label: z
    .string()
    .min(1, "Campo obrigatório")
    .max(255, "O campo deve ter no máximo 255 caracteres"),
  type: z.enum(ChecklistType),
});

type ChecklistItemData = z.infer<typeof formSchema>;

export function ChecklistItemForm() {
  const queryClient = useQueryClient();
  const form = useForm<ChecklistItemData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: "",
      type: ChecklistType.BASE,
    },
  });

  async function onSubmit(data: ChecklistItemData) {
    try {
      await createChecklistItem(data);
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["checklist-items"] });
    } catch {
      form.setError("root", { message: "Erro ao criar item. Tente novamente." });
    }
  }

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
                placeholder="Ex. Realizar pedidos"
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
                          {value}
                        </SelectItem>
                      ),
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          )}
        />

        {form.formState.errors.root && (
          <FieldError errors={[form.formState.errors.root]} />
        )}

        <Field orientation="responsive">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Adicionando..." : "Adicionar"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
