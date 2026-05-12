"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
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
import { BuildingSelect } from "@/features/building/components/building-select";
import { createSalesPlan } from "@/features/goals/actions/create-sales-plan";

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

const monthlySchema = z
  .array(z.number().int().min(0, "Deve ser >= 0"))
  .length(12);

const schema = z.object({
  empreendimento_id: z
    .number()
    .int("Deve ser um número inteiro")
    .positive("Deve ser um número positivo"),
  year: z
    .number()
    .int("Deve ser um número inteiro")
    .min(2000, "Ano inválido")
    .max(2100, "Ano inválido"),
  estoque_inicial: z.number().int().min(0, "Deve ser >= 0"),
  monthly_sales: monthlySchema,
});

type FormData = z.infer<typeof schema>;

interface SalesPlanCreateFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function SalesPlanCreateForm({
  onSuccess,
  onCancel,
}: SalesPlanCreateFormProps) {
  const queryClient = useQueryClient();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      empreendimento_id: NaN,
      year: new Date().getFullYear(),
      estoque_inicial: 0,
      monthly_sales: Array(12).fill(0),
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await createSalesPlan(data);
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["sales-plans"] });
      onSuccess?.();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao criar meta. Tente novamente.",
      );
    }
  });

  const isPending = form.formState.isSubmitting;

  return (
    <form id="form-sales-plan-create" onSubmit={onSubmit}>
      <FieldGroup>
        <Controller
          name="empreendimento_id"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel isRequired>Empreendimento</FieldLabel>
              <BuildingSelect
                value={field.value}
                onValueChange={field.onChange}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="year"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel isRequired htmlFor={field.name}>
                Ano
              </FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                type="number"
                min={2000}
                max={2100}
                value={Number.isNaN(field.value) ? "" : field.value}
                onChange={(e) => field.onChange(e.target.valueAsNumber)}
                onBlur={field.onBlur}
                aria-invalid={fieldState.invalid}
                placeholder="Ex. 2026"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

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
                placeholder="Ex. 100"
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
                      htmlFor={`monthly_sales_${index}`}
                      className="font-medium text-muted-foreground text-xs"
                    >
                      {month}
                    </label>
                    <Input
                      id={`monthly_sales_${index}`}
                      type="number"
                      min={0}
                      value={Number.isNaN(field.value) ? "" : field.value}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      onBlur={field.onBlur}
                      aria-invalid={fieldState.invalid}
                      placeholder="0"
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
              {isPending ? "Adicionando..." : "Adicionar"}
            </Button>
          </div>
        </Field>
      </FieldGroup>
    </form>
  );
}
