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
import { upsertFunnelConfig } from "@/features/funnel-config/actions/upsert-funnel-config";
import type { FunnelConfig } from "@/features/funnel-config/types/funnel-config-types";
import { setApiFieldErrors } from "@/lib/forms/set-api-field-errors";
import { tryCatch } from "@/lib/try-catch";
import { ApiError } from "@/types/api";

export const funnelConfigFormSchema = z
  .object({
    start_date: z
      .string()
      .min(1, "Campo obrigatório")
      .pipe(z.iso.date({ error: "Data inválida" })),
    end_date: z
      .string()
      .min(1, "Campo obrigatório")
      .pipe(z.iso.date({ error: "Data inválida" })),
  })
  .refine((data) => data.end_date >= data.start_date, {
    message: "A data final deve ser igual ou posterior à data inicial",
    path: ["end_date"],
  });

type FormData = z.infer<typeof funnelConfigFormSchema>;

interface FunnelConfigEditFormProps {
  config: FunnelConfig | null;
}

export function FunnelConfigEditForm({ config }: FunnelConfigEditFormProps) {
  const queryClient = useQueryClient();

  const form = useForm<FormData>({
    resolver: zodResolver(funnelConfigFormSchema),
    defaultValues: {
      start_date: config?.start_date ?? "",
      end_date: config?.end_date ?? "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const { data: result, error } = await tryCatch(() => {
      return upsertFunnelConfig(data);
    }, ApiError);

    if (error) {
      const mapped = setApiFieldErrors(error, form.setError);
      if (!mapped) {
        toast.error(
          error.message || "Erro ao salvar período. Tente novamente.",
        );
      }
      return;
    }

    queryClient.setQueryData(["funnel-config"], result);
    toast.success("Período salvo com sucesso.");
  });

  const isPending = form.formState.isSubmitting;

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <FieldGroup className="grid gap-6 md:grid-cols-2">
        <Controller
          name="start_date"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel isRequired htmlFor={field.name}>
                Data inicial
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="date"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="end_date"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel isRequired htmlFor={field.name}>
                Data final
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="date"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <FieldGroup>
        <Field orientation="responsive">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Salvando..." : "Salvar"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
