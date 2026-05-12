"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useUpdateSalesPlan } from "@/features/goals/hooks/use-update-sales-plan";
import type { SalesPlan } from "@/features/goals/types/goals-types";

const MONTHS = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

const schema = z.object({
  estoque_inicial: z.number().int().min(0, "Deve ser >= 0"),
  monthly_sales: z.array(z.number().int().min(0, "Deve ser >= 0")).length(12),
});

type FormData = z.infer<typeof schema>;

interface SalesPlanEditFormProps {
  item: SalesPlan;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function SalesPlanEditForm({
  item,
  onSuccess,
  onCancel,
}: SalesPlanEditFormProps) {
  const { mutateAsync: updateItem } = useUpdateSalesPlan();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      estoque_inicial: item.estoque_inicial,
      monthly_sales: item.months.map((m) => m.planned_sales),
    },
  });

  useEffect(() => {
    form.reset({
      estoque_inicial: item.estoque_inicial,
      monthly_sales: item.months.map((m) => m.planned_sales),
    });
  }, [item, form]);

  const onSubmit = form.handleSubmit(async (data) => {
    await updateItem({
      id: item.id,
      payload: {
        estoque_inicial: data.estoque_inicial,
        monthly_sales: data.monthly_sales,
      },
    });
    onSuccess?.();
  });

  const isPending = form.formState.isSubmitting;

  return (
    <form id="form-sales-plan-edit" onSubmit={onSubmit}>
      <FieldGroup>
        <Field>
          <FieldLabel>Empreendimento</FieldLabel>
          <p className="text-sm">
            {item.empreendimento_name} (ID {item.empreendimento_id}) —{" "}
            {item.year}
          </p>
        </Field>

        <Controller
          name="estoque_inicial"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel isRequired htmlFor={field.name}>
                Estoque inicial
              </FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                type="number"
                min={0}
                value={Number.isNaN(field.value) ? "" : field.value}
                onChange={(e) => field.onChange(e.target.valueAsNumber)}
                onBlur={field.onBlur}
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Field>
          <FieldLabel isRequired>Vendas mensais planejadas</FieldLabel>
          <FieldDescription>
            Informe a meta de vendas para cada mês (jan → dez).
          </FieldDescription>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {MONTHS.map((month, index) => (
              <Controller
                key={month}
                name={`monthly_sales.${index}`}
                control={form.control}
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor={`edit_monthly_sales_${index}`}
                      className="font-medium text-muted-foreground text-xs"
                    >
                      {month}
                    </label>
                    <Input
                      id={`edit_monthly_sales_${index}`}
                      type="number"
                      min={0}
                      value={Number.isNaN(field.value) ? "" : field.value}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      onBlur={field.onBlur}
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                    />
                  </div>
                )}
              />
            ))}
          </div>
          {form.formState.errors.monthly_sales && (
            <p className="mt-1 text-destructive text-sm">
              Verifique os valores mensais.
            </p>
          )}
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
